"use client";

import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CustomizerModal } from "@/components/features/customizer/customizer-modal";
import { useAddCartItem } from "@/hooks/use-cart";
import type { SavedCustomization } from "@/types/customizer.types";
import { PersonalizationOption } from "./personalization-option";

interface PurchasePanelProps {
  productId: string;
  productName: string;
  productSlug: string;
  personalizationAvailable: boolean;
  signedIn: boolean;
  inStock: boolean;
  lowStock: boolean;
  stockQuantity: number;
}

export function PurchasePanel({
  productId,
  productName,
  productSlug,
  personalizationAvailable,
  signedIn,
  inStock,
  lowStock,
  stockQuantity,
}: PurchasePanelProps) {
  const add = useAddCartItem();
  const [customizing, setCustomizing] = useState(false);
  const [customization, setCustomization] = useState<SavedCustomization | null>(
    null,
  );
  const soldOut = !inStock || stockQuantity < 1;
  const stockLabel = soldOut
    ? "Out of stock"
    : lowStock
      ? `Only ${stockQuantity} left in stock`
      : `${stockQuantity} available`;

  return (
    <aside
      className="flex flex-col gap-3 rounded-[14px] bg-[var(--subtle)] p-4"
      aria-label="Purchase options"
    >
      <div>
        <p className="text-[13px] font-semibold">{stockLabel}</p>
        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
          {soldOut
            ? "This gift is not currently available to order."
            : "Inventory is updated from the EcoGifts product catalogue."}
        </p>
      </div>

      {!soldOut && personalizationAvailable && (
        <PersonalizationOption
          productSlug={productSlug}
          signedIn={signedIn}
          saved={customization}
          onPersonalize={() => setCustomizing(true)}
        />
      )}

      {!soldOut && !add.isSuccess && (
        <button
          type="button"
          disabled={add.isPending}
          onClick={() =>
            add.mutate({
              productId,
              quantity: 1,
              customizationId: customization?.id,
            })
          }
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60"
        >
          <ShoppingBag aria-hidden="true" size={17} />
          {add.isPending ? "Adding to bag..." : `Add ${productName} to bag`}
        </button>
      )}

      {add.isSuccess && (
        <Link
          href="/cart"
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white"
        >
          <Check aria-hidden="true" size={17} /> Added to bag · View bag
        </Link>
      )}
      {add.error && (
        <p className="text-xs text-red-700" role="alert">
          {add.error.message}
        </p>
      )}

      {customizing && (
        <CustomizerModal
          productId={productId}
          productName={productName}
          onClose={() => setCustomizing(false)}
          onApply={(saved) => {
            setCustomization(saved);
            setCustomizing(false);
            add.reset();
          }}
        />
      )}
    </aside>
  );
}
