"use client";

import Image from "next/image";
import Link from "next/link";
import { useAddCartItem } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/format-money";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { OrderSummary } from "@/types/checkout";

export function OrderHistoryCard({ order }: { order: OrderSummary }) {
  const add = useAddCartItem();
  const delivered = order.fulfillmentStatus === "delivered";
  const confirmed = order.deliveryConfirmationStatus === "confirmed";
  const item = order.items[0];
  return (
    <article className="min-w-0 overflow-hidden rounded-[18px] border border-[var(--line)] p-4 sm:p-6">
      <header className="flex flex-col items-start gap-3 border-b border-[var(--line)] pb-4 sm:flex-row sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="break-words text-base font-semibold">Order {order.orderNumber}</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {delivered ? "Delivered" : "Placed"}{" "}
            {new Date(order.createdAt).toLocaleDateString()} ·{" "}
            {formatMoney(order.totalCents, order.currency)}
          </p>
        </div>
        <span
          className={
            "rounded-full px-3 py-1 text-[11px] font-semibold " +
            (delivered
              ? "bg-[#eef4ee] text-[var(--brand)]"
              : "bg-[#f7eee7] text-[#b86c2d]")
          }
        >
          ● {order.fulfillmentStatus.replaceAll("_", " ")}
        </span>
      </header>
      <div className="grid min-w-0 grid-cols-[72px_minmax(0,1fr)] items-center gap-3 py-4 sm:grid-cols-[80px_minmax(0,1fr)_auto] sm:gap-4">
        <div className="relative size-[72px] overflow-hidden rounded-xl bg-[var(--subtle)] sm:size-20">
          {item?.image ? (
            <Image
              alt={item.image.alt}
              fill
              sizes="80px"
              src={item.image.url}
              unoptimized={shouldBypassImageOptimization(item.image.url)}
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold">
            {order.items.map((entry) => entry.name).join(" + ")}
          </p>
          <p className="mt-2 truncate text-xs text-[var(--muted)]">
            {item?.customization?.text
              ? "Personalized for " + item.customization.text
              : order.totalQuantity +
                " item" +
                (order.totalQuantity === 1 ? "" : "s")}
          </p>
        </div>
        <p className="hidden shrink-0 text-right text-sm font-semibold sm:block">
          {formatMoney(order.totalCents, order.currency)}
          <span className="mt-1 block text-[11px] font-normal text-[var(--muted)]">
            Qty {order.totalQuantity}
          </span>
        </p>
      </div>
      <footer className="sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <p className="text-xs text-[var(--muted)]">
          {delivered
            ? "Sent to " + (item?.customization?.text ?? "the recipient")
            : "Estimated arrival: " + order.estimatedDelivery}
        </p>
        <div className="mt-3 flex w-full flex-col gap-2 sm:mt-0 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link
            href={"/account/orders/" + order.id}
            className="flex min-h-12 items-center justify-center rounded-xl border border-[#b5c9b6] px-5 text-xs font-semibold text-[var(--brand)] sm:h-11 sm:min-h-0"
          >
            View details
          </Link>
          {delivered ? (
            <>
              <Link
                href={
                  confirmed
                    ? "/account/orders/" + order.id + "#order-reviews"
                    : "/orders/" + order.id +
                      "/tracking#delivery-confirmation"
                }
                className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-6 text-xs font-semibold text-white sm:h-11 sm:min-h-0"
              >
                {confirmed ? "Review products" : "Confirm delivery"}
              </Link>
              {item ? (
                <button
                  type="button"
                  disabled={add.isPending || add.isSuccess}
                  onClick={() =>
                    add.mutate({ productId: item.productId, quantity: 1 })
                  }
                  className="flex min-h-12 items-center justify-center rounded-xl px-3 text-xs font-semibold text-[var(--brand)] disabled:opacity-50 sm:h-11 sm:min-h-0"
                >
                  {add.isSuccess ? "Added to cart" : "Buy again"}
                </button>
              ) : null}
            </>
          ) : (
            <Link
              href={"/orders/" + order.id + "/tracking"}
              className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-6 text-xs font-semibold text-white sm:h-11 sm:min-h-0"
            >
              Track order
            </Link>
          )}
        </div>
      </footer>
      {add.error ? (
        <p className="mt-2 text-xs text-red-700">{add.error.message}</p>
      ) : null}
    </article>
  );
}
