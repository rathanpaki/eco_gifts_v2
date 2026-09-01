"use client";

import { formatMoney } from "@/lib/format-money";
import type { CheckoutQuote } from "@/types/checkout";
import type { PaymentPresentation } from "./payment-method-panel";
import type { CheckoutStage } from "./checkout-progress";

interface CheckoutSummaryProps {
  payment: PaymentPresentation;
  quote: CheckoutQuote;
  stage: CheckoutStage;
}

export function CheckoutSummary({
  payment,
  quote,
  stage,
}: CheckoutSummaryProps) {
  const early = stage === "shipping";
  const showPackaging = stage !== "shipping";
  const showImpact = ["impact", "payment", "review"].includes(stage);
  const summaryTotal = early
    ? quote.subtotalCents + quote.personalizationCents
    : quote.totalCents;
  return (
    <aside
      className="glass-panel min-h-[500px] rounded-[20px] p-7"
      aria-label="Order summary"
    >
      <h2 className="serif text-[26px] leading-none">Your order</h2>
      <div className="mt-[22px] space-y-[18px]">
        {quote.items.map((item) => (
          <SummaryRow
            key={item.itemId}
            label={`${item.name}${item.customization ? " + personalization" : ""}`}
            value={formatMoney(item.lineTotalCents, quote.currency)}
          />
        ))}
        {quote.personalizationCents > 0 ? (
          <SummaryRow
            label="Personalization"
            value={formatMoney(quote.personalizationCents, quote.currency)}
          />
        ) : null}
        <SummaryRow
          label="Delivery"
          value={
            early
              ? "Calculated next"
              : optionPrice(quote.delivery.priceCents, quote.currency)
          }
        />
        {showPackaging ? (
          <SummaryRow
            label="Packaging"
            value={optionPrice(quote.packaging.priceCents, quote.currency)}
          />
        ) : null}
        {showImpact && quote.ecoContribution ? (
          <SummaryRow
            label={quote.ecoContribution.cause}
            value={formatMoney(
              quote.ecoContribution.amountCents,
              quote.currency,
            )}
          />
        ) : null}
        {quote.promotionDiscount ? (
          <SummaryRow
            label={`Promotion · ${quote.promotionDiscount.code}`}
            value={`−${formatMoney(quote.promotionDiscount.amountCents, quote.currency)}`}
          />
        ) : null}
        {showImpact && quote.rewardDiscount ? (
          <SummaryRow
            label={`Reward · ${quote.rewardDiscount.code}`}
            value={`−${formatMoney(quote.rewardDiscount.amountCents, quote.currency)}`}
          />
        ) : null}
      </div>
      <div className="mt-[18px] border-t border-[var(--line)] pt-[18px]">
        <div className="flex items-start justify-between gap-4 font-semibold">
          <span className="text-base">{early ? "Subtotal" : "Total"}</span>
          <span className="text-xl">
            {formatMoney(summaryTotal, quote.currency)}
          </span>
        </div>
      </div>
      <SummaryNotice payment={payment} quote={quote} stage={stage} />
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-[13px]">
      <span className="min-w-0 text-[var(--muted)]">{label}</span>
      <span className="shrink-0 font-medium">{value}</span>
    </div>
  );
}

function SummaryNotice({ payment, quote, stage }: CheckoutSummaryProps) {
  let title = "Packaging and delivery are next";
  let copy = "Compare price, timing, and estimated impact.";
  if (stage === "packaging") {
    title = `Estimated ${quote.impact.co2SavedKg} kg CO₂e reduction`;
    copy = `Packaging and carrier factors · Grade ${quote.impact.grade}`;
  } else if (stage === "impact") {
    title = "Your impact choices are optional";
    copy = "Your total updates only when you add a cause or reward.";
  } else if (stage === "payment" || stage === "review") {
    title =
      stage === "review"
        ? "Ready for final review"
        : "Payment details stay private";
    copy = payment.detail;
  }
  return (
    <div className="mt-[18px] rounded-xl bg-[#eef4ee] p-[14px]">
      <p className="text-[13px] font-semibold text-[var(--brand)]">{title}</p>
      <p className="mt-[6px] text-xs text-[var(--muted)]">{copy}</p>
    </div>
  );
}

function optionPrice(cents: number, currency: string) {
  return cents === 0 ? "Included" : formatMoney(cents, currency);
}
