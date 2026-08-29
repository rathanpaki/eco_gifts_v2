import { Check, Truck } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { Cart } from "@/types/cart";

const FREE_DELIVERY_CENTS = 5000;

export function CartDeliveryProgress({ cart }: { cart: Cart }) {
  const unlocked = cart.totalCents >= FREE_DELIVERY_CENTS;
  const progress = Math.min(100, (cart.totalCents / FREE_DELIVERY_CENTS) * 100);
  const remaining = Math.max(0, FREE_DELIVERY_CENTS - cart.totalCents);
  const currency = cart.currency ?? "USD";

  return (
    <section className="flex min-h-16 flex-col gap-4 rounded-[14px] border border-[#b5c9b6] bg-[#eef4ee] px-[18px] py-[15px] md:flex-row md:items-center">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-white">
        {unlocked ? <Check size={16} /> : <Truck size={16} />}
      </span>
      <div className="min-w-0 md:w-[390px]">
        <p className="text-[13px] font-semibold text-[var(--brand)]">
          {unlocked
            ? "Free carbon-neutral delivery unlocked"
            : `${formatMoney(remaining, currency)} from free delivery`}
        </p>
        <p className="mt-0.5 text-xs text-[#6f766f]">
          {unlocked
            ? "Your order is above $50. Delivery is on us."
            : "Add another thoughtful gift to reach $50."}
        </p>
      </div>
      <div className="flex flex-1 items-center gap-[14px]">
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-white">
          <span
            className="block h-full rounded-full bg-[var(--brand)]"
            style={{ width: `${progress}%` }}
          />
        </span>
        <span className="w-[72px] text-xs font-semibold text-[var(--brand)]">
          {formatMoney(cart.totalCents, currency)} / $50
        </span>
      </div>
    </section>
  );
}
