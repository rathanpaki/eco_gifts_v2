"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRemoveCartItem, useUpdateCartItem } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/format-money";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { CartItem } from "@/types/cart";

export function CartItemCard({ item }: { item: CartItem }) {
  const update = useUpdateCartItem();
  const remove = useRemoveCartItem();
  const pending = update.isPending || remove.isPending;
  const error = update.error ?? remove.error;
  const changeQuantity = (quantity: number) => {
    if (quantity < 1 || quantity > item.stockQuantity) return;
    update.mutate({ itemId: item.itemId, quantity });
  };

  return (
    <article className="grid gap-4 rounded-[18px] border border-[var(--line)] p-[18px] sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:gap-5">
      <Link
        href={`/shop/${item.slug}`}
        className="relative block aspect-[5/4] overflow-hidden rounded-xl bg-[var(--subtle)] sm:h-[120px] sm:w-[150px]"
      >
        {item.image ? (
          <Image
            alt={item.image.alt}
            fill
            sizes="150px"
            src={item.image.url}
            unoptimized={shouldBypassImageOptimization(item.image.url)}
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center px-3 text-center text-xs text-[var(--muted)]">Image unavailable</span>
        )}
      </Link>

      <div className="min-w-0">
        <Link href={`/shop/${item.slug}`} className="serif text-xl hover:text-[var(--brand)]">
          {item.name}
        </Link>
        <p className="mt-1 text-xs text-[var(--muted)]">Eco score {item.ecoScore}/100</p>
        {item.customization ? <p className="mt-1 text-xs font-semibold text-[var(--brand)]">Personalized design attached</p> : null}
        <p className={`mt-2 text-xs font-semibold ${item.available && !item.exceedsStock ? "text-[var(--brand)]" : "text-red-700"}`}>
          {availabilityLabel(item)}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-xl border border-[var(--line)] bg-white" aria-label={`Quantity for ${item.name}`}>
            <button
              type="button"
              onClick={() => changeQuantity(item.quantity - 1)}
              disabled={pending || !item.available || item.quantity <= 1}
              className="grid size-10 place-items-center disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            ><Minus aria-hidden="true" size={15} /></button>
            <span className="min-w-8 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span>
            <button
              type="button"
              onClick={() => changeQuantity(item.quantity + 1)}
              disabled={pending || !item.available || item.quantity >= item.stockQuantity}
              className="grid size-10 place-items-center disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            ><Plus aria-hidden="true" size={15} /></button>
          </div>
          <button
            type="button"
            onClick={() => remove.mutate(item.itemId)}
            disabled={pending}
            className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-red-700 disabled:opacity-50"
          ><Trash2 aria-hidden="true" size={14} />Remove</button>
        </div>
        {error && <p className="mt-2 text-xs text-red-700" role="alert">{error.message}</p>}
      </div>

      <p className="text-base font-semibold sm:text-right">
        {item.available ? formatMoney(item.lineTotalCents, item.currency) : "Unavailable"}
      </p>
    </article>
  );
}

function availabilityLabel(item: CartItem): string {
  if (!item.available) return "This gift is no longer available.";
  if (item.exceedsStock) return `Reduce quantity to ${item.stockQuantity} or fewer.`;
  return `${item.stockQuantity} available`;
}
