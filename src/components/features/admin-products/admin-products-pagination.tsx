import { NumberedPagination } from "@/components/ui/numbered-pagination";
import type { AdminProductPage } from "@/types/admin-product";

type Query = Record<string, string | string[] | undefined>;

export function AdminProductsPagination({ page, query }: { page: AdminProductPage; query: Query }) {
  return (
    <NumberedPagination
      currentPage={page.page}
      hrefForPage={(target) => `${pageHref(query, target)}#admin-product-list`}
      itemLabel="products"
      pageSize={page.pageSize}
      totalItems={page.totalItems}
      totalPages={page.totalPages}
    />
  );
}

function pageHref(query: Query, page: number): string {
  const params = new URLSearchParams();
  for (const key of ["filter", "search"] as const) {
    const value = query[key];
    if (typeof value === "string" && value) params.set(key, value);
  }
  if (page > 1) params.set("page", String(page));
  const queryString = params.toString();
  return queryString ? `/admin/products?${queryString}` : "/admin/products";
}
