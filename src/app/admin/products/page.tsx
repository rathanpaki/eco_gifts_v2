import { AdminProductsPage } from "@/components/features/admin-products/admin-products-page";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <AdminProductsPage query={await searchParams} />;
}
