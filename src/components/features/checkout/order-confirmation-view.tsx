"use client";

import {
  ArrowRight,
  CheckCircle2,
  HandHeart,
  Printer,
  Truck,
} from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { Order } from "@/types/checkout";
import { OrderTrackingTimeline } from "@/components/features/orders/order-tracking-timeline";
import { DeliveryConfirmationCard } from "@/components/features/orders/delivery-confirmation-card";
import { ImpactReceipt, OrderFacts } from "./order-confirmation-details";

interface OrderConfirmationViewProps {
  confirmationError?: string;
  confirmationPending?: boolean;
  onConfirmDelivery?: () => void;
  order: Order;
  onContinueShopping: () => void;
}

export function OrderConfirmationView({
  confirmationError,
  confirmationPending,
  onConfirmDelivery,
  order,
  onContinueShopping,
}: OrderConfirmationViewProps) {
  const isCardPayment = order.paymentMethod === "demo_card";
  const header = orderHeader(order);
  return (
    <main className="mx-auto max-w-6xl space-y-7">
      <section className="border-b border-[var(--line)] pb-7 text-center">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[var(--brand)] text-white">
          <CheckCircle2 className="size-10" strokeWidth={2.5} />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
          {header.eyebrow}
        </p>
        <h1 className="serif mt-2 text-3xl sm:text-4xl">{header.title}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Order{" "}
          <strong className="font-mono text-slate-700">
            {order.orderNumber}
          </strong>{" "}
          {header.detail}
        </p>
      </section>

      <OrderFacts order={order} />

      <section className="rounded-[18px] border border-[var(--line)] bg-white p-6">
        <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-900">
          <Truck className="mt-0.5 size-5 shrink-0" />
          <div>
            <h2 className="font-bold">
              {isCardPayment ? "Card payment" : "Pay on delivery"}
            </h2>
            <p className="mt-1 text-xs leading-5">
              {isCardPayment
                ? "Your card payment has been confirmed."
                : `${formatMoney(order.totalCents, order.currency)} is due when your order arrives. Delivery estimate: ${order.delivery.estimatedDays}.`}
            </p>
          </div>
        </div>
        <div className="mt-5 divide-y divide-slate-100">
          {order.items.map((item) => (
            <div
              className="flex justify-between gap-4 py-3 text-sm"
              key={item.itemId}
            >
              <div>
                <strong>{item.name}</strong>
                <p className="text-xs text-slate-500">
                  Quantity {item.quantity}
                  {item.customization ? " · Personalized" : ""}
                </p>
              </div>
              <span className="font-semibold">
                {formatMoney(item.lineTotalCents, order.currency)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-slate-200 pt-4 font-bold">
          <span>{isCardPayment ? "Payment total" : "Total due"}</span>
          <span className="text-emerald-700">
            {formatMoney(order.totalCents, order.currency)}
          </span>
        </div>
        {order.ecoContribution ? (
          <div className="mt-5 flex gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-950">
            <HandHeart className="mt-0.5 size-5 shrink-0" />
            <p className="text-xs leading-5">
              Your {order.ecoContribution.cause.toLowerCase()} contribution
              earns {order.ecoContribution.rewardPointsEarned} EcoPoints.
              {order.ecoContribution.treeId
                ? ` Tree ID: ${order.ecoContribution.treeId}.`
                : ""}
            </p>
          </div>
        ) : null}
        <address className="mt-5 border-t border-slate-100 pt-4 text-xs not-italic leading-5 text-slate-600">
          <strong className="text-slate-900">Deliver to</strong>
          <br />
          {order.address.fullName}
          <br />
          {order.address.addressLine1}
          {order.address.addressLine2 ? (
            <>
              <br />
              {order.address.addressLine2}
            </>
          ) : null}
          <br />
          {order.address.city}
          {order.address.region ? `, ${order.address.region}` : ""}{" "}
          {order.address.postalCode}
          <br />
          {order.address.countryCode}
        </address>
        <OrderTrackingTimeline
          current={order.fulfillmentStatus}
          history={order.history}
        />
        <DeliveryConfirmationCard
          confirmedAt={order.deliveryConfirmedAt}
          error={confirmationError}
          onConfirm={onConfirmDelivery}
          pending={confirmationPending}
          status={order.deliveryConfirmationStatus}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ImpactReceipt order={order} />
        <div className="grid gap-3">
          <a
            href="#tracking-title"
            className="flex min-h-11 items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white"
          >
            Track this order
          </a>
          <button
            type="button"
            onClick={onContinueShopping}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--line)] text-sm font-semibold"
          >
            Continue shopping <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--line)] px-5 text-sm font-semibold"
        >
          <Printer size={16} />
          Print order
        </button>
      </div>
    </main>
  );
}

function orderHeader(order: Order) {
  if (order.deliveryConfirmationStatus === "confirmed") {
    return {
      eyebrow: "Delivery confirmed",
      title: "Thanks for confirming your gift arrived",
      detail: "was received and the delivery is complete.",
    };
  }
  if (order.deliveryConfirmationStatus === "awaiting_customer") {
    return {
      eyebrow: "Delivery reported",
      title: "Confirm that your gift arrived",
      detail: "was marked delivered. Confirm receipt below.",
    };
  }
  return {
    eyebrow: "Order placed",
    title: "Your gift is on its way to being made",
    detail:
      "is awaiting fulfilment. We’ll add an account notification for every status update.",
  };
}
