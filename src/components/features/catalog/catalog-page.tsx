import { CatalogControls } from "./catalog-controls";
import { CatalogIntro } from "./catalog-intro";
import { CatalogPagination } from "./catalog-pagination";
import { parseCatalogQuery, type ShopSearchParams } from "./catalog-query";
import { CatalogEmpty, CatalogUnavailable } from "./catalog-state";
import { ProductGrid } from "./product-grid";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { getPublicProducts } from "@/services/catalog.service";

export async function CatalogPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  const query = parseCatalogQuery(await searchParams);
  let catalog;

  try {
    catalog = await getPublicProducts(query);
  } catch {
    return <CatalogFrame><CatalogIntro /><CatalogControls query={query} /><CatalogUnavailable /></CatalogFrame>;
  }

  const filtered = Boolean(
    query.search || query.category || query.minPriceCents !== undefined ||
    query.maxPriceCents !== undefined || query.personalizable !== undefined,
  );

  return (
    <CatalogFrame>
      <CatalogIntro featured={catalog.items[0]} />
      <CatalogControls query={query} />
      {catalog.items.length ? <ProductGrid products={catalog.items} /> : <CatalogEmpty filtered={filtered} />}
      <CatalogPagination nextCursor={catalog.nextCursor} query={query} />
      <DecisionSupport />
    </CatalogFrame>
  );
}

function CatalogFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StorefrontHeader />
      <main className="shell flex flex-col gap-9 py-12 md:py-14">{children}</main>
    </>
  );
}

function DecisionSupport() {
  return (
    <aside className="grid gap-3 rounded-2xl bg-[var(--subtle)] px-6 py-[18px] text-[13px] font-medium sm:grid-cols-3" aria-label="Shopping information">
      <p>Eco score on every item</p>
      <p>Live stock availability</p>
      <p>Transparent eco evidence</p>
    </aside>
  );
}
