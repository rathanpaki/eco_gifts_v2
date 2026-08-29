"use client";

import { Box, Check, Gift, Sprout } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { PackagingOption } from "@/types/checkout";

export function PackagingSelectorV2({
  currency,
  onSelect,
  options,
  selectedId,
}: {
  currency: string;
  onSelect: (option: PackagingOption) => void;
  options: PackagingOption[];
  selectedId: string;
}) {
  const selected = options.find((option) => option.id === selectedId);
  return (
    <section aria-labelledby="packaging-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 id="packaging-title" className="text-sm font-semibold">
            Eco-friendly packaging
          </h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Choose the presentation that fits your gift and values.
          </p>
        </div>
        <span className="rounded-full border border-[var(--brand)] bg-[#eef4ee] px-3 py-1.5 text-[11px] font-semibold text-[var(--brand)]">
          +{selected?.ecoBonusPoints ?? 0} EcoPoints
        </span>
      </div>
      <div
        aria-label="Eco-friendly packaging"
        className="mt-3 grid gap-3 sm:grid-cols-3"
        role="radiogroup"
      >
        {options.map((option) => (
          <PackagingChoice
            currency={currency}
            key={option.id}
            onSelect={() => onSelect(option)}
            option={option}
            selected={option.id === selectedId}
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
  const price = option.priceCents
    ? `+${formatMoney(option.priceCents, currency)}`
    : "Included";
  return (
    <button
      aria-checked={selected}
      className={`flex h-44 flex-col rounded-2xl border p-3.5 text-left transition ${selected ? "border-[1.5px] border-[var(--brand)] bg-[#eef4ee]" : "border-[var(--muted)] bg-[var(--page)] hover:border-[var(--brand)]"}`}
      onClick={onSelect}
      role="radio"
      type="button"
    >
      <span className="flex w-full items-center justify-between" aria-hidden>
        <span
          className={`grid size-7 place-items-center rounded-lg ${selected ? "bg-[var(--brand)] text-white" : "bg-[var(--subtle)] text-[var(--brand)]"}`}
        >
          <PackagingGlyph id={option.id} />
        </span>
        <span
          className={`grid size-5 place-items-center rounded-full border ${selected ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--muted)]"}`}
        >
          {selected ? <Check size={12} /> : null}
        </span>
      </span>
      <span className="mt-4 text-sm font-semibold">{option.name}</span>
      <span className="mt-2 text-[11px] leading-4 text-[var(--muted)]">
        {option.description}
      </span>
      <span className="mt-auto flex w-full justify-between pt-3 text-[11px] font-semibold">
        <span>{price}</span>
        <span className="text-[var(--brand)]">
          {option.co2SavingsKg} kg CO₂e est.
        </span>
      </span>
    </button>
  );
}

function PackagingGlyph({ id }: { id: PackagingOption["id"] }) {
  if (id === "recycled-box") return <Box size={15} />;
  if (id === "seed-paper-wrap") return <Sprout size={15} />;
  return <Gift size={15} />;
}
