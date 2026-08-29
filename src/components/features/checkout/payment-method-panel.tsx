"use client";

import { ArrowRight } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { SavedPaymentMethod } from "@/types/account-saved";
import type { PaymentMethod } from "@/types/checkout";

export type CheckoutPaymentChoice = "pay-on-delivery" | `card:${string}`;
export function getOrderPaymentMethod(choice: CheckoutPaymentChoice): PaymentMethod {
  return choice === "pay-on-delivery" ? "pay_on_delivery" : "demo_card";
}
export interface PaymentPresentation { label: string; detail: string; continueLabel: string }
export function getPaymentPresentation(choice: CheckoutPaymentChoice, card?: SavedPaymentMethod): PaymentPresentation {
  if (choice.startsWith("card:") && card) {
    const label = `${card.brand === "card" ? "Card" : title(card.brand)} •••• ${card.lastFour}`;
    return { label, detail: `${label} selected.`, continueLabel: `Continue with card •••• ${card.lastFour}` };
  }
  return { label: "Pay on delivery", detail: "Payment is collected when the order reaches the recipient.", continueLabel: "Continue with pay on delivery" };
}

export function PaymentMethodPanel(props: {
  cards: SavedPaymentMethod[];
  choice: CheckoutPaymentChoice;
  currency: string;
  selectedCard?: SavedPaymentMethod;
  onAddCard: () => void;
  onChange: (choice: CheckoutPaymentChoice) => void;
  onContinue: () => void;
  pending: boolean;
  totalCents: number;
}) {
  const presentation = getPaymentPresentation(props.choice, props.selectedCard);
  return (
    <section aria-labelledby="payment-method-title">
      <h2 id="payment-method-title" className="serif text-[34px] leading-tight">Choose a payment method</h2>
      <p className="mt-5 text-[13px] font-semibold text-[var(--muted)]">Payment method</p>
      <div className="mt-3 space-y-3" role="radiogroup" aria-label="Payment method">
        {props.cards.map((card) => <PaymentChoice key={card.id} checked={props.choice === `card:${card.id}`} detail={`Expires ${String(card.expiryMonth).padStart(2, "0")}/${String(card.expiryYear).slice(-2)}${card.primary ? " · Primary" : ""}`} label={`${card.brand === "card" ? "Card" : title(card.brand)} •••• ${card.lastFour}`} onSelect={() => props.onChange(`card:${card.id}`)} />)}
        <PaymentChoice checked={props.choice === "pay-on-delivery"} detail={`Pay ${formatMoney(props.totalCents, props.currency)} when the gift arrives.`} label="Pay on delivery" onSelect={() => props.onChange("pay-on-delivery")} />
      </div>
      <button type="button" onClick={props.onAddCard} className="mt-4 flex min-h-12 w-full items-center gap-3 rounded-xl border-[1.5px] border-[#b5c9b6] bg-[#f7eee7] px-4 text-left"><span className="flex-1 text-sm font-semibold">Add a new card</span><ArrowRight size={18} aria-hidden="true" /></button>
      <button type="button" onClick={props.onContinue} disabled={props.pending} className="mt-4 flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-wait disabled:opacity-60">{presentation.continueLabel}</button>
      <div className="mt-4 rounded-xl bg-[var(--subtle)] px-4 py-3 text-xs leading-5 text-[var(--muted)]"><p className="font-semibold text-[var(--ink)]">Your payment details stay private</p><p className="mt-1">EcoGifts never stores your full card number or security code.</p></div>
    </section>
  );
}
function PaymentChoice(props: { checked: boolean; detail: string; label: string; onSelect: () => void }) {
  return <button type="button" role="radio" aria-checked={props.checked} onClick={props.onSelect} className={`flex w-full items-start gap-3 rounded-[14px] border p-4 text-left transition-colors ${props.checked ? "border-[var(--brand)] bg-[#eef4ee]" : "border-[var(--line)] bg-[var(--page)] hover:border-[#b5c9b6]"}`}><span className={`mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full border ${props.checked ? "border-[var(--brand)]" : "border-[#b9beb8]"}`} aria-hidden="true">{props.checked ? <span className="size-2 rounded-full bg-[var(--brand)]" /> : null}</span><span><span className="block text-sm font-semibold">{props.label}</span><span className="mt-1 block text-xs text-[var(--muted)]">{props.detail}</span></span></button>;
}
function title(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }