"use client";

import { Check } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { Order } from "@/types/checkout";
import { DeliveryConfirmationCard } from "@/components/features/orders/delivery-confirmation-card";

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
  const cardPayment = order.paymentMethod === "demo_card";
  const needsConfirmation = order.deliveryConfirmationStatus !== "not_ready";
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--page)] px-5 pb-16 pt-8 sm:min-h-[calc(100vh-72px)] sm:px-6 sm:pt-11">
      <div className="mx-auto max-w-[1200px]">
        <section className="text-center" aria-labelledby="confirmation-title">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--brand)] text-white">
            <Check size={30} strokeWidth={2} aria-hidden="true" />
          </div>
          <h1
            id="confirmation-title"
            className="serif mt-5 text-[34px] leading-tight sm:text-[40px]"
          >
            {confirmationTitle(order)}
          </h1>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Order {order.orderNumber} · Confirmation is ready in your account
          </p>
        </section>

        <OrderFacts order={order} cardPayment={cardPayment} />
        <NextSteps order={order} />

        <section className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,856px)_320px]">
          <ImpactReceipt order={order} />
          <div className="grid content-start gap-2.5">
            <a
              href={`/orders/${order.id}/tracking`}
              className="flex min-h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white sm:h-11 sm:min-h-0"
            >
              Track this order
            </a>
            <button
              type="button"
              onClick={onContinueShopping}
              className="flex min-h-12 items-center justify-center rounded-xl border border-[var(--line)] px-[18px] text-sm font-semibold sm:h-11 sm:min-h-0"
            >
              Continue shopping
            </button>
          </div>
        </section>

        {needsConfirmation ? (
          <div className="mt-7">
            <DeliveryConfirmationCard
              confirmedAt={order.deliveryConfirmedAt}
              error={confirmationError}
              onConfirm={onConfirmDelivery}
              pending={confirmationPending}
              status={order.deliveryConfirmationStatus}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}

function OrderFacts({
  cardPayment,
  order,
}: {
  cardPayment: boolean;
  order: Order;
}) {
  const facts = [
    ["Estimated delivery", order.delivery.estimatedDays],
    ["Recipient", order.address.fullName],
    [
      cardPayment ? "Total paid" : "Total due",
      formatMoney(order.totalCents, order.currency),
    ],
    ["Payment", cardPayment ? "Card payment" : "Pay on delivery"],
  ];
  return (
    <section className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {facts.map(([label, value]) => (
        <article
          className="min-h-[78px] rounded-[14px] bg-[var(--subtle)] px-4 py-4 sm:h-[74px] sm:px-[18px]"
          key={label}
        >
          <p className="text-[11px] text-[var(--muted)]">{label}</p>
          <p className="mt-2 truncate text-sm font-semibold">{value}</p>
        </article>
      ))}
    </section>
  );
}

function NextSteps({ order }: { order: Order }) {
  const current = statusIndex(order.fulfillmentStatus);
  const steps = [
    ["Making your gift", current === 0 ? "Started" : "Complete"],
    ["Packed with care", current < 1 ? "Next" : "Complete"],
    [
      order.delivery.name,
      current < 2 ? order.delivery.estimatedDays : "In progress",
    ],
  ];
  return (
    <section
      id="order-tracking"
      className="mt-7 min-h-[169px] rounded-[18px] border border-[var(--line)] p-6"
    >
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-4">
        <h2 className="serif text-[26px] leading-none">What happens next</h2>
        <p className="text-xs text-[var(--muted)]">
          We’ll keep your account updated at every status change
        </p>
      </div>
      <ol className="mt-9 grid gap-5 sm:grid-cols-3">
        {steps.map(([title, detail], index) => (
          <li className="flex items-center gap-[14px]" key={title}>
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-full border text-sm font-semibold ${index <= current ? "border-[var(--brand)] bg-[#eef4ee] text-[var(--brand)]" : "border-[var(--line)] text-[var(--muted)]"}`}
            >
              {index + 1}
            </span>
            <span>
              <strong className="block text-sm">{title}</strong>
              <span className="mt-1 block text-xs text-[var(--muted)]">
                {detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ImpactReceipt({ order }: { order: Order }) {
  const impact = [
    `${order.impact.plasticAvoidedGrams}g plastic avoided`,
    `${order.impact.co2SavedKg}kg estimated CO₂e saving`,
    order.ecoContribution?.treeId ? "1 tree supported" : null,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <article className="min-h-[92px] rounded-2xl bg-[#eef4ee] px-5 py-6">
      <h2 className="serif text-[22px] leading-none">Your impact receipt</h2>
      <p className="mt-3 text-sm text-[var(--muted)]">{impact}</p>
    </article>
  );
}

function confirmationTitle(order: Order) {
  if (order.deliveryConfirmationStatus === "confirmed")
    return "Thanks for confirming your gift arrived";
  if (order.deliveryConfirmationStatus === "awaiting_customer")
    return "Please confirm that your gift arrived";
  return "Your gift is on its way to being made";
}

function statusIndex(status: Order["fulfillmentStatus"]) {
  if (status === "delivered") return 2;
  if (status === "shipped") return 2;
  if (status === "processing") return 1;
  return 0;
}
