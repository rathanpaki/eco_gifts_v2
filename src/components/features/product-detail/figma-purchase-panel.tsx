"use client";

import { Check, Circle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CustomizerModal } from "@/components/features/customizer/figma-customizer";
import { useAddCartItem, useCartQuery, useRemoveCartItem, useUpdateCartItem } from "@/hooks/use-cart";
import { useCustomization } from "@/hooks/use-customization";
import type { SavedCustomization } from "@/types/customizer.types";
import { PersonalizeAction } from "./personalize-action";
import { PurchaseQuantity } from "./purchase-quantity";

interface PurchasePanelProps {
  currency: string;
  imageUrl?: string;
  priceCents: number;
  productId: string;
  productName: string;
  productSlug: string;
  personalizationAvailable: boolean;
  signedIn: boolean;
  inStock: boolean;
  lowStock: boolean;
  stockQuantity: number;
  initialCartItemId?: string;
  initialCustomizationId?: string;
}

const scents = ["Cedar & fig", "Lavender", "Unscented"];
const reassurance = ["Circular materials", "30-day returns", "Secure checkout"];

export function PurchasePanel(props: PurchasePanelProps) {
  const add = useAddCartItem();
  const remove = useRemoveCartItem();
  const update = useUpdateCartItem();
  const cart = useCartQuery();
  const existing = useCustomization(props.initialCustomizationId);
  const [quantityOverride, setQuantity] = useState<number>();
  const [scent, setScent] = useState(scents[0]);
  const [customizing, setCustomizing] = useState(false);
  const [customization, setCustomization] = useState<SavedCustomization | null>(
    null,
  );
  const savedCustomization = customization ?? existing.data ?? null;
  const quantity = quantityOverride ?? cart.data?.items.find(
    (entry) => entry.itemId === props.initialCartItemId,
  )?.quantity ?? 1;
  const soldOut = !props.inStock || props.stockQuantity < 1;
  const price = money(props.priceCents * quantity, props.currency);

  return (
    <aside className="flex flex-col gap-3" aria-label="Purchase options">
      {!soldOut && (
        <div>
          <p className="mb-2 text-[13px] font-semibold">Choose a scent</p>
          <div className="flex flex-wrap gap-2.5">
            {scents.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={scent === option}
                onClick={() => setScent(option)}
                className={`min-h-10 rounded-xl border px-3.5 text-[13px] font-medium ${
                  scent === option
                    ? "border-[var(--brand)] bg-[#eef4ee] text-[var(--brand)]"
                    : "border-[var(--line)] bg-[var(--page)]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {!soldOut && props.personalizationAvailable && (
        <PersonalizeAction
          productSlug={props.productSlug}
          saved={Boolean(savedCustomization || props.initialCustomizationId)}
          signedIn={props.signedIn}
          onOpen={() => { if (!existing.isFetching) setCustomizing(true); }}
        />
      )}

      {soldOut ? (
        <div className="rounded-[14px] border border-[var(--line)] bg-[var(--subtle)] p-4">
          <p className="text-[13px] font-semibold">Out of stock</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            This gift is not currently available to order.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]">
          <PurchaseQuantity
            maximum={props.stockQuantity}
            onChange={setQuantity}
            quantity={quantity}
          />
          <button
            type="button"
            disabled={add.isPending || remove.isPending || update.isPending || existing.isFetching}
            onClick={() => void addToBag()}
            className="flex h-11 flex-1 items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {add.isPending || remove.isPending || update.isPending
              ? "Updating bag..."
              : `${props.initialCartItemId ? "Update bag" : "Add to bag"} · ${price}`}
          </button>
        </div>
      )}

      {(add.isSuccess || update.isSuccess) && (
        <Link
          href="/cart"
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--brand)] text-sm font-semibold text-[var(--brand)]"
        >
          <Check aria-hidden="true" size={17} /> Added to bag · View bag
        </Link>
      )}
      {(add.error || remove.error || update.error || existing.error) && (
        <p className="text-xs text-red-700" role="alert">
          {(add.error ?? remove.error ?? update.error ?? existing.error)?.message}
        </p>
      )}

      {!soldOut && (
        <>
          <div className="rounded-[14px] border border-[var(--line)] bg-[var(--subtle)] p-4">
            <p className="text-[13px] font-semibold">
              Delivery by Friday, 14 August
            </p>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Carbon-neutral shipping · Free over $50
            </p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {reassurance.map((label) => (
              <div
                key={label}
                className="flex h-[42px] items-center gap-2 rounded-xl border border-[#b5c9b6] bg-[#eef4ee] px-3 text-xs font-medium text-[var(--brand)]"
              >
                <Circle aria-hidden="true" fill="currentColor" size={8} />
                {label}
              </div>
            ))}
          </div>
        </>
      )}

      {customizing && (
        <CustomizerModal
          imageUrl={props.imageUrl}
          initial={savedCustomization}
          productId={props.productId}
          productName={props.productName}
          onClose={() => setCustomizing(false)}
          onApply={(saved) => {
            setCustomization(saved);
            setCustomizing(false);
            add.reset();
            update.reset();
          }}
        />
      )}
    </aside>
  );

  async function addToBag() {
    if (
      props.initialCartItemId &&
      props.initialCustomizationId === savedCustomization?.id
    ) {
      await update.mutateAsync({
        itemId: props.initialCartItemId,
        quantity,
      });
      return;
    }
    await add.mutateAsync({
      productId: props.productId,
      quantity,
      customizationId: savedCustomization?.id,
    });
    if (
      props.initialCartItemId &&
      props.initialCartItemId !== savedCustomization?.id
    ) await remove.mutateAsync(props.initialCartItemId);
  }
}

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
