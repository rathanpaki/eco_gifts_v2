"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { CheckoutQuote } from "@/types/checkout";
import type { PaymentPresentation } from "./payment-method-panel";

export function CheckoutSummary({
  payment,
  quote,
}: {
  payment: PaymentPresentation;
  quote: CheckoutQuote;
}) {
  return (
    <aside
      className="rounded-[20px] bg-[var(--subtle)] p-7"
      aria-label="Order summary"
    >
      <h2 className="serif text-[26px]">Your order</h2>
      <div className="mt-5 max-h-56 space-y-4 overflow-y-auto pr-1">
        {quote.items.map((item) => (
          <div
            className="flex items-start justify-between gap-3 text-[13px]"
            key={item.itemId}
          >
            <div className="flex min-w-0 gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-[#e3e0d8]">
                {item.image ? (
                  <Image
                    alt={item.image.alt}
                    fill
                    sizes="40px"
                    src={item.image.url}
                    unoptimized={shouldBypassImageOptimization(item.image.url)}
                    className="object-cover"
                  />
                ) : null}
              </div>
              <p className="min-w-0 text-[var(--muted)]">
                {item.name}
                {item.customization ? " + personalization" : ""} · Qty{" "}
                {item.quantity}
              </p>
            </div>
            <p className="shrink-0 font-medium">
              {formatMoney(item.lineTotalCents, quote.currency)}
            </p>
          </div>
        ))}
      </div>
      <dl className="mt-5 space-y-3 text-[13px]">
        <SummaryRow
          label="Subtotal"
          value={formatMoney(quote.subtotalCents, quote.currency)}
        />
        {quote.personalizationCents > 0 ? (
          <SummaryRow
            label="Personalization"
            value={formatMoney(quote.personalizationCents, quote.currency)}
          />
        ) : null}
        <SummaryRow
          label={quote.packaging.name}
          value={
            quote.packaging.priceCents === 0
              ? "Included"
              : formatMoney(quote.packaging.priceCents, quote.currency)
          }
        />
        <SummaryRow
          label={quote.delivery.name}
          value={
            quote.delivery.priceCents === 0
              ? "Free"
              : formatMoney(quote.delivery.priceCents, quote.currency)
          }
        />
        {quote.ecoContribution ? (
          <SummaryRow
            label={quote.ecoContribution.cause}
            value={formatMoney(
              quote.ecoContribution.amountCents,
              quote.currency,
            )}
          />
        ) : null}
        {quote.rewardDiscount ? (
          <SummaryRow
            label={`Reward · ${quote.rewardDiscount.code}`}
            value={`−${formatMoney(quote.rewardDiscount.amountCents, quote.currency)}`}
          />
        ) : null}
      </dl>
      <div className="mt-5 border-t border-[var(--line)] pt-4">
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span className="text-xl">
            {formatMoney(quote.totalCents, quote.currency)}
          </span>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-[#eef4ee] p-3.5 text-xs">
        <p className="font-semibold text-[var(--brand)]">
          Estimated {quote.impact.co2SavedKg} kg CO₂e reduction
        </p>
        <p className="mt-1 text-[var(--muted)]">
          Packaging and carrier factors · Grade {quote.impact.grade}
        </p>
        {quote.ecoContribution ? (
          <p className="mt-1 font-semibold text-[var(--brand)]">
            +{quote.ecoContribution.rewardPointsEarned} EcoPoints from your
            contribution
          </p>
        ) : null}
      </div>
      <p className="mt-4 flex items-start gap-2 text-[11px] leading-4 text-[var(--muted)]">
        <ShieldCheck
          size={14}
          className="mt-0.5 shrink-0 text-[var(--brand)]"
        />
        {payment.detail}
      </p>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd className="shrink-0 font-medium">{value}</dd>
    </div>
  );
}
