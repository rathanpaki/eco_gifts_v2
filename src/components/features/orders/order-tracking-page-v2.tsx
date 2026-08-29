"use client";

import Image from "next/image";
import Link from "next/link";
import { useOrder, useOrderDeliveryConfirmation } from "@/hooks/use-order";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { Order } from "@/types/checkout";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { DeliveryConfirmationCard } from "./delivery-confirmation-card";
import { OrderReviewSection } from "./order-review-section";
import {
  DetailCard,
  Journey,
  trackingTitle,
} from "./order-tracking-details-v2";

export function OrderTrackingPage({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) {
  const order = useOrder(orderId, userId);
  const confirmation = useOrderDeliveryConfirmation(orderId, userId);
  if (order.isLoading)
    return <LogoDrawLoader className="bg-[var(--page)]" label="Loading tracking details" size="page" />;
  if (order.isError || !order.data)
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[var(--page)]">
        <p className="text-sm text-red-700">This order could not be loaded.</p>
      </main>
    );
  return (
    <TrackingView
      order={order.data}
      onConfirm={() => confirmation.mutate()}
      pending={confirmation.isPending}
      error={confirmation.error?.message}
    />
  );
}

function TrackingView({
  error,
  onConfirm,
  order,
  pending,
}: {
  error?: string;
  onConfirm: () => void;
  order: Order;
  pending: boolean;
}) {
  const item = order.items[0];
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--page)] px-4 pb-16 pt-11 sm:px-6">
      <div className="mx-auto max-w-[1296px]">
        <header className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between sm:gap-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Order {order.orderNumber}
            </p>
            <h1 className="serif mt-3 text-[34px] leading-[0.98] sm:text-[40px]">
              {trackingTitle(order.fulfillmentStatus)}
            </h1>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Estimated delivery {order.delivery.estimatedDays}
            </p>
          </div>
          <span className="w-fit rounded-full bg-[#eef4ee] px-4 py-2 text-[11px] font-semibold text-[var(--brand)]">
            {order.fulfillmentStatus.replaceAll("_", " ")}
          </span>
        </header>

        <div className="mt-7 grid gap-7 lg:grid-cols-[520px_minmax(0,1fr)]">
          <Journey order={order} />
          <div className="grid content-start gap-4">
            <DetailCard title="Delivery address">
              {order.address.fullName}
              <br />
              {order.address.addressLine1}
              {order.address.addressLine2
                ? `, ${order.address.addressLine2}`
                : ""}
              <br />
              {order.address.city} {order.address.postalCode}
            </DetailCard>
            <DetailCard title="Delivery method">
              {order.delivery.name}
              <br />
              {order.delivery.description}
            </DetailCard>
            {item ? (
              <article className="flex min-h-[124px] items-center gap-4 rounded-2xl bg-[#eef4ee] p-[18px]">
                <div className="relative size-[86px] shrink-0 overflow-hidden rounded-xl bg-[var(--subtle)]">
                  {item.image ? (
                    <Image
                      alt={item.image.alt}
                      fill
                      sizes="86px"
                      src={item.image.url}
                      unoptimized={shouldBypassImageOptimization(
                        item.image.url,
                      )}
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {item.customization?.text
                      ? `Personalized · ${item.customization.text}`
                      : `Quantity ${item.quantity}`}
                  </p>
                  <Link
                    href={`/shop/${item.slug}`}
                    className="mt-2 inline-block text-xs font-semibold text-[var(--brand)]"
                  >
                    View gift details
                  </Link>
                </div>
              </article>
            ) : null}
            <aside className="flex flex-col items-start gap-2 rounded-xl bg-[var(--subtle)] px-4 py-3 text-xs sm:min-h-11 sm:flex-row sm:items-center sm:justify-between sm:py-0">
              <strong>Need to change something?</strong>
              <Link
                href="/help#order-support"
                className="font-semibold text-[var(--brand)]"
              >
                Contact support
              </Link>
            </aside>
          </div>
        </div>
        {order.deliveryConfirmationStatus !== "not_ready" ? (
          <div className="mt-7">
            <DeliveryConfirmationCard
              confirmedAt={order.deliveryConfirmedAt}
              error={error}
              onConfirm={onConfirm}
              pending={pending}
              status={order.deliveryConfirmationStatus}
            />
          </div>
        ) : null}
        {order.deliveryConfirmationStatus === "confirmed" ? (
          <OrderReviewSection orderId={order.id} items={order.items} />
        ) : null}
      </div>
    </main>
  );
}
