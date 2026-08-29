import { ArrowRight, Gift, Leaf, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/format-money";
import type { OrderSummary } from "@/types/checkout";
import { OrderStatusBadge } from "./order-status-badge";

export function OrderHistoryCard({ order }: { order: OrderSummary }) {
  const visibleItems = order.items.slice(0, 3);
  const remaining = order.items.length - visibleItems.length;
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
      <header className="flex flex-col gap-3 border-b border-[var(--line)] bg-[var(--subtle)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-[var(--muted)]">
            Placed {formatOrderDate(order.createdAt)}
          </p>
          <h2 className="mt-1 font-mono text-sm font-bold text-[var(--ink)]">
            {order.orderNumber}
          </h2>
        </div>
        <div className="grid justify-items-start gap-2 sm:justify-items-end">
          <OrderStatusBadge status={order.fulfillmentStatus} />
          {order.deliveryConfirmationStatus === "awaiting_customer" ? (
            <span className="text-xs font-semibold text-amber-700">
              Receipt confirmation needed
            </span>
          ) : null}
        </div>
      </header>

      <div className="divide-y divide-[var(--line)] px-4 sm:px-5">
        {visibleItems.map((item) => (
          <div
            className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3 py-4 sm:flex"
            key={item.itemId}
          >
            <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[var(--subtle)] text-[var(--brand)]">
              {item.image ? (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={56}
                  height={56}
                  className="size-14 object-cover"
                />
              ) : (
                <Gift aria-hidden="true" size={20} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/shop/${item.slug}`}
                className="truncate text-sm font-semibold hover:text-[var(--brand)]"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Quantity {item.quantity}
                {item.customization ? " · Personalized" : ""}
              </p>
            </div>
            <p className="col-span-2 text-sm font-semibold sm:col-auto">
              {formatMoney(item.lineTotalCents, order.currency)}
            </p>
          </div>
        ))}
      </div>

      {remaining > 0 && (
        <p className="border-t border-[var(--line)] px-5 py-3 text-xs text-[var(--muted)]">
          {remaining} more product{remaining === 1 ? "" : "s"} in this order
        </p>
      )}
      <footer className="grid gap-4 border-t border-[var(--line)] px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1.5">
            <Truck size={14} /> {order.estimatedDelivery}
          </span>
          <span className="flex items-center gap-1.5">
            <Leaf size={14} /> Eco score {order.impact.score}
          </span>
        </div>
        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <p>
            <span className="text-xs text-[var(--muted)]">Total </span>
            <strong>{formatMoney(order.totalCents, order.currency)}</strong>
          </p>
          <Link
            href={`/orders/${order.id}`}
            className="flex items-center gap-1 text-sm font-semibold text-[var(--brand)]"
          >
            Details <ArrowRight size={15} />
          </Link>
        </div>
      </footer>
    </article>
  );
}

function formatOrderDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
