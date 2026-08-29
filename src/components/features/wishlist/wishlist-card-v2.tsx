"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Heart } from "lucide-react";
import { useAddCartItem } from "@/hooks/use-cart";
import { useRemoveWishlistProduct } from "@/hooks/use-wishlist";
import { formatMoney } from "@/lib/format-money";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import { customizationPreviewUrl } from "@/services/customization.service";
import type { PublicProduct } from "@/types/catalog";

export function WishlistCard({ product }: { product: PublicProduct }) {
  const add = useAddCartItem();
  const remove = useRemoveWishlistProduct();
  const image = product.images[0];
  const customized = product.savedCustomization;
  const imageUrl = customized ? customizationPreviewUrl(customized.previewPath) : image?.url;
  return (
    <article className="relative h-[317px] min-w-0 rounded-2xl border border-[var(--line)] p-[14px]">
      <Link
        href={productHref(product)}
        className="relative block h-[190px] overflow-hidden rounded-xl bg-[var(--subtle)]"
      >
        {imageUrl ? (
          <Image
            alt={customized ? `Personalized ${product.name}` : (image?.alt ?? product.name)}
            fill
            sizes="282px"
            src={imageUrl}
            unoptimized={shouldBypassImageOptimization(imageUrl)}
            className="object-cover"
          />
        ) : null}
      </Link>
      <button
        type="button"
        disabled={remove.isPending}
        onClick={() => remove.mutate(product.id)}
        aria-label={`Remove ${product.name} from saved gifts`}
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/90 text-[var(--brand)]"
      >
        <Heart size={17} fill="currentColor" aria-hidden="true" />
      </button>
      <p className="mt-2 text-[10px] text-[var(--brand)]">
        eco {product.ecoScore}/100
      </p>
      <Link
        href={productHref(product)}
        className="mt-2 block truncate text-sm font-semibold"
      >
        {product.name}
      </Link>
      <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
        <strong>{formatMoney(product.priceCents, product.currency)}</strong>
        <button
          type="button"
          disabled={!product.inStock || add.isPending || add.isSuccess}
          onClick={() => add.mutate({ productId: product.id, quantity: 1, customizationId: customized?.id })}
          className="flex min-h-11 items-center gap-1 font-semibold text-[var(--brand)] disabled:opacity-50"
        >
          {add.isSuccess ? (
            <>
              <Check size={14} aria-hidden="true" /> Added
            </>
          ) : (
            <>Add to cart</>
          )}
        </button>
      </div>
      {add.error || remove.error ? (
        <p className="absolute inset-x-3 bottom-1 text-[10px] text-red-700">
          {(add.error ?? remove.error)?.message}
        </p>
      ) : null}
    </article>
  );
}

function productHref(product: PublicProduct) {
  const id = product.savedCustomization?.id;
  return id
    ? `/shop/${product.slug}?customizationId=${encodeURIComponent(id)}`
    : `/shop/${product.slug}`;
}
