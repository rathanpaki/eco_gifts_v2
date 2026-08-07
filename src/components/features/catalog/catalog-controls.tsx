import Link from "next/link";
import { Search } from "lucide-react";
import { shopHref } from "./catalog-query";
import type { PublicProductQuery } from "@/types/catalog";

const sortOptions = [
  ["featured", "Featured"],
  ["newest", "Newest"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["name-asc", "Name: A to Z"],
] as const;

export function CatalogControls({ query }: { query: PublicProductQuery }) {
  const underFifty = query.maxPriceCents === 5000;
  const personalizable = query.personalizable === true;
  const filtered = Boolean(query.search || query.category || underFifty || personalizable);

  return (
    <section id="catalog-search" aria-label="Find and filter gifts" className="scroll-mt-28">
      <form action="/shop" className="mb-5 flex max-w-xl gap-2" role="search">
        <label htmlFor="catalog-search-input" className="sr-only">Search gifts</label>
        <div className="relative flex-1">
          <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
          <input
            id="catalog-search-input"
            name="search"
            defaultValue={query.search}
            maxLength={80}
            placeholder="Search gifts"
            className="h-11 w-full rounded-full border border-[var(--line)] bg-transparent pl-11 pr-4 text-sm"
          />
        </div>
        <SearchFilters query={query} />
        <button className="h-11 rounded-full bg-[var(--brand)] px-5 text-sm font-semibold text-white">Search</button>
      </form>

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-2" aria-label="Product filters">
          <FilterLink active={!underFifty && !personalizable} href={shopHref(query, {
            maxPriceCents: undefined,
            minPriceCents: undefined,
            personalizable: undefined,
          })}>All gifts</FilterLink>
          <FilterLink active={underFifty} href={shopHref(query, {
            maxPriceCents: underFifty ? undefined : 5000,
            sort: underFifty ? query.sort : "price-asc",
          })}>Under $50</FilterLink>
          <FilterLink active={personalizable} href={shopHref(query, {
            personalizable: personalizable ? undefined : true,
          })}>Personalizable</FilterLink>
        </nav>

        <form action="/shop" className="flex items-center gap-2 text-sm">
          <PersistedFilters query={query} />
          <label htmlFor="catalog-sort" className="font-medium">Sort:</label>
          <select key={query.sort ?? "featured"} id="catalog-sort" name="sort" defaultValue={query.sort ?? "featured"} className="h-10 rounded-xl border border-[var(--line)] bg-transparent px-3">
            {sortOptions.map(([value, label]) => (
              <option key={value} value={value} disabled={filtered && (value === "featured" || value === "name-asc")}>
                {label}
              </option>
            ))}
          </select>
          <button className="h-10 rounded-xl border border-[var(--brand)] px-3 font-semibold text-[var(--brand)]">Apply</button>
        </form>
      </div>
    </section>
  );
}

function FilterLink({ active, href, children }: { active: boolean; href: string; children: React.ReactNode }) {
  return <Link aria-current={active ? "page" : undefined} href={href} className={`rounded-full border px-4 py-[10px] text-[13px] font-medium ${active ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--line)]"}`}>{children}</Link>;
}

function PersistedFilters({ query }: { query: PublicProductQuery }) {
  return <>{query.search && <input type="hidden" name="search" value={query.search} />}{query.category && <input type="hidden" name="category" value={query.category} />}{query.maxPriceCents !== undefined && <input type="hidden" name="maxPriceCents" value={query.maxPriceCents} />}{query.personalizable !== undefined && <input type="hidden" name="personalizable" value={String(query.personalizable)} />}</>;
}

function SearchFilters({ query }: { query: PublicProductQuery }) {
  const sort = query.sort === "featured" || query.sort === "name-asc" ? "newest" : query.sort;
  return <>{query.category && <input type="hidden" name="category" value={query.category} />}{query.maxPriceCents !== undefined && <input type="hidden" name="maxPriceCents" value={query.maxPriceCents} />}{query.personalizable !== undefined && <input type="hidden" name="personalizable" value={String(query.personalizable)} />}<input type="hidden" name="sort" value={sort ?? "newest"} /></>;
}
