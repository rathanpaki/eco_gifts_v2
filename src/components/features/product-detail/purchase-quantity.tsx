import { Minus, Plus } from "lucide-react";

export function PurchaseQuantity({
  maximum,
  onChange,
  quantity,
}: {
  maximum: number;
  onChange: (value: number) => void;
  quantity: number;
}) {
  return (
    <div className="flex h-11 w-full items-center justify-between rounded-xl border border-[var(--line)] px-3.5 sm:w-auto sm:gap-4">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity === 1}
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="grid size-10 place-items-center disabled:opacity-40"
      >
        <Minus aria-hidden="true" size={17} />
      </button>
      <span className="min-w-3 text-center text-sm font-semibold">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= maximum}
        onClick={() => onChange(Math.min(maximum, quantity + 1))}
        className="grid size-10 place-items-center disabled:opacity-40"
      >
        <Plus aria-hidden="true" size={17} />
      </button>
    </div>
  );
}
