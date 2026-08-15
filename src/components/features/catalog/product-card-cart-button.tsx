"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useAddCartItem } from "@/hooks/use-cart";

type Props = {
  productId: string;
  productName: string;
  disabled: boolean;
};

export function ProductCardCartButton({ productId, productName, disabled }: Props) {
  const add = useAddCartItem();
  const unavailable = disabled || add.isPending || add.isSuccess;
  return (
    <span className="relative">
      <button
        type="button"
        disabled={unavailable}
        onClick={() => add.mutate({ productId, quantity: 1 })}
        className="grid size-10 place-items-center rounded-xl border border-[var(--line)] bg-white text-[var(--brand)] transition-colors hover:bg-[#eef4ee] disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={add.isSuccess ? `${productName} added to bag` : `Add ${productName} to bag`}
        title={add.error?.message}
      >
        {add.isSuccess ? <Check aria-hidden="true" size={16} /> : <ShoppingBag aria-hidden="true" size={16} />}
      </button>
      {add.error && <span className="sr-only" role="alert">{add.error.message}</span>}
    </span>
  );
}
