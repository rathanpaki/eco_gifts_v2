"use client";

import { BadgeCheck, CircleDollarSign, Cloud, Trees } from "lucide-react";
import {
  useEcoImpactSummary,
  useRedeemRewardVoucher,
} from "@/hooks/use-eco-contributions";
import { formatMoney } from "@/lib/format-money";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { ContributionHistory } from "./contribution-history";
import { ImpactWallet } from "./impact-wallet";
import { TreeEvidenceList } from "./tree-evidence-list";

export function AccountImpactPage() {
  const impact = useEcoImpactSummary();
  const redeem = useRedeemRewardVoucher();
  if (impact.isLoading)
    return <LogoDrawLoader label="Loading your impact" />;
  if (impact.isError || !impact.data)
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-xl font-bold">Impact data is unavailable</h1>
        <p className="mt-2 text-sm text-red-700">{impact.error?.message}</p>
        <button
          className="mt-4 text-sm font-semibold text-[var(--brand)]"
          onClick={() => void impact.refetch()}
          type="button"
        >
          Try again
        </button>
      </section>
    );

  const total = impact.data.contributions.reduce(
    (sum, item) => sum + item.amountCents,
    0,
  );
  const verified = impact.data.contributions.filter(
    (item) => item.status === "verified",
  ).length;
  const co2 = impact.data.trees.reduce(
    (sum, tree) => sum + (tree.co2SequestrationKg ?? 0),
    0,
  );
  return (
    <section aria-labelledby="impact-title">
      <header className="rounded-[20px] bg-[#263b2d] p-5 text-white sm:rounded-3xl sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c8d9c8]">
          Your verified impact
        </p>
        <h1 className="serif mt-3 text-[32px] leading-[1.05] sm:text-5xl" id="impact-title">
          Thoughtful gifts, visible outcomes.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#dce7dc]">
          Track contributions, Tree IDs, verification evidence, and EcoPoints
          earned through your orders.
        </p>
      </header>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 xl:grid-cols-4">
        <Metric
          icon={CircleDollarSign}
          label="Contributed"
          value={formatMoney(total, "USD")}
        />
        <Metric
          icon={BadgeCheck}
          label="Verified records"
          value={String(verified)}
        />
        <Metric
          icon={Trees}
          label="Tree IDs"
          value={String(impact.data.trees.length)}
        />
        <Metric
          icon={Cloud}
          label="Verified CO₂"
          value={`${co2.toFixed(1)} kg`}
        />
      </div>
      <div className="mt-5 grid gap-5 sm:mt-7 sm:gap-7">
        <ImpactWallet
          error={redeem.error?.message}
          onRedeem={() => redeem.mutate()}
          pending={redeem.isPending}
          rewardPoints={impact.data.rewardPoints}
          vouchers={impact.data.vouchers}
        />
        <TreeEvidenceList trees={impact.data.trees} />
        <ContributionHistory contributions={impact.data.contributions} />
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Trees;
  label: string;
  value: string;
}) {
  return (
    <article className="glass-panel interactive-card min-w-0 rounded-2xl p-4 sm:p-5">
      <Icon className="size-5 text-[var(--brand)]" />
      <p className="mt-3 truncate text-xl font-bold sm:mt-5 sm:text-2xl">{value}</p>
      <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{label}</p>
    </article>
  );
}
