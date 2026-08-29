import { shopHref } from "./catalog-query";
import { NumberedPagination } from "@/components/ui/numbered-pagination";
import type { PublicProductPage, PublicProductQuery } from "@/types/catalog";

export function CatalogPagination({ catalog, query }: { catalog: PublicProductPage; query: PublicProductQuery }) {
  return (
    <NumberedPagination
      currentPage={catalog.page}
      hrefForPage={(page) => `${shopHref(query, { page })}#collection-products`}
      itemLabel="products"
      pageSize={catalog.pageSize}
      totalItems={catalog.totalItems}
      totalPages={catalog.totalPages}
    />
  );
}
