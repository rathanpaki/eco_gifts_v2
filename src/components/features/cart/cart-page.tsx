"use client";

import { CartItemCard } from "./cart-item-card";
import { CartSummary } from "./cart-summary";
import { CartSkeleton, CartUnavailable, EmptyCart } from "./cart-states";
import { useCartQuery } from "@/hooks/use-cart";

export function CartPage() {
  const cart = useCartQuery();
  if (cart.isLoading) return <CartSkeleton />;
  if (cart.isError || !cart.data) return <CartUnavailable retry={() => void cart.refetch()} />;
  if (!cart.data.items.length) return <EmptyCart />;

  return (
    <main className="bg-[var(--page)] px-5 pb-14 pt-11 sm:px-8 lg:px-[72px]">
      <div className="mx-auto max-w-[1296px]">
        <header className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="eyebrow">Your bag</p>
            <h1 className="serif mt-2 text-[clamp(36px,4vw,40px)] leading-tight">{heading(cart.data.totalQuantity)}</h1>
          </div>
          <p className="pt-1 text-xs font-semibold text-[var(--brand)]">Live prices and availability</p>
        </header>

        <div className="mt-7 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section aria-label="Cart items" className="min-w-0 space-y-4">
            {cart.data.items.map((item) => <CartItemCard item={item} key={item.itemId} />)}
            <div className="flex flex-wrap justify-between gap-3 rounded-2xl bg-[#eef4ee] px-5 py-[18px] text-sm text-[var(--brand)]">
              <strong>Every gift includes reviewed environmental evidence</strong>
              <span className="text-xs text-[var(--muted)]">Verified product data</span>
            </div>
          </section>
          <CartSummary cart={cart.data} />
        </div>
      </div>
    </main>
  );
}

function heading(quantity: number): string {
  if (quantity === 1) return "One gift, thoughtfully chosen";
  return `${quantity} gifts, thoughtfully chosen`;
}
