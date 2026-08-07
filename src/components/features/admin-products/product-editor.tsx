"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { productFormSchema } from "@/lib/schemas/admin-product.schema";
import {
  archiveAdminProduct,
  createAdminProduct,
  deleteProductImage,
  reorderProductImages,
  updateAdminProduct,
  uploadProductImage,
} from "@/services/admin-product-mutations.service";
import type { AdminProduct, ProductFormValues } from "@/types/admin-product";
import { ProductEditorFields, type EditorTab } from "./product-editor-fields";
import { formValues, productPayload } from "./product-form-values";
import { ProductPreview } from "./product-preview";
import styles from "@/components/features/admin-products/product-editor.module.css";

export function ProductEditor({ initialProduct }: { initialProduct?: AdminProduct }) {
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [values, setValues] = useState(() => formValues(initialProduct));
  const [tab, setTab] = useState<EditorTab>("general");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const selectFile = (next: File | null) => {
    setFile(next);
    setPreviewUrl(next ? URL.createObjectURL(next) : null);
  };

  const change = (key: keyof ProductFormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const action = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const status = action?.value === "active" ? "active" : "draft";
    const parsed = productFormSchema.safeParse(values);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Check the form fields."); return; }
    setPending(true); setError(null); setMessage(null);
    try {
      let saved = product;
      if (!saved) {
        saved = await createAdminProduct(productPayload(parsed.data, "draft"));
        setProduct(saved);
        router.replace(`/admin/products/${saved.id}/edit`);
      }
      if (file) saved = await uploadProductImage(saved.id, file, parsed.data.name);
      if (product || status === "active") saved = await updateAdminProduct(saved.id, productPayload(parsed.data, status));
      setProduct(saved); selectFile(null); setMessage(status === "active" ? "Product published." : "Draft saved.");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The product could not be saved.");
    } finally { setPending(false); }
  };

  const removeImage = async (imageId: string) => {
    if (!product) return;
    setPending(true); setError(null);
    try { setProduct(await deleteProductImage(product.id, imageId)); router.refresh(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "The image could not be removed."); }
    finally { setPending(false); }
  };

  const moveImage = async (imageId: string, offset: -1 | 1) => {
    if (!product) return;
    const imageIds = product.images.map((image) => image.id);
    const index = imageIds.indexOf(imageId);
    const target = index + offset;
    if (index < 0 || target < 0 || target >= imageIds.length) return;
    [imageIds[index], imageIds[target]] = [imageIds[target], imageIds[index]];
    setPending(true); setError(null);
    try { setProduct(await reorderProductImages(product.id, imageIds)); router.refresh(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Images could not be reordered."); }
    finally { setPending(false); }
  };

  const archive = async () => {
    if (!product || !window.confirm(`Archive ${product.name}?`)) return;
    setPending(true); setError(null);
    try { await archiveAdminProduct(product.id); router.replace("/admin/products"); router.refresh(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Product could not be archived."); setPending(false); }
  };

  return <form className={styles.page} onSubmit={submit} noValidate>
    <header className={styles.header}>
      <div><p>Edit product</p><h1>{values.name || "New product"}</h1></div>
      <div className={styles.actions}>
        <span className={product?.status === "active" ? styles.published : styles.draft}>{product?.status === "active" ? "Published" : product?.status === "archived" ? "Archived" : "Draft"}</span>
        {product && <button className={styles.danger} disabled={pending} onClick={archive} type="button">Archive</button>}
        <button disabled={pending} value="draft">Save draft</button>
        <button className={styles.primary} disabled={pending} value="active">{pending ? "Saving…" : "Publish changes"}</button>
      </div>
    </header>
    <nav className={styles.tabs} aria-label="Product editor sections">{tabs.map((item) => <button aria-current={tab === item.value ? "page" : undefined} className={tab === item.value ? styles.tabActive : styles.tab} key={item.value} onClick={() => setTab(item.value)} type="button">{item.label}</button>)}</nav>
    {error && <p className={styles.error} role="alert">{error}</p>}
    {message && <p className={styles.success} role="status">{message}</p>}
    <div className={styles.layout}>
      <ProductEditorFields onChange={change} onFile={selectFile} tab={tab} values={values} />
      <ProductPreview onMove={moveImage} onRemove={removeImage} pending={pending} previewUrl={previewUrl} product={product} values={values} />
    </div>
  </form>;
}

const tabs: Array<{ label: string; value: EditorTab }> = [
  { label: "General", value: "general" }, { label: "Media", value: "media" },
  { label: "Pricing", value: "pricing" }, { label: "Personalization", value: "personalization" },
  { label: "Eco evidence", value: "eco" },
];
