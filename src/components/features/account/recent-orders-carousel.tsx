"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { OrderSummary } from "@/types/checkout";

export function RecentOrdersCarousel({ orders }: { orders: OrderSummary[] }) {
  const [index, setIndex] = useState(0);
  if (!orders.length) return <NoOrders />;
  const activeIndex = index % orders.length;
  const order = orders[activeIndex];
  const multiple = orders.length > 1;
  return (
    <section aria-label="Recent orders">
      {multiple ? (
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold text-[var(--muted)]">
            Recent active orders · {activeIndex + 1} of {orders.length}
          </p>
          <div className="flex gap-2">
            <CarouselButton
              label="Previous order"
              onClick={() => setIndex((current) => (current - 1 + orders.length) % orders.length)}
            >
              <ChevronLeft aria-hidden="true" size={17} />
            </CarouselButton>
            <CarouselButton
              label="Next order"
              onClick={() => setIndex((current) => (current + 1) % orders.length)}
            >
              <ChevronRight aria-hidden="true" size={17} />
            </CarouselButton>
          </div>
        </div>
      ) : null}
      <OrderSlide key={order.id} order={order} />
      {multiple ? (
        <div className="mt-3 flex justify-center gap-2" aria-label="Choose an order">
          {orders.map((value, position) => (
            <button
              key={value.id}
              type="button"
              aria-label={`Show order ${position + 1}`}
              aria-current={position === index}
              onClick={() => setIndex(position)}
              className={`h-2 rounded-full transition-all ${
                position === activeIndex ? "w-6 bg-[var(--brand)]" : "w-2 bg-[#cfd7cf]"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function OrderSlide({ order }: { order: OrderSummary }) {
  const item = order.items[0];
  return (
    <article
      className="min-w-0 rounded-[18px] border border-[var(--line)] p-4 sm:min-h-[176px] sm:p-5"
      aria-live="polite"
    >
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h2 className="serif break-all text-lg">Order {order.orderNumber}</h2>
        <span className="rounded-full bg-[#eef4ee] px-3 py-1 text-[11px] font-semibold capitalize text-[var(--brand)]">
          {order.fulfillmentStatus.replaceAll("_", " ")}
        </span>
      </div>
      <div className="mt-4 grid min-w-0 grid-cols-[72px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[86px_minmax(0,1fr)_auto] sm:gap-4">
        <div className="relative size-[72px] overflow-hidden rounded-xl bg-[var(--subtle)] sm:size-[86px]">
          {item?.image ? (
            <Image
              alt={item.image.alt}
              fill
              sizes="86px"
              src={item.image.url}
              unoptimized={shouldBypassImageOptimization(item.image.url)}
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold">
            {order.items.map((value) => value.name).join(" + ")}
          </p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Estimated delivery {order.estimatedDelivery}
          </p>
        </div>
        <Link
          href={`/orders/${order.id}`}
          className="col-span-2 flex min-h-11 items-center justify-center rounded-xl border border-[#b5c9b6] text-xs font-semibold text-[var(--brand)] sm:col-auto sm:ml-auto sm:min-h-0 sm:border-0"
        >
          Track order
        </Link>
      </div>
    </article>
  );
}

function CarouselButton(props: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={props.label}
      onClick={props.onClick}
      className="grid size-11 place-items-center rounded-[10px] border border-[var(--line)] bg-[var(--page)] text-[var(--brand)] sm:size-9"
    >
      {props.children}
    </button>
  );
}

function NoOrders() {
  return (
    <article className="rounded-[18px] border border-[var(--line)] p-6">
      <h2 className="serif text-xl">No orders yet</h2>
      <Link href="/shop" className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]">
        Explore gifts
      </Link>
    </article>
  );
}
