import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { shopHref } from "./catalog-query";
import type { PublicProductQuery } from "@/types/catalog";

export function CatalogPagination({ nextCursor, query }: { nextCursor: string | null; query: PublicProductQuery }) {
  if (!nextCursor) return null;
  return (
    <nav className="flex justify-center" aria-label="Product pagination">
      <Link href={shopHref(query, { cursor: nextCursor })} className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)]">
        Next page <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </nav>
  );
}
