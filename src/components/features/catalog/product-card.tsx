import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { PublicProduct } from "@/types/catalog";

export function ProductCard({ product, eager = false }: { product: PublicProduct; eager?: boolean }) {
  const image = product.images[0];

  return (
    <article className="card flex min-w-0 flex-col p-4">
      <Link href={`/shop/${product.slug}`} className="group flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--subtle)]">
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
        <p className="mt-3 text-[11px] font-semibold text-[var(--brand)]">
          eco {product.ecoScore}/100
        </p>
        <h2 className="mt-1 line-clamp-2 min-h-12 text-base font-semibold leading-6">
          {product.name}
        </h2>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-sm font-semibold text-[var(--brand)]">
          <span>{formatPrice(product.priceCents, product.currency)}</span>
          <span className="inline-flex items-center gap-1">
            {product.inStock ? (
              <><span>View gift</span><ArrowRight aria-hidden="true" size={14} /></>
            ) : "Out of stock"}
          </span>
        </div>
      </Link>
    </article>
  );
}

function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
