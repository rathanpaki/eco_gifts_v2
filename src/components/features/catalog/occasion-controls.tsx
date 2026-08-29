import Link from "next/link";
import { shopHref } from "./catalog-query";
import type { PublicProductQuery } from "@/types/catalog";
import { productOccasionOptions } from "@/types/product-occasion";

const sorts = [
  ["newest", "Newest"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
] as const;

export function OccasionControls({ query }: { query: PublicProductQuery }) {
  return (
    <section
      className="flex flex-col gap-5 border-y border-[var(--line)] py-5 md:flex-row md:items-center md:justify-between"
      aria-label="Collection controls"
    >
      <nav className="flex flex-wrap gap-2" aria-label="Gift occasions">
        {productOccasionOptions.map((item) => (
          <Link
            aria-current={query.occasion === item.value ? "page" : undefined}
            className={[
              "rounded-full border px-4 py-[10px] text-[13px] font-medium",
              query.occasion === item.value
                ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                : "border-[var(--line)]",
            ].join(" ")}
            href={shopHref(query, { occasion: item.value })}
            key={item.value}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <form action="/shop" className="flex items-center gap-2 text-sm">
        <input name="occasion" type="hidden" value={query.occasion} />
        <label className="font-medium" htmlFor="collection-sort">
          Sort:
        </label>
        <select
          className="h-10 rounded-xl border border-[var(--line)] bg-transparent px-3"
          defaultValue={query.sort ?? "newest"}
          id="collection-sort"
          name="sort"
        >
          {sorts.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button className="h-10 rounded-xl border border-[var(--brand)] px-3 font-semibold text-[var(--brand)]">
          Apply
        </button>
      </form>
    </section>
  );
}
