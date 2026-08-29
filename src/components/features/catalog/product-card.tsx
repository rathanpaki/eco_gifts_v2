import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { PublicProduct } from "@/types/catalog";
import { ProductCardCartButton } from "./product-card-cart-button";
import { ProductCardWishlistButton } from "./product-card-wishlist-button";

export function ProductCard({
  product,
  eager = false,
  signedIn = false,
}: {
  product: PublicProduct;
  eager?: boolean;
  signedIn?: boolean;
}) {
  const image = product.images[0];

  return (
    <article className="card group flex h-[317px] w-[282px] shrink-0 snap-start flex-col gap-2 p-4 sm:w-auto">
      <div className="relative">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative h-[190px] overflow-hidden rounded-xl bg-[var(--subtle)]">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              loading={eager ? "eager" : "lazy"}
              unoptimized={shouldBypassImageOptimization(image.url)}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-[var(--muted)]">
              <ImageIcon aria-hidden="true" size={28} />
              <span className="sr-only">No product image available</span>
            </span>
          )}
        </div>
      </Link>
      <ProductCardWishlistButton
        productId={product.id}
        productName={product.name}
        productSlug={product.slug}
        signedIn={signedIn}
      />
      </div>
      <p className="text-[11px] font-semibold leading-[17px] text-[var(--brand)]">
        eco {product.ecoScore}/100
      </p>
      <Link
        href={`/shop/${product.slug}`}
        className="truncate text-base font-semibold leading-6"
      >
        {product.name}
      </Link>
      <div className="mt-auto flex h-6 items-center justify-between gap-3 text-sm font-semibold text-[var(--brand)]">
        <span>{formatPrice(product.priceCents, product.currency)}</span>
        <ProductCardCartButton
          productId={product.id}
          productName={product.name}
          disabled={!product.inStock}
        />
      </div>
    </article>
  );
}

function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
