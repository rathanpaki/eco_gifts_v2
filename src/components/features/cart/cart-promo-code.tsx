"use client";

import { useState } from "react";
import { getCheckoutQuote } from "@/services/checkout.service";
import type { PromotionDiscount } from "@/types/promotions";

export interface AppliedPromo { code: string; discount: PromotionDiscount }
export function CartPromoCode(props: { applied?: AppliedPromo; onApplied: (value?: AppliedPromo) => void }) {
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  async function apply() {
    const normalized = code.trim().toUpperCase();
    if (!/^[A-Z0-9_-]{3,24}$/.test(normalized)) { setError("Enter a valid promotion code."); return; }
    setPending(true); setError(undefined);
    try {
      const quote = await getCheckoutQuote({ promoCode: normalized });
      if (!quote.promotionDiscount) throw new Error("This promotion cannot be applied.");
      props.onApplied({ code: normalized, discount: quote.promotionDiscount });
      setCode(normalized);
    } catch (reason) {
      props.onApplied(undefined);
      setError(reason instanceof Error ? reason.message : "The promotion could not be applied.");
    } finally { setPending(false); }
  }
  if (props.applied) return <div className="mt-[18px] rounded-[14px] border border-[var(--brand)] bg-[#eef4ee] p-3 text-xs"><div className="flex items-center justify-between gap-3"><span><strong>{props.applied.code}</strong> applied</span><button type="button" onClick={() => { props.onApplied(undefined); setCode(""); }} className="font-semibold text-[var(--brand)]">Remove</button></div></div>;
  return (
    <div className="mt-[18px]">
      <div className="flex h-11 items-center rounded-[14px] border border-[#c8c4ba] bg-[var(--page)] pl-3">
        <input aria-label="Promo code" value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void apply(); } }} maxLength={24} placeholder="Add a promo code" className="min-w-0 flex-1 bg-transparent text-[13px] outline-none" />
        <button type="button" disabled={pending} onClick={() => void apply()} className="mr-1.5 h-8 rounded-[10px] bg-[#eef4ee] px-[17px] text-xs font-semibold text-[var(--brand)] disabled:opacity-50">{pending ? "Checking..." : "Apply"}</button>
      </div>
      {error ? <p className="mt-2 text-xs leading-5 text-red-700" role="alert">{error}</p> : null}
    </div>
  );
}