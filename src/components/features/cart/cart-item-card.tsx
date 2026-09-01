"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
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
    <article className="glass-panel interactive-card grid grid-cols-[104px_minmax(0,1fr)] gap-x-3 gap-y-2 rounded-[18px] p-3 sm:min-h-[156px] sm:grid-cols-[150px_minmax(0,1fr)_104px] sm:gap-[18px] sm:p-[18px]">
      <ProductImage item={item} />
      <div className="min-w-0 py-1 sm:py-3">
        <Link
          href={editHref(item)}
          className="block truncate text-[15px] font-semibold leading-5 hover:text-[var(--brand)]"
        >
          <span className="sm:hidden">{item.name}</span>
          <span className="serif hidden text-xl font-normal leading-[27px] sm:inline">
            {item.name}
          </span>
        </Link>
        <p className="mt-1 truncate text-[13px] leading-4 text-[#8a918a]">
          {detail(item)}
        </p>
        <p
          className={`mt-[7px] text-xs font-medium ${
            item.available && !item.exceedsStock
              ? "text-[var(--brand)]"
              : "text-red-700"
          }`}
        >
          {availabilityLabel(item)}
        </p>
        <div className="mt-[7px] flex items-center gap-[18px] text-xs">
          <Link
            href={editHref(item)}
            className="font-semibold text-[var(--brand)]"
          >
            Edit details
          </Link>
          <button
            type="button"
            onClick={() => remove.mutate(item.itemId)}
            disabled={pending}
            className="text-[#8a918a] disabled:opacity-50"
          >
            Remove
          </button>
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-700" role="alert">
            {error.message}
          </p>
        )}
      </div>
      <div className="col-start-2 flex min-w-0 items-center justify-between sm:col-auto sm:min-w-[104px] sm:flex-col sm:items-end sm:py-3">
        <p className="text-base font-semibold leading-5">
          {item.available
            ? formatMoney(item.lineTotalCents, item.currency)
            : "Unavailable"}
        </p>
        <Quantity item={item} pending={pending} change={changeQuantity} />
      </div>
    </article>
  );
}

function ProductImage({ item }: { item: CartItem }) {
  return (
    <Link
      href={`/shop/${item.slug}`}
      className="relative row-span-2 block h-[134px] w-[104px] overflow-hidden rounded-xl bg-[var(--subtle)] sm:row-auto sm:h-[120px] sm:w-[150px]"
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
        <span className="absolute inset-0 grid place-items-center px-3 text-center text-xs text-[var(--muted)]">
          Image unavailable
        </span>
      )}
    </Link>
  );
}

function Quantity({
  item,
  pending,
  change,
}: {
  item: CartItem;
  pending: boolean;
  change: (quantity: number) => void;
}) {
  return (
    <div
      className="flex h-10 w-[104px] items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--subtle)] p-1.5 sm:mt-auto"
      aria-label={`Quantity for ${item.name}`}
    >
      <Step
        label="Decrease quantity"
        disabled={pending || item.quantity <= 1}
        onClick={() => change(item.quantity - 1)}
      >
        <Minus size={14} />
      </Step>
      <span className="w-8 text-center text-sm" aria-live="polite">
        {item.quantity}
      </span>
      <Step
        label="Increase quantity"
        disabled={pending || item.quantity >= item.stockQuantity}
        onClick={() => change(item.quantity + 1)}
      >
        <Plus size={14} />
      </Step>
    </div>
  );
}

function Step({
  children,
  disabled,
  label,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="grid size-7 place-items-center rounded-lg bg-[var(--page)] disabled:opacity-40"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function detail(item: CartItem) {
  if (item.customization?.text)
    return `Personalized · “${item.customization.text}”`;
  if (item.customization) return "Personalized · Saved design";
  return `Eco score ${item.ecoScore}/100`;
}

function editHref(item: CartItem) {
  if (!item.customization) return `/shop/${item.slug}`;
  const query = new URLSearchParams({
    cartItemId: item.itemId,
    customizationId: item.customization.id,
  });
  return `/shop/${item.slug}?${query}`;
}

function availabilityLabel(item: CartItem): string {
  if (!item.available) return "This gift is no longer available.";
  if (item.exceedsStock)
    return `Reduce quantity to ${item.stockQuantity} or fewer.`;
  return "Arrives in 3-5 business days";
}
