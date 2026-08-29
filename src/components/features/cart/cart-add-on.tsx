"use client";

import Image from "next/image";
import { useAddCartItem } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/format-money";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { PublicProduct } from "@/types/catalog";

export function CartAddOn({ product }: { product: PublicProduct }) {
  const add = useAddCartItem();
  const image = product.images[0];
  return (
    <aside className="flex min-h-24 flex-wrap items-center rounded-[18px] border border-[var(--line)] bg-[#f7eee7] p-[14px] sm:flex-nowrap">
      <div className="relative size-[68px] shrink-0 overflow-hidden rounded-xl bg-[var(--subtle)]">
        {image ? (
          <Image
            alt={image.alt}
            fill
            sizes="68px"
            src={image.url}
            unoptimized={shouldBypassImageOptimization(image.url)}
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="ml-[14px] min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase text-[#8a918a]">
          Add a finishing touch
        </p>
        <p className="mt-1 truncate text-[13px] font-semibold">
          {product.name} · {formatMoney(product.priceCents, product.currency)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => add.mutate({ productId: product.id, quantity: 1 })}
        disabled={add.isPending || add.isSuccess}
        className="mt-3 h-10 w-full shrink-0 rounded-xl border border-[#b5c9b6] bg-[var(--page)] text-xs font-semibold text-[var(--brand)] disabled:opacity-60 sm:ml-4 sm:mt-0 sm:w-[150px]"
      >
        {add.isPending ? "Adding..." : add.isSuccess ? "Added" : "Add to bag"}
      </button>
    </aside>
  );
}
