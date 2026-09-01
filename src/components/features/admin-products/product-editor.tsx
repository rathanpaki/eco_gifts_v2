"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDialog } from "@/components/providers/feedback-provider";
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
import { ProductEditorHeader } from "./product-editor-header";
import { formValues, productPayload } from "./product-form-values";
import { ProductPreview } from "./product-preview";
import { useProductImageSelection } from "./use-product-image-selection";
import styles from "@/components/features/admin-products/product-editor.module.css";

export function ProductEditor({
  categories,
  initialProduct,
}: {
  categories: string[];
  initialProduct?: AdminProduct;
}) {
  const router = useRouter();
  const dialog = useAppDialog();
  const [product, setProduct] = useState(initialProduct);
  const [values, setValues] = useState(() => formValues(initialProduct));
  const [tab, setTab] = useState<EditorTab>("general");
  const { clearFiles, files, imageError, previewUrls, selectFiles } =
    useProductImageSelection();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const change = (
    key: keyof ProductFormValues,
    value: string | boolean | ProductFormValues["occasions"],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const action = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    const status = action?.value === "active" ? "active" : "draft";
    const parsed = productFormSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the form fields.");
      return;
    }
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      let saved = product;
      if (!saved) {
        saved = await createAdminProduct(productPayload(parsed.data, "draft"));
        setProduct(saved);
        router.replace(`/admin/products/${saved.id}/edit`);
      }
      for (const imageFile of files) {
        const imageNumber = saved.images.length + 1;
        saved = await uploadProductImage(
          saved.id,
          imageFile,
          `${parsed.data.name} - image ${imageNumber}`,
        );
        setProduct(saved);
      }
      if (product || status === "active")
        saved = await updateAdminProduct(
          saved.id,
          productPayload(parsed.data, status),
        );
      setProduct(saved);
      clearFiles();
      setMessage(status === "active" ? "Product published." : "Draft saved.");
      router.refresh();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "The product could not be saved.",
      );
    } finally {
      setPending(false);
    }
  };

  const removeImage = async (imageId: string) => {
    if (!product) return;
    setPending(true);
    setError(null);
    try {
      setProduct(await deleteProductImage(product.id, imageId));
      router.refresh();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "The image could not be removed.",
      );
    } finally {
      setPending(false);
    }
  };

  const moveImage = async (imageId: string, offset: -1 | 1) => {
    if (!product) return;
    const imageIds = product.images.map((image) => image.id);
    const index = imageIds.indexOf(imageId);
    const target = index + offset;
    if (index < 0 || target < 0 || target >= imageIds.length) return;
    [imageIds[index], imageIds[target]] = [imageIds[target], imageIds[index]];
    setPending(true);
    setError(null);
    try {
      setProduct(await reorderProductImages(product.id, imageIds));
      router.refresh();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Images could not be reordered.",
      );
    } finally {
      setPending(false);
    }
  };

  const archive = async () => {
    if (!product) return;
    const approved = await dialog.confirm({
      title: "Archive this product?",
      description: `${product.name} will be removed from the storefront while its record remains available to administrators.`,
      confirmLabel: "Archive product",
      tone: "danger",
    });
    if (!approved) return;
    setPending(true);
    setError(null);
    try {
      await archiveAdminProduct(product.id);
      toast.success("Product archived", { description: `${product.name} is no longer visible in the storefront.` });
      router.replace("/admin/products");
      router.refresh();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Product could not be archived.",
      );
      setPending(false);
    }
  };

  return (
    <form className={styles.page} onSubmit={submit} noValidate>
      <ProductEditorHeader
        error={error ?? imageError}
        message={message}
        name={values.name}
        onArchive={archive}
        onTab={setTab}
        pending={pending}
        product={product}
        tab={tab}
      />
      <div className={styles.layout}>
        <ProductEditorFields
          categories={categories}
          onChange={change}
          onFiles={selectFiles}
          tab={tab}
          values={values}
        />
        <ProductPreview
          onMove={moveImage}
          onRemove={removeImage}
          pending={pending}
          previewUrls={previewUrls}
          product={product}
          values={values}
        />
      </div>
    </form>
  );
}
