import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { shopHref } from "./catalog-query";
import type { PublicProductQuery } from "@/types/catalog";

const categories = [
  "Plantable Gifts",
  "Artisan Home",
  "Food & Drink",
  "Wellbeing",
  "Corporate & Desk",
  "Celebration Favors",
];

const prices = [
  { label: "Under $50", min: undefined, max: 5000 },
  { label: "$50–$100", min: 5000, max: 10000 },
  { label: "Over $100", min: 10000, max: undefined },
];

export function CatalogFilterMenu({ query }: { query: PublicProductQuery }) {
  const activeCount = [
    query.category,
    query.minPriceCents !== undefined || query.maxPriceCents !== undefined,
    query.personalizable,
  ].filter(Boolean).length;

  return (
    <details className="group static text-[13px] font-medium md:relative">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-[var(--line)] px-3.5 [&::-webkit-details-marker]:hidden">
        <SlidersHorizontal aria-hidden="true" size={16} />
        Filter{activeCount ? ` (${activeCount})` : ""}
      </summary>
      <div className="absolute left-0 top-14 z-30 max-h-[min(60svh,480px)] w-[min(300px,calc(100vw-40px))] overflow-y-auto rounded-2xl border border-[var(--line)] bg-white p-3 shadow-xl md:left-auto md:right-0 md:max-h-[560px] md:w-[340px] md:p-5">
        <FilterGroup title="Category">
          {categories.map((category) => (
            <FilterLink
              key={category}
              active={query.category === category}
              href={shopHref(query, {
                category: query.category === category ? undefined : category,
              })}
              label={category}
            />
          ))}
        </FilterGroup>
        <FilterGroup title="Price">
          {prices.map((price) => {
            const active =
              query.minPriceCents === price.min &&
              query.maxPriceCents === price.max;
            return (
              <FilterLink
                key={price.label}
                active={active}
                href={shopHref(query, {
                  minPriceCents: active ? undefined : price.min,
                  maxPriceCents: active ? undefined : price.max,
                  sort: active ? "newest" : "price-asc",
                })}
                label={price.label}
              />
            );
          })}
        </FilterGroup>
        <FilterGroup title="Personalization">
          <FilterLink
            active={query.personalizable === true}
            href={shopHref(query, {
              personalizable: query.personalizable ? undefined : true,
            })}
            label="Personalizable gifts"
          />
        </FilterGroup>
        {activeCount ? (
          <Link
            href="/shop"
            className="mt-4 block rounded-xl bg-[var(--brand)] px-4 py-3 text-center font-semibold text-white md:mt-5"
          >
            Clear filters
          </Link>
        ) : null}
      </div>
    </details>
  );
}

function FilterGroup(props: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mb-4 grid grid-cols-2 gap-1.5 last:mb-0 md:mb-5 md:gap-2">
      <legend className="mb-2 text-xs font-semibold md:mb-3">{props.title}</legend>
      {props.children}
    </fieldset>
  );
}

function FilterLink(props: { active: boolean; href: string; label: string }) {
  return (
    <Link
      href={props.href}
      aria-current={props.active ? "true" : undefined}
      className={`rounded-lg border px-2.5 py-2 text-xs leading-4 md:px-3 ${
        props.active
          ? "border-[var(--brand)] bg-[#eef4ee] text-[var(--brand)]"
          : "border-[var(--line)] text-[var(--muted)] hover:bg-[var(--subtle)]"
      }`}
    >
      {props.label}
    </Link>
  );
}
