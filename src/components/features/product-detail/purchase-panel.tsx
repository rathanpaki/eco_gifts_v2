type PurchasePanelProps = {
  inStock: boolean;
  lowStock: boolean;
  stockQuantity: number;
};

export function PurchasePanel({
  inStock,
  lowStock,
  stockQuantity,
}: PurchasePanelProps) {
  const soldOut = !inStock || stockQuantity < 1;
  const stockLabel = soldOut
    ? "Out of stock"
    : lowStock
      ? `Only ${stockQuantity} left in stock`
      : `${stockQuantity} available`;

  return (
    <aside
      className="rounded-[14px] bg-[var(--subtle)] p-4"
      aria-label="Live inventory status"
    >
      <p className="text-[13px] font-semibold">{stockLabel}</p>
      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
        {soldOut
          ? "This gift is not currently available to order."
          : "Inventory is updated from the EcoGifts product catalogue."}
      </p>
    </aside>
  );
}
