"use client";

import { formatMoney } from "@/lib/format-money";
import type { DeliveryOption } from "@/types/checkout";

interface GreenLogisticsSelectorProps {
  selectedId: string;
  onSelect: (option: DeliveryOption) => void;
  options: DeliveryOption[];
  currency: string;
}

export function GreenLogisticsSelector({
  selectedId,
  onSelect,
  options,
  currency,
}: GreenLogisticsSelectorProps) {
  return (
    <section aria-labelledby="delivery-title">
      <h3 id="delivery-title" className="text-sm font-semibold">
        Delivery speed
      </h3>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Compare arrival date, price, and estimated transport impact.
      </p>
      <div
        className="mt-3 grid gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Delivery speed"
      >
        {options
          .filter((option) => option.id !== "green-logistics")
          .map((option) => (
            <DeliveryChoice
              key={option.id}
              currency={currency}
              option={option}
              selected={option.id === selectedId}
              onSelect={() => onSelect(option)}
            />
          ))}
      </div>
    </section>
  );
}

function DeliveryChoice({
  currency,
  onSelect,
  option,
  selected,
}: {
  currency: string;
  onSelect: () => void;
  option: DeliveryOption;
  selected: boolean;
}) {
  const price =
    option.priceCents === 0
      ? "Included"
      : `+${formatMoney(option.priceCents, currency)}`;
  const impact =
    option.id === "express"
      ? "Faster, with higher transport impact"
      : "Lowest estimated transport impact";
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`h-[108px] rounded-2xl border p-3.5 text-left transition-colors ${selected ? "border-[1.5px] border-[var(--brand)] bg-[#eef4ee]" : "border-[#8a918a] bg-[var(--page)] hover:border-[var(--brand)]"}`}
    >
      <span className="flex h-full items-start gap-3">
        <span
          className={`grid size-5 shrink-0 place-items-center rounded-full border ${selected ? "border-[var(--brand)]" : "border-[#8a918a]"}`}
          aria-hidden="true"
        >
          {selected ? (
            <span className="size-2 rounded-full bg-[var(--brand)]" />
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex justify-between gap-2 text-[13px] font-semibold">
            <span>{option.name}</span>
            <span className="shrink-0">{price}</span>
          </span>
          <span className="mt-1 block text-xs leading-[18px] text-[var(--muted)]">
            {option.estimatedDays}
          </span>
          <span
            className={`mt-1 block text-[11px] leading-4 ${option.id === "standard" ? "text-[var(--brand)]" : "text-[var(--muted)]"}`}
          >
            {impact}
          </span>
        </span>
      </span>
    </button>
  );
}
