import Link from "next/link";
import { ProductGrid } from "@/components/features/catalog/product-grid";
import { getFeaturedProducts } from "@/services/catalog.service";

export async function Products() {
  const products = await getFeaturedProducts();

  return (
    <section id="shop" className="bg-white/40 py-20">
      <div className="shell">
        <div className="mb-9 text-center">
          <p className="eyebrow">Thoughtful additions</p>
          <h2 className="section-title mt-3">Featured sustainable products</h2>
        </div>
        {products.length ? (
          <>
            <ProductGrid products={products} />
            <div className="mt-8 text-center">
              <Link href="/shop" className="inline-flex rounded-full border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)]">
                Explore all gifts
              </Link>
            </div>
          </>
        ) : (
          <div className="card mx-auto max-w-2xl p-10 text-center">
            <h3 className="serif text-2xl">Our next collection is being curated</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Published gifts will appear here as soon as the EcoGifts team makes them available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
