import Link from "next/link";
import { ProductGrid } from "@/components/features/catalog/product-grid";
import { getFeaturedProducts } from "@/services/catalog.service";
import { cookies } from "next/headers";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export async function Products() {
  const [products, cookieStore] = await Promise.all([
    getFeaturedProducts(),
    cookies(),
  ]);
  const signedIn = cookieStore.has(process.env.SESSION_COOKIE_NAME ?? "session");

  return (
    <section id="shop" className="landing-products bg-white/40 py-20">
      <div className="shell">
        <ScrollReveal preset="blur-in">
          <div className="mb-9 text-center">
            <p className="eyebrow">Thoughtful additions</p>
            <h2 className="section-title mt-3">Featured sustainable products</h2>
          </div>
        </ScrollReveal>
        {products.length ? (
          <>
            <ScrollReveal delay={0.12} preset="fade-up">
              <ProductGrid products={products} signedIn={signedIn} />
            </ScrollReveal>
            <ScrollReveal delay={0.24}>
              <div className="mt-8 text-center">
              <Link href="/shop" className="premium-action inline-flex rounded-full border border-[var(--brand)] bg-white/50 px-5 py-3 text-sm font-semibold text-[var(--brand)] backdrop-blur">
                Explore all gifts
              </Link>
              </div>
            </ScrollReveal>
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
