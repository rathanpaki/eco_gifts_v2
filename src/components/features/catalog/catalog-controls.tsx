import Link from "next/link";
import { shopHref } from "./catalog-query";
import type { PublicProductQuery } from "@/types/catalog";
import { CatalogFilterMenu } from "./catalog-filter-menu";

const sortOptions = [
  ["newest", "Newest"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["name-asc", "Name: A to Z"],
] as const;

export function CatalogControls({
  query,
  count,
}: {
  query: PublicProductQuery;
  count: number;
}) {
  const underFifty = query.maxPriceCents === 5000;
  const personalizable = query.personalizable === true;
  const plasticFree = query.search?.toLowerCase() === "plastic-free";
  const unfiltered =
    !query.search && !query.category && !underFifty && !personalizable;

  return (
    <section aria-label="Filter and sort gifts" className="relative md:min-h-[100px]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-5">
        <nav className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Product filters">
          <FilterLink
            active={unfiltered}
            href={shopHref(query, {
              search: undefined,
              category: undefined,
              maxPriceCents: undefined,
              minPriceCents: undefined,
              personalizable: undefined,
              sort: "newest",
            })}
          >
            All gifts&nbsp;&nbsp;{count}
          </FilterLink>
          <FilterLink
            active={underFifty}
            href={shopHref(query, {
              search: undefined,
              maxPriceCents: underFifty ? undefined : 5000,
              minPriceCents: undefined,
              sort: underFifty ? "newest" : "price-asc",
            })}
          >
            Under $50
          </FilterLink>
          <FilterLink
            active={personalizable}
            href={shopHref(query, {
              search: undefined,
              personalizable: personalizable ? undefined : true,
              sort: "newest",
            })}
          >
            Personalizable
          </FilterLink>
          <FilterLink
            active={plasticFree}
            href={shopHref(query, {
              search: plasticFree ? undefined : "plastic-free",
              sort: "newest",
            })}
          >
            Plastic-free
          </FilterLink>
        </nav>
        <div className="relative flex w-full items-center justify-between gap-3 md:w-auto md:justify-start md:gap-5">
          <CatalogFilterMenu query={query} />
          <SortMenu query={query} />
        </div>
      </div>
    </section>
  );
}

function FilterLink({
  active,
  href,
  children,
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
}) {
  const state = active
    ? "border-[var(--brand)] bg-[var(--brand)] text-white"
    : "border-[var(--line)]";
  return (
    <Link
      aria-current={active ? "page" : undefined}
      href={href}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-[11px] text-[13px] font-medium leading-[14px] ${state}`}
    >
      {children}
    </Link>
  );
}

function SortMenu({ query }: { query: PublicProductQuery }) {
  const current =
    sortOptions.find(([value]) => value === query.sort) ?? sortOptions[0];
  return (
    <details className="group static text-[13px] font-medium md:relative">
      <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-xl border border-[var(--line)] px-3.5 [&::-webkit-details-marker]:hidden">
        Sort: {current[1]}
      </summary>
      <div className="absolute right-0 top-14 z-20 grid w-[min(220px,calc(100vw-40px))] gap-1 rounded-xl border border-[var(--line)] bg-white p-2 shadow-lg md:top-14">
        {sortOptions.map(([value, label]) => (
          <Link
            key={value}
            href={shopHref(query, { sort: value })}
            className="rounded-lg px-3 py-2 hover:bg-[var(--subtle)]"
          >
            {label}
          </Link>
        ))}
      </div>
    </details>
  );
}
