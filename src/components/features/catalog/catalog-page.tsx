import { CatalogControls } from "./catalog-controls";
import { CatalogIntro } from "./catalog-intro";
import { OccasionCollectionHeading, OccasionIntro } from "./occasion-intro";
import { OccasionControls } from "./occasion-controls";
import { CatalogPagination } from "./catalog-pagination";
import { parseCatalogQuery, type ShopSearchParams } from "./catalog-query";
import { CatalogEmpty, CatalogUnavailable } from "./catalog-state";
import { ProductGrid } from "./product-grid";
import { SearchFilters } from "./search-filters";
import { SearchHeading } from "./search-heading";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { getPublicProducts } from "@/services/catalog.service";
import type { PublicProductPage, PublicProductQuery } from "@/types/catalog";
import { cookies } from "next/headers";

export async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const [params, cookieStore] = await Promise.all([searchParams, cookies()]);
  const query = parseCatalogQuery(params);
  const signedIn = cookieStore.has(
    process.env.SESSION_COOKIE_NAME ?? "session",
  );
  let catalog: PublicProductPage;

  try {
    catalog = await getPublicProducts(query);
  } catch {
    return (
      <CatalogFrame query={query}>
        <CatalogUnavailable />
      </CatalogFrame>
    );
  }

  return (
    <CatalogFrame query={query}>
      <CatalogContent catalog={catalog} query={query} signedIn={signedIn} />
    </CatalogFrame>
  );
}

function CatalogContent({
  catalog,
  query,
  signedIn,
}: {
  catalog: PublicProductPage;
  query: PublicProductQuery;
  signedIn: boolean;
}) {
  if (query.search) {
    return (
      <div className="flex flex-col gap-8">
        <SearchHeading count={catalog.totalItems} term={query.search} />
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <SearchFilters query={query} />
          <div className="flex min-w-0 flex-col gap-8">
            <CatalogProducts catalog={catalog} query={query} columns={3} signedIn={signedIn} />
          </div>
        </div>
      </div>
    );
  }

  if (query.occasion) {
    return (
      <div className="flex flex-col gap-8">
        <OccasionIntro occasion={query.occasion} />
        <OccasionControls query={query} />
        <OccasionCollectionHeading
          occasion={query.occasion}
          count={catalog.totalItems}
        />
        <CatalogProducts catalog={catalog} query={query} signedIn={signedIn} />
      </div>
    );
  }

  const filtered = Boolean(
    query.category ||
    query.minPriceCents !== undefined ||
    query.maxPriceCents !== undefined ||
    query.personalizable !== undefined,
  );
  return (
    <div className="flex flex-col gap-9">
      <CatalogIntro />
      <CatalogControls query={query} count={catalog.totalItems} />
      <CatalogProducts catalog={catalog} query={query} filtered={filtered} signedIn={signedIn} />
      <DecisionSupport />
    </div>
  );
}

function CatalogProducts({
  catalog,
  query,
  columns = 4,
  filtered = true,
  signedIn,
}: {
  catalog: PublicProductPage;
  query: PublicProductQuery;
  columns?: 3 | 4;
  filtered?: boolean;
  signedIn: boolean;
}) {
  return (
    <>
      <section id="collection-products" className="scroll-mt-28">
        {catalog.items.length ? (
          <ProductGrid products={catalog.items} columns={columns} signedIn={signedIn} />
        ) : (
          <CatalogEmpty filtered={filtered} />
        )}
      </section>
      <CatalogPagination catalog={catalog} query={query} />
    </>
  );
}

function CatalogFrame({
  children,
  query,
}: {
  children: React.ReactNode;
  query: PublicProductQuery;
}) {
  const spacing = query.search
    ? "py-7 sm:py-11"
    : query.occasion
      ? "py-7 sm:py-10"
      : "py-8 sm:py-12";
  return (
    <>
      <StorefrontHeader />
      <main className={`shell ${spacing}`}>{children}</main>
    </>
  );
}

function DecisionSupport() {
  return (
    <aside
      className="grid gap-3 rounded-2xl bg-[var(--subtle)] px-6 py-[18px] text-[13px] font-medium sm:grid-cols-3 sm:gap-12"
      aria-label="Shopping information"
    >
      <p>Eco score on every item</p>
      <p>30-day returns</p>
      <p>Carbon-neutral delivery</p>
    </aside>
  );
}
