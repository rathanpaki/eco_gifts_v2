import { notFound } from "next/navigation";
import { ProductEditor } from "@/components/features/admin-products/product-editor";
import {
  loadAdminProduct,
  loadAdminProductCategories,
} from "@/services/admin-products.service";

export async function NewProductPage() {
  const result = await loadAdminProductCategories();
  return (
    <ProductEditor
      categories={result.kind === "ready" ? result.categories : []}
    />
  );
}

export async function EditProductPage({ id }: { id: string }) {
  const [product, categories] = await Promise.all([
    loadAdminProduct(id),
    loadAdminProductCategories(),
  ]);
  if (product.kind !== "ready") notFound();
  return (
    <ProductEditor
      categories={categories.kind === "ready" ? categories.categories : []}
      initialProduct={product.product}
    />
  );
}
