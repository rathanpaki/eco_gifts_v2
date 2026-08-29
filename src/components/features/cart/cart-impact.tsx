import type { Cart } from "@/types/cart";

export function CartImpact({ cart }: { cart: Cart }) {
  const weighted = cart.items.reduce(
    (sum, item) => sum + item.ecoScore * item.quantity,
    0,
  );
  const score = cart.totalQuantity
    ? Math.round(weighted / cart.totalQuantity)
    : 0;
  return (
    <aside className="flex min-h-[53px] items-center justify-between gap-4 rounded-2xl bg-[#eef4ee] px-5">
      <p className="text-sm font-semibold text-[var(--brand)]">
        Average eco score {score}/100 across this order
      </p>
      <p className="text-xs text-[#8a918a]">Live impact estimate</p>
    </aside>
  );
}
