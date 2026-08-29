"use client";

import { ArrowRight, Check } from "lucide-react";
import { useAddCartItem } from "@/hooks/use-cart";

type Props = {
  productId: string;
  productName: string;
  disabled: boolean;
};

export function ProductCardCartButton({
  productId,
  productName,
  disabled,
}: Props) {
  const add = useAddCartItem();
  const unavailable = disabled || add.isPending || add.isSuccess;
  const label = disabled
    ? "Out of stock"
    : add.isPending
      ? "Adding..."
      : add.isSuccess
        ? "Added"
        : "Add to Cart";

  return (
    <span>
      <button
        type="button"
        disabled={unavailable}
        onClick={() => add.mutate({ productId, quantity: 1 })}
        className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={
          add.isSuccess
            ? `${productName} added to bag`
            : `Add ${productName} to bag`
        }
        title={add.error?.message}
      >
        {label}
        {add.isSuccess ? (
          <Check aria-hidden="true" size={14} />
        ) : (
          !disabled && <ArrowRight aria-hidden="true" size={14} />
        )}
      </button>
      {add.error && (
        <span className="sr-only" role="alert">
          {add.error.message}
        </span>
      )}
    </span>
  );
}
