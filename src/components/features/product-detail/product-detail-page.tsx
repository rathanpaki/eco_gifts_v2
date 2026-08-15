import { CircleCheck, Gift } from "lucide-react";
import Link from "next/link";
import type { PublicProduct } from "@/types/catalog";
import { EcoEvidence } from "./eco-evidence";
import { ProductGallery } from "./product-gallery";
import { PurchasePanel } from "./purchase-panel";

type ProductDetailPageProps = {
  product: PublicProduct;
  signedIn: boolean;
};

export function ProductDetailPage({ product, signedIn }: ProductDetailPageProps) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);

  return (
    <main className="bg-[var(--page)] px-5 pb-14 pt-8 sm:px-8 lg:px-[72px] lg:pt-9">
      <div className="mx-auto max-w-[1296px]">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
          <Link href="/shop" className="hover:text-[var(--brand)]">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[var(--brand)]">
            {product.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,640px)_minmax(360px,1fr)] xl:gap-14">
          <ProductGallery images={product.images} productName={product.name} />
          <section aria-labelledby="product-title" className="space-y-5 xl:pt-1">
            <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 id="product-title" className="serif text-[clamp(36px,4vw,48px)] leading-[1.04]">{product.name}</h1>
                <p className="mt-2 text-sm text-[var(--muted)]">{product.shortDescription}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#eef4ee] px-3 py-2 text-xs font-semibold text-[#56825a]">
                <CircleCheck size={14} aria-hidden="true" />
                <span>Eco score {product.ecoScore} / 100</span>
              </div>
            </div>

            <p className="text-2xl font-semibold">{price}</p>
            <p className="max-w-[560px] whitespace-pre-line text-[15px] leading-6 text-[var(--muted)]">{product.description}</p>

            {product.personalizationAvailable && (
              <div className="flex items-center gap-3 rounded-[14px] bg-[#f7eee7] p-4">
                <Gift size={18} className="shrink-0 text-[var(--brand)]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">Personalization available</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">This product supports customer personalization.</p>
                </div>
              </div>
            )}

            <PurchasePanel
              productId={product.id}
              productName={product.name}
              productSlug={product.slug}
              personalizationAvailable={product.personalizationAvailable}
              signedIn={signedIn}
              inStock={product.inStock}
              lowStock={product.lowStock}
              stockQuantity={product.stockQuantity}
            />
          </section>
        </div>

        <div className="mt-9">
          <EcoEvidence evidence={product.ecoEvidence} />
        </div>
      </div>
    </main>
  );
}
