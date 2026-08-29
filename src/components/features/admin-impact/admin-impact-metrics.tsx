import { BadgeCheck, CircleDollarSign, Clock3, Trees } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type {
  AdminImpactMetrics,
  AdminImpactTrendPoint,
} from "@/types/admin-impact";

export function AdminImpactMetricsView({
  metrics,
  trend,
}: {
  metrics: AdminImpactMetrics;
  trend: AdminImpactTrendPoint[];
}) {
  const maximum = Math.max(1, ...trend.map((point) => point.amountCents));
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={CircleDollarSign}
          label="Total contributed"
          value={formatMoney(metrics.totalAmountCents, "USD")}
        />
        <Metric
          icon={Clock3}
          label="Pending review"
          value={String(metrics.pending)}
        />
        <Metric
          icon={BadgeCheck}
          label="Verified"
          value={String(metrics.verified)}
        />
        <Metric
          icon={Trees}
          label="Tree records"
          value={String(metrics.treeCount)}
        />
      </div>
      <section className="mt-5 rounded-2xl border border-[#d9d5ca] bg-white p-6">
        <h2 className="text-lg font-bold">Contribution trend</h2>
        <div className="mt-6 flex h-40 items-end gap-3">
          {trend.map((point) => (
            <div
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
              key={point.month}
            >
              <div
                className="w-full rounded-t-lg bg-[#6f8f72]"
                style={{
                  height: `${Math.max(6, (point.amountCents / maximum) * 120)}px`,
                }}
                title={formatMoney(point.amountCents, "USD")}
              />
              <span className="text-[11px] text-[#727970]">{point.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
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
    <article className="rounded-2xl border border-[#d9d5ca] bg-white p-5">
      <Icon className="size-5 text-[#3d5540]" />
      <p className="mt-5 text-2xl font-bold text-[#252a26]">{value}</p>
      <p className="mt-1 text-sm text-[#727970]">{label}</p>
    </article>
  );
}
