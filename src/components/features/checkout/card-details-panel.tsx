"use client";

import { useState, type KeyboardEvent } from "react";
import type { CardBrand } from "@/types/account-saved";

export interface NewCardDetails {
  cardholderName: string;
  brand: CardBrand;
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  save: boolean;
}
const EMPTY_CARD = { name: "", number: "", expiry: "", securityCode: "" };

export function CardDetailsPanel(props: { onBack: () => void; onUseCard: (card: NewCardDetails) => Promise<void> | void }) {
  const [card, setCard] = useState(EMPTY_CARD);
  const [save, setSave] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const update = (field: keyof typeof EMPTY_CARD, value: string) => setCard((current) => ({ ...current, [field]: value }));
  async function applyCard() {
    const digits = card.number.replace(/\D/g, "");
    const expiry = parseExpiry(card.expiry);
    if (card.name.trim().length < 2 || digits.length < 13 || !expiry || !/^\d{3,4}$/.test(card.securityCode)) {
      setError("Check the card details and try again.");
      return;
    }
    setPending(true);
    setError(undefined);
    try {
      await props.onUseCard({ cardholderName: card.name.trim(), brand: brandFor(digits), lastFour: digits.slice(-4), expiryMonth: expiry.month, expiryYear: expiry.year, save });
      setCard(EMPTY_CARD);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The card could not be selected.");
      setPending(false);
    }
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    event.stopPropagation();
    void applyCard();
  }
  return (
    <section aria-labelledby="card-details-title">
      <button type="button" onClick={props.onBack} className="relative h-[18px] text-[13px] font-semibold text-[var(--ink)] after:absolute after:-inset-y-3 after:inset-x-0">← Back to payment methods</button>
      <h2 id="card-details-title" className="serif mt-[18px] text-[34px] leading-none">Enter card details</h2>
      <p className="mt-2 text-[13px] font-semibold text-[var(--muted)]">Visa and Mastercard accepted</p>
      <div className="mt-6 space-y-[18px]" onKeyDown={handleKeyDown}>
        <Field label="Name on card" helper="Enter the name exactly as shown on the card" value={card.name} onChange={(value) => update("name", value)} autoComplete="cc-name" />
        <Field label="Card number" helper="Your full card number is never stored" value={card.number} onChange={(value) => update("number", formatNumber(value))} autoComplete="cc-number" inputMode="numeric" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Expiry" helper="MM / YY" value={card.expiry} onChange={(value) => update("expiry", formatExpiry(value))} autoComplete="cc-exp" inputMode="numeric" />
          <Field label="Security code" helper="3 digits on the back" value={card.securityCode} onChange={(value) => update("securityCode", value.replace(/\D/g, "").slice(0, 4))} autoComplete="cc-csc" inputMode="numeric" type="password" />
        </div>
        <label className="flex items-start gap-3 rounded-xl border border-[var(--line)] p-4 text-sm"><input type="checkbox" checked={save} onChange={(event) => setSave(event.target.checked)} className="mt-0.5 size-4 accent-[var(--brand)]" /><span><span className="block font-semibold">Save my card</span><span className="mt-1 block text-xs text-[var(--muted)]">Reuse this card on your next checkout.</span></span></label>
        {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
        <button type="button" onClick={() => void applyCard()} disabled={pending} className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white disabled:opacity-50">{pending ? "Saving..." : "Use this card and continue"}</button>
      </div>
      <div className="rounded-xl bg-[var(--subtle)] px-4 py-[14px]"><p className="text-[13px] font-semibold">Your payment details stay private</p><p className="mt-[6px] text-xs text-[var(--muted)]">Only card brand, last four digits, and expiry are retained when you choose to save.</p></div>
    </section>
  );
}
function Field(props: { autoComplete: string; helper: string; inputMode?: "numeric"; label: string; onChange: (value: string) => void; type?: "password" | "text"; value: string }) {
  return <label className="flex h-[120px] flex-col gap-2"><span className="text-[13px] font-semibold">{props.label}</span><input autoComplete={props.autoComplete} inputMode={props.inputMode} onChange={(event) => props.onChange(event.target.value)} type={props.type ?? "text"} value={props.value} className="h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-[15px] outline-none focus:border-[var(--brand)]" /><span className="block text-xs text-[var(--muted)]">{props.helper}</span></label>;
}
function formatNumber(value: string) { return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim(); }
function formatExpiry(value: string) { const digits = value.replace(/\D/g, "").slice(0, 4); return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits; }
function parseExpiry(value: string) {
  const match = value.match(/^(\d{2})\s?\/\s?(\d{2})$/); if (!match) return null;
  const month = Number(match[1]); const year = 2000 + Number(match[2]); const now = new Date();
  return month >= 1 && month <= 12 && (year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)) ? { month, year } : null;
}
function brandFor(number: string): CardBrand { return number.startsWith("4") ? "visa" : /^5[1-5]/.test(number) || /^2(2[2-9]|[3-6]\d|7[01])/.test(number) ? "mastercard" : "card"; }