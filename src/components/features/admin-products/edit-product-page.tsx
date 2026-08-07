import { notFound } from "next/navigation";
import { ProductEditor } from "@/components/features/admin-products/product-editor";
import { loadAdminProduct } from "@/services/admin-products.service";

export function NewProductPage() {
  return <ProductEditor />;
}

export async function EditProductPage({ id }: { id: string }) {
  const product = await loadAdminProduct(id);
  if (!product) notFound();
  return <ProductEditor initialProduct={product} />;
}
