"use client";

import { formatMoney } from "@/lib/format-money";
import type { PackagingOption } from "@/types/checkout";

interface PackagingSelectorProps {
  selectedId: string;
  onSelect: (option: PackagingOption) => void;
  options: PackagingOption[];
  currency: string;
}

export function PackagingSelector({
  selectedId,
  onSelect,
  options,
  currency,
}: PackagingSelectorProps) {
  return (
    <section aria-labelledby="packaging-title">
      <h3 id="packaging-title" className="text-base font-semibold">
        Eco-friendly packaging
      </h3>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Choose the presentation that fits your gift and values.
      </p>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Eco-friendly packaging"
      >
        {options.map((option) => (
          <PackagingChoice
            key={option.id}
            option={option}
            currency={currency}
            selected={option.id === selectedId}
            onSelect={() => onSelect(option)}
          />
        ))}
      </div>
    </section>
  );
}

function PackagingChoice({
  currency,
  onSelect,
  option,
  selected,
}: {
  currency: string;
  onSelect: () => void;
  option: PackagingOption;
  selected: boolean;
}) {
  const price =
    option.priceCents === 0
      ? "Included"
      : `+${formatMoney(option.priceCents, currency)}`;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex min-h-44 flex-col rounded-2xl border p-3.5 text-left transition-colors ${selected ? "border-[1.5px] border-[var(--brand)] bg-[#eef4ee]" : "border-[var(--line)] bg-[var(--page)] hover:border-[#b5c9b6]"}`}
    >
      <span
        className={`grid size-[18px] place-items-center rounded-full border ${selected ? "border-[var(--brand)]" : "border-[#b9beb8]"}`}
        aria-hidden="true"
      >
        {selected ? (
          <span className="size-2 rounded-full bg-[var(--brand)]" />
        ) : null}
      </span>
      <span className="mt-3 text-sm font-semibold">{option.name}</span>
      <span className="mt-1 text-xs leading-5 text-[var(--muted)]">
        {option.description}
      </span>
      <span className="mt-auto flex w-full items-end justify-between pt-3 text-xs">
        <span className="font-semibold">{price}</span>
        <span className="text-[var(--brand)]">
          {option.co2SavingsKg} kg CO₂ saved
        </span>
      </span>
    </button>
  );
}
