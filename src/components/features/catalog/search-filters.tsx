import Link from "next/link";
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

export function SearchFilters({ query }: { query: PublicProductQuery }) {
  return (
    <aside className="min-h-[720px] rounded-[18px] bg-[var(--subtle)] p-6">
      <h2 className="serif text-[22px] leading-[30px]">Refine results</h2>
      <div className="mt-6 flex flex-col gap-6">
        <CategoryGroup query={query} />
        <PriceGroup query={query} />
        <FeatureGroup query={query} />
      </div>
    </aside>
  );
}

function CategoryGroup({ query }: { query: PublicProductQuery }) {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-[13px] font-semibold">Category</legend>
      {categories.map((category) => {
        const active = query.category === category;
        return (
          <Link
            key={category}
            href={shopHref(query, {
              category: active ? undefined : category,
            })}
            className="flex items-center gap-[10px] text-[13px] text-[#8a918a]"
          >
            <Check active={active} />
            {category}
          </Link>
        );
      })}
    </fieldset>
  );
}

function FeatureGroup({ query }: { query: PublicProductQuery }) {
  const active = query.personalizable === true;
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-[13px] font-semibold">Features</legend>
      <Link
        href={shopHref(query, {
          personalizable: active ? undefined : true,
        })}
        className="flex items-center gap-[10px] text-[13px] text-[#8a918a]"
      >
        <Check active={active} />
        Personalizable
      </Link>
    </fieldset>
  );
}

function Check({ active }: { active: boolean }) {
  return (
    <span
      className={`grid size-[18px] place-items-center rounded border ${
        active
          ? "border-[var(--brand)] bg-[var(--brand)]"
          : "border-[var(--line)] bg-[var(--page)]"
      }`}
    >
      {active ? (
        <span
          className="size-1.5 rounded-sm bg-white"
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}

function PriceGroup({ query }: { query: PublicProductQuery }) {
  const options = [
    ["Under $50", undefined, 5000],
    ["$50-$100", 5000, 10000],
    ["Over $100", 10000, undefined],
  ] as const;
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-[13px] font-semibold">Price</legend>
      {options.map(([label, minPriceCents, maxPriceCents]) => {
        const active =
          query.minPriceCents === minPriceCents &&
          query.maxPriceCents === maxPriceCents;
        return (
          <Link
            key={label}
            href={shopHref(query, {
              minPriceCents: active ? undefined : minPriceCents,
              maxPriceCents: active ? undefined : maxPriceCents,
              sort: active ? "newest" : "price-asc",
            })}
            className="flex items-center gap-[10px] text-[13px] text-[#8a918a]"
          >
            <Check active={active} />
            {label}
          </Link>
        );
      })}
    </fieldset>
  );
}
