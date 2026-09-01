"use client";

import Link from "next/link";
import { useState } from "react";
import { formatMoney } from "@/lib/format-money";
import type { Cart } from "@/types/cart";
import { CartPromoCode, type AppliedPromo } from "./cart-promo-code";

export function CartSummary({ cart }: { cart: Cart }) {
  const [promo, setPromo] = useState<AppliedPromo>();
  const currency = cart.currency ?? "USD";
  const freeDelivery = cart.totalCents >= 5000 || promo?.discount.discountType === "free_delivery";
  const discountCents = promo?.discount.amountCents ?? 0;
  const totalCents = Math.max(0, cart.totalCents - discountCents);
  const checkoutHref = promo ? `/checkout?promoCode=${encodeURIComponent(promo.code)}` : "/checkout";
  return (
    <aside className="glass-panel min-h-0 rounded-[20px] p-5 lg:sticky lg:top-24 lg:min-h-[520px] lg:p-7" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title" className="serif hidden text-[26px] leading-9 lg:block">Order summary</h2>
      {freeDelivery ? <div className="mt-[18px] flex h-12 items-center gap-[10px] rounded-xl bg-[#eef4ee] px-3 text-xs font-semibold text-[var(--brand)]"><span className="size-2 rounded-full bg-[var(--brand)]" />Free delivery applied</div> : null}
      <dl className="mt-[18px] space-y-[18px] text-sm">
        <Row label="Subtotal" value={formatMoney(cart.subtotalCents, currency)} />
        {cart.personalizationCents > 0 ? <Row label="Personalization" value={formatMoney(cart.personalizationCents, currency)} /> : null}
        <Row label="Delivery" value={freeDelivery ? "Free" : "Calculated next"} />
        {promo ? <Row label={`Promotion · ${promo.code}`} value={promo.discount.discountType === "free_delivery" ? "Applied" : `−${formatMoney(discountCents, currency)}`} /> : null}
      </dl>
      <div className="my-[18px] h-px bg-[var(--line)]" />
      <div className="flex items-center justify-between gap-4 font-semibold"><span>Total</span><strong className="text-xl">{formatMoney(totalCents, currency)}</strong></div>
      {!cart.readyForCheckout ? <p className="mt-4 rounded-xl bg-white p-3 text-xs leading-5 text-red-700">Remove unavailable products or reduce quantities before checkout.</p> : <Link href={checkoutHref} className="premium-action mt-[18px] flex h-11 items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white">Continue to checkout</Link>}
      <p className="mt-[18px] text-xs leading-[15px] text-[#8a918a]">Secure checkout · Taxes calculated next</p>
      <CartPromoCode applied={promo} onApplied={setPromo} />
    </aside>
  );
}
function Row({ label, value }: { label: string; value: string }) { return <div className="flex justify-between gap-4"><dt className="text-[#8a918a]">{label}</dt><dd>{value}</dd></div>; }
