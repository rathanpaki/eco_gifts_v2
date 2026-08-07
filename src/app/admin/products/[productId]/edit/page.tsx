import { EditProductPage } from "@/components/features/admin-products/edit-product-page";

export default async function EditProductRoute({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <EditProductPage id={productId} />;
}
