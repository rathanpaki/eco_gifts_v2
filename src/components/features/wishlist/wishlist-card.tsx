"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Heart, ImageIcon, ShoppingBag } from "lucide-react";
import { useAddCartItem } from "@/hooks/use-cart";
import { useRemoveWishlistProduct } from "@/hooks/use-wishlist";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import { customizationPreviewUrl } from "@/services/customization.service";
import type { PublicProduct } from "@/types/catalog";

export function WishlistCard({ product }: { product: PublicProduct }) {
  const add = useAddCartItem();
  const remove = useRemoveWishlistProduct();
  const image = product.images[0];
  const customized = product.savedCustomization;
  const imageUrl = customized ? customizationPreviewUrl(customized.previewPath) : image?.url;
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);

  return (
    <article className="min-w-0">
      <Link
        href={productHref(product)}
        className="group relative block aspect-[282/317] overflow-hidden rounded-2xl bg-[#f2f1eb]"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={customized ? `Personalized ${product.name}` : (image?.alt ?? product.name)}
            fill
            unoptimized={shouldBypassImageOptimization(imageUrl)}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-[#878c87]">
            <ImageIcon aria-hidden="true" size={30} />
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[var(--brand)] shadow-sm">
          Eco {product.ecoScore}
        </span>
      </Link>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={productHref(product)}
              className="line-clamp-1 text-[15px] font-semibold hover:text-[var(--brand)]"
            >
              {product.name}
            </Link>
            <p className="mt-1 line-clamp-1 text-xs text-[var(--muted)]">
              {product.shortDescription}
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold">{price}</p>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_44px] gap-2">
          <button
            type="button"
            disabled={!product.inStock || add.isPending || add.isSuccess}
            onClick={() => add.mutate({ productId: product.id, quantity: 1, customizationId: customized?.id })}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#244c39] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {add.isSuccess ? (
              <Check aria-hidden="true" size={16} />
            ) : (
              <ShoppingBag aria-hidden="true" size={16} />
            )}
            {product.inStock
              ? add.isSuccess
                ? "Added"
                : "Add to bag"
              : "Out of stock"}
          </button>
          <button
            type="button"
            onClick={() => remove.mutate(product.id)}
            disabled={remove.isPending}
            aria-label={`Remove ${product.name} from wishlist`}
            className="grid h-11 place-items-center rounded-xl border border-[var(--line)] text-[var(--brand)] hover:bg-[#eef4ee] disabled:opacity-50"
          >
            <Heart aria-hidden="true" fill="currentColor" size={18} />
          </button>
        </div>
        {(add.error || remove.error) && (
          <p className="mt-2 text-xs text-red-700" role="alert">
            {(add.error ?? remove.error)?.message}
          </p>
        )}
      </div>
    </article>
  );
}

function productHref(product: PublicProduct) {
  const id = product.savedCustomization?.id;
  return id
    ? `/shop/${product.slug}?customizationId=${encodeURIComponent(id)}`
    : `/shop/${product.slug}`;
}
