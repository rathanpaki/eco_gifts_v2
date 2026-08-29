import { notFound } from "next/navigation";
import { ProductEditor } from "@/components/features/admin-products/product-editor";
import {
  loadAdminProduct,
  loadAdminProductCategories,
} from "@/services/admin-products.service";

export async function NewProductPage() {
  const categories = await loadAdminProductCategories();
  return <ProductEditor categories={categories} />;
}

export async function EditProductPage({ id }: { id: string }) {
  const [product, categories] = await Promise.all([
    loadAdminProduct(id),
    loadAdminProductCategories(),
  ]);
  if (!product) notFound();
  return <ProductEditor categories={categories} initialProduct={product} />;
}
