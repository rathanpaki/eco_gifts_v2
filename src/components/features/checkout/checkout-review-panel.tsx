"use client";

import { CheckCircle2 } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { DeliveryAddress, CheckoutQuote } from "@/types/checkout";
import type { CheckoutStage } from "./checkout-progress";
import type { PaymentPresentation } from "./payment-method-panel";

interface CheckoutReviewPanelProps {
  address: DeliveryAddress;
  confirmed: boolean;
  currency: string;
  error?: string;
  payment: PaymentPresentation;
  pending: boolean;
  quote: CheckoutQuote;
  onConfirmed: (value: boolean) => void;
  onEdit: (stage: CheckoutStage) => void;
}

export function CheckoutReviewPanel({
  address,
  confirmed,
  currency,
  error,
  payment,
  pending,
  quote,
  onConfirmed,
  onEdit,
}: CheckoutReviewPanelProps) {
  return (
    <section aria-labelledby="review-title">
      <h2 id="review-title" className="serif text-[34px] leading-tight">
        Review before you place the order
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Confirm the recipient, payment, and personalization details.
      </p>
      <div className="mt-6 space-y-3">
        <ReviewCard title="Shipping to" onEdit={() => onEdit("shipping")}>
          <p>{address.fullName}</p>
          <p>
            {address.addressLine1}
            {address.addressLine2 ? `, ${address.addressLine2}` : ""}
          </p>
          <p>
            {address.city}
            {address.region ? `, ${address.region}` : ""} {address.postalCode}
          </p>
          <p>
            {quote.delivery.name} · {quote.delivery.estimatedDays}
          </p>
        </ReviewCard>
        <ReviewCard
          title="Packaging & delivery"
          onEdit={() => onEdit("packaging")}
        >
          <p>
            {quote.packaging.name} ·{" "}
            {optionPrice(quote.packaging.priceCents, currency)}
          </p>
          <p>
            {quote.delivery.name} · {quote.delivery.estimatedDays}
          </p>
          <p>
            Estimated {quote.impact.co2SavedKg} kg CO₂e reduction · +
            {quote.packaging.ecoBonusPoints} EcoPoints
          </p>
        </ReviewCard>
        <ReviewCard title="Payment" onEdit={() => onEdit("payment")}>
          <p>{payment.label}</p>
          <p>{payment.detail}</p>
        </ReviewCard>
        <ReviewCard title="Gift details" onEdit={() => onEdit("impact")}>
          {quote.items.map((item) => (
            <p key={item.itemId}>
              {item.name}
              {item.customization ? " · Personalized" : ""} · Qty{" "}
              {item.quantity}
            </p>
          ))}
          {quote.ecoContribution ? (
            <p>
              {quote.ecoContribution.cause} contribution · +
              {quote.ecoContribution.rewardPointsEarned} EcoPoints
            </p>
          ) : null}
          {quote.rewardDiscount ? (
            <p>Reward {quote.rewardDiscount.code} applied</p>
          ) : null}
        </ReviewCard>
      </div>
      <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-5 text-[var(--muted)]">
        <input
          checked={confirmed}
          onChange={(event) => onConfirmed(event.target.checked)}
          className="mt-0.5 size-5 accent-[var(--brand)]"
          type="checkbox"
        />
        I confirm the personalization details are correct and understand
        personalized items enter production immediately.
      </label>
      {error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending || !confirmed}
        className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CheckCircle2 size={17} />
        {pending
          ? "Placing order…"
          : `Place order · ${formatMoney(quote.totalCents, currency)}`}
      </button>
      <p className="mt-3 text-xs text-[var(--muted)]">
        A confirmation email will be sent after the order is placed.
      </p>
    </section>
  );
}

function ReviewCard({
  children,
  onEdit,
  title,
}: {
  children: React.ReactNode;
  onEdit: () => void;
  title: string;
}) {
  return (
    <article className="rounded-[14px] border border-[var(--line)] bg-[var(--page)] p-[18px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <button
          onClick={onEdit}
          type="button"
          className="-my-3 inline-flex size-11 items-center justify-end text-[13px] font-semibold text-[var(--brand)]"
        >
          Edit
        </button>
      </div>
      <div className="mt-2 space-y-1 text-[13px] leading-[15px] text-[var(--muted)]">
        {children}
      </div>
    </article>
  );
}

function optionPrice(cents: number, currency: string) {
  return cents === 0 ? "Included" : formatMoney(cents, currency);
}
