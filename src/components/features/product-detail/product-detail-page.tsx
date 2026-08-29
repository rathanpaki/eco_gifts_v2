import { Circle } from "lucide-react";
import Link from "next/link";
import type { PublicProduct } from "@/types/catalog";
import type { ProductReviewFeed } from "@/types/product-review";
import { EcoEvidence } from "./eco-evidence";
import { ProductGallery } from "./product-gallery";
import { PurchasePanel } from "./figma-purchase-panel";
import { ProductReviewSummary } from "./product-review-summary";
import { ProductReviews } from "./product-reviews";

type ProductDetailPageProps = {
  product: PublicProduct;
  signedIn: boolean;
  reviews: ProductReviewFeed;
  initialCartItemId?: string;
  initialCustomizationId?: string;
};

export function ProductDetailPage({
  product,
  signedIn,
  reviews,
  initialCartItemId,
  initialCustomizationId,
}: ProductDetailPageProps) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);

  return (
    <main className="bg-[var(--page)] px-5 pb-14 pt-4 sm:px-8 sm:pt-8 lg:px-[72px] lg:pt-9">
      <div className="mx-auto max-w-[1296px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-[14px] flex items-center gap-2 overflow-hidden text-xs font-medium text-[var(--brand)] sm:mb-9 sm:flex-wrap sm:text-[11px] sm:font-semibold sm:uppercase sm:tracking-[0.1em] sm:text-[var(--muted)]"
        >
          <Link href="/shop" className="flex shrink-0 items-center gap-2 hover:text-[var(--brand)]">
            <span aria-hidden="true" className="text-lg sm:hidden">‹</span> Gifts
          </Link>
          <span aria-hidden="true" className="hidden sm:inline">/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[var(--brand)]"
          >
            {product.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="truncate">{product.name}</span>
        </nav>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,640px)_minmax(360px,600px)] xl:gap-14">
          <ProductGallery
            images={product.images}
            productId={product.id}
            productName={product.name}
            productSlug={product.slug}
            signedIn={signedIn}
          />
          <section
            aria-labelledby="product-title"
            className="space-y-3 sm:space-y-4 xl:pt-1"
          >
            <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1
                  id="product-title"
                  className="serif text-[30px] leading-[1.08] sm:text-[clamp(36px,4vw,42px)] sm:leading-[1.04]"
                >
                  {product.name}
                </h1>
                <p className="mt-1.5 hidden text-sm text-[var(--muted)] sm:block">
                  {product.shortDescription}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#eef4ee] px-3 py-2 text-xs font-semibold text-[#56825a]">
                <Circle fill="currentColor" size={8} aria-hidden="true" />
                <span>Eco score {product.ecoScore} / 100</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3"><p className="text-[17px] font-semibold text-[var(--brand)] sm:text-2xl sm:text-[var(--ink)]">{price}</p><ProductReviewSummary feed={reviews} /></div>
            <p className="max-w-[560px] whitespace-pre-line text-[13px] leading-[18px] text-[var(--muted)] sm:text-[15px] sm:leading-6">
              {product.description}
            </p>

            <div className="sm:hidden">
              <EcoEvidence compact ecoScore={product.ecoScore} evidence={product.ecoEvidence} />
            </div>

            <PurchasePanel
              currency={product.currency}
              imageUrl={product.images[0]?.url}
              priceCents={product.priceCents}
              productId={product.id}
              productName={product.name}
              productSlug={product.slug}
              personalizationAvailable={product.personalizationAvailable}
              signedIn={signedIn}
              inStock={product.inStock}
              lowStock={product.lowStock}
              stockQuantity={product.stockQuantity}
              initialCartItemId={initialCartItemId}
              initialCustomizationId={initialCustomizationId}
            />
          </section>
        </div>

        <div className="mt-9 hidden sm:block" id="product-evidence">
          <EcoEvidence
            ecoScore={product.ecoScore}
            evidence={product.ecoEvidence}
          />
        </div>
        <ProductReviews feed={reviews} />
      </div>
    </main>
  );
}
