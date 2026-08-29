"use client";

import { CartAddOn } from "./cart-add-on";
import { CartDeliveryProgress } from "./cart-delivery-progress";
import { CartImpact } from "./cart-impact";
import { CartItemCard } from "./cart-item-card";
import { CartSummary } from "./cart-summary";
import { CartSkeleton, CartUnavailable, EmptyCart } from "./cart-states";
import { useCartQuery } from "@/hooks/use-cart";
import type { PublicProduct } from "@/types/catalog";

export function CartPage({ suggestions }: { suggestions: PublicProduct[] }) {
  const cart = useCartQuery();
  if (cart.isLoading) return <CartSkeleton />;
  if (cart.isError || !cart.data) {
    return <CartUnavailable retry={() => void cart.refetch()} />;
  }
  if (!cart.data.items.length) return <EmptyCart />;

  const suggestion = suggestions.find(
    (product) =>
      product.inStock &&
      !cart.data.items.some((item) => item.productId === product.id),
  );
  const freeDelivery = cart.data.totalCents >= 5000;

  return (
    <main className="bg-[var(--page)] px-5 pb-14 pt-7 sm:px-8 sm:pt-11 lg:px-[72px]">
      <div className="mx-auto max-w-[1296px]">
        <header className="flex min-h-10 items-center justify-between gap-5 sm:min-h-[74px] sm:items-start">
          <div>
            <p className="eyebrow hidden sm:block">Your bag</p>
            <h1 className="serif text-[34px] leading-none sm:mt-[19px] sm:text-[clamp(36px,4vw,40px)] sm:leading-[55px]">
              <span className="sm:hidden">Your bag</span><span className="hidden sm:inline">{heading(cart.data.totalQuantity)}</span>
            </h1>
          </div>
          <p className="text-xs text-[var(--muted)] sm:pt-[29px] sm:text-[13px] sm:font-semibold sm:text-[var(--brand)]">
            <span className="sm:hidden">{cart.data.totalQuantity} {cart.data.totalQuantity === 1 ? "item" : "items"}</span><span className="hidden sm:inline">{freeDelivery ? "Free delivery unlocked" : "Free delivery at $50"}</span>
          </p>
        </header>

        <div className="mt-5 sm:mt-6">
          <CartDeliveryProgress cart={cart.data} />
        </div>
        <div className="mt-4 grid items-start gap-7 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-10">
          <section aria-label="Cart items" className="min-w-0 space-y-4">
            {cart.data.items.map((item) => (
              <CartItemCard item={item} key={item.itemId} />
            ))}
            {suggestion ? <CartAddOn product={suggestion} /> : null}
            <CartImpact cart={cart.data} />
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
