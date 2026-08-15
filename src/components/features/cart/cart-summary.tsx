import Link from "next/link";
import { formatMoney } from "@/lib/format-money";
import type { Cart } from "@/types/cart";

export function CartSummary({ cart }: { cart: Cart }) {
  const subtotal = cart.currency
    ? formatMoney(cart.subtotalCents, cart.currency)
    : "Unavailable";
  return (
    <aside className="rounded-[20px] bg-[var(--subtle)] p-6 lg:sticky lg:top-24 lg:p-7" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title" className="serif text-[26px]">Order summary</h2>
      <dl className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">Subtotal</dt><dd className="font-semibold">{subtotal}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">Delivery</dt><dd>Calculated at checkout</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">Taxes</dt><dd>Calculated at checkout</dd></div>
      </dl>
      <div className="my-5 h-px bg-[var(--line)]" />
      <div className="flex items-end justify-between gap-4 font-semibold">
        <span>Current total</span><strong className="text-xl">{subtotal}</strong>
      </div>
      {!cart.readyForCheckout && (
        <p className="mt-4 rounded-xl bg-white p-3 text-xs leading-5 text-red-700">
          Remove unavailable products or reduce quantities before checkout.
        </p>
      )}
      {cart.readyForCheckout ? (
        <Link href="/checkout" className="mt-5 flex min-h-11 items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)]">Proceed to checkout</Link>
      ) : null}
      <Link href="/shop" className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] px-5 text-sm font-semibold hover:bg-white">Continue shopping</Link>
      <p className="mt-3 text-xs leading-5 text-[var(--muted)]">Your prices and stock are revalidated from the live catalog.</p>
    </aside>
  );
}
