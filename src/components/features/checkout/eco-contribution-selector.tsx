"use client";

import { HandHeart, Leaf, Sprout, Trees } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { ContributionCause } from "@/types/contribution.types";
import type { EcoContributionSummary } from "@/types/checkout";

const causes: Array<{
  cause: ContributionCause;
  description: string;
  icon: typeof Trees;
}> = [
  { cause: "Tree Planting", description: "Fund a verified native tree.", icon: Trees },
  { cause: "Carbon Offset", description: "Support certified climate action.", icon: Leaf },
  { cause: "Wildlife Conservation", description: "Protect vulnerable habitats.", icon: Sprout },
];
const amounts = [300, 500, 1000];

interface EcoContributionSelectorProps {
  currency: string;
  value: Pick<EcoContributionSummary, "cause" | "amountCents"> | null;
  onChange: (value: Pick<EcoContributionSummary, "cause" | "amountCents"> | null) => void;
}

export function EcoContributionSelector({
  currency,
  value,
  onChange,
}: EcoContributionSelectorProps) {
  const chooseCause = (cause: ContributionCause) =>
    onChange({ cause, amountCents: value?.amountCents ?? 500 });

  return (
    <section
      className="glass-panel rounded-2xl p-6"
      aria-labelledby="contribution-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
            Optional impact
          </p>
          <h2 id="contribution-title" className="mt-1 text-lg font-bold">
            Add an eco-contribution
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Choose a cause and earn 1 EcoPoint for every $0.10 contributed.
          </p>
        </div>
        <HandHeart className="size-6 text-[var(--brand)]" aria-hidden="true" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {causes.map(({ cause, description, icon: Icon }) => {
          const selected = value?.cause === cause;
          return (
            <button
              type="button"
              key={cause}
              aria-pressed={selected}
              onClick={() => chooseCause(cause)}
              className={`interactive-card glass-soft min-h-28 rounded-xl p-4 text-left ${selected ? "ring-2 ring-[var(--brand)]" : "hover:ring-1 hover:ring-[var(--brand)]"}`}
            >
              <Icon className="size-5 text-[var(--brand)]" aria-hidden="true" />
              <span className="mt-3 block text-sm font-semibold">{cause}</span>
              <span className="mt-1 block text-xs leading-5 text-[var(--muted)]">
                {description}
              </span>
            </button>
          );
        })}
      </div>

      {value ? (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold">Contribution</span>
          {amounts.map((amount) => (
            <button
              type="button"
              key={amount}
              aria-pressed={value.amountCents === amount}
              onClick={() => onChange({ ...value, amountCents: amount })}
              className={`min-h-11 rounded-lg border px-4 text-sm font-semibold ${value.amountCents === amount ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--line)] hover:bg-[var(--subtle)]"}`}
            >
              {formatMoney(amount, currency)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="min-h-11 px-2 text-sm font-semibold text-[var(--muted)] underline"
          >
            Remove
          </button>
        </div>
      ) : (
        <p className="mt-4 text-xs text-[var(--muted)]">
          No contribution will be added unless you choose a cause.
        </p>
      )}
    </section>
  );
}
