import type {
  AdminImpactItem,
  AdminImpactPage,
  AdminImpactTrendPoint,
} from "@/types/admin-impact";

const causes = [
  "Tree Planting",
  "Carbon Offset",
  "Wildlife Conservation",
] as const;

export function ImpactReportCharts({ data }: { data: AdminImpactPage }) {
  return (
    <div className="grid gap-[18px] xl:grid-cols-[minmax(0,720px)_366px]">
      <TrendChart data={data} />
      <CauseMix items={data.items} />
    </div>
  );
}

function TrendChart({ data }: { data: AdminImpactPage }) {
  const maximum = Math.max(
    1,
    ...data.trend.map((point) => point.contributionCount),
  );
  return (
    <section className="h-[318px] rounded-2xl border border-[#e3e0d8] bg-[#faf8f3] p-[18px]">
      <header className="flex h-[34px] items-center justify-between">
        <h2 className="serif text-xl">Monthly eco-contributions</h2>
        <strong className="text-[11px] text-[#3d5540]">
          Total · {data.metrics.total.toLocaleString()}
        </strong>
      </header>
      <div className="mt-[10px] flex h-[214px] items-end justify-between gap-2 pt-[10px]">
        {data.trend.length ? (
          data.trend.map((point) => (
            <TrendBar key={point.month} maximum={maximum} point={point} />
          ))
        ) : (
          <p className="m-auto text-xs text-[#8a918a]">
            No contributions in this reporting period.
          </p>
        )}
      </div>
    </section>
  );
}

function TrendBar({
  maximum,
  point,
}: {
  maximum: number;
  point: AdminImpactTrendPoint;
}) {
  const height = Math.max(8, (point.contributionCount / maximum) * 159);
  return (
    <div className="flex h-[204px] min-w-0 flex-1 flex-col items-center justify-end gap-[6px]">
      <span
        aria-label={`${point.label}: ${point.contributionCount}`}
        className="w-[38px] rounded-t-[7px] bg-[#3d5540]"
        style={{ height }}
      />
      <span className="text-[10px] font-medium text-[#8a918a]">
        {point.label}
      </span>
      <strong className="text-[9px] text-[#3d5540]">
        {point.contributionCount}
      </strong>
    </div>
  );
}

function CauseMix({ items }: { items: AdminImpactItem[] }) {
  const total = Math.max(1, items.length);
  return (
    <section className="h-[318px] rounded-2xl border border-[#e3e0d8] bg-[#faf8f3] p-[18px]">
      <h2 className="serif text-xl">Contribution cause mix</h2>
      <p className="mt-[14px] text-[10px] text-[#8a918a]">
        By recorded contribution · current period
      </p>
      <div className="mt-[14px] grid gap-[14px]">
        {causes.map((cause) => {
          const count = items.filter((item) => item.cause === cause).length;
          const percent = Math.round((count / total) * 100);
          return <MixRow key={cause} label={cause} percent={percent} />;
        })}
      </div>
    </section>
  );
}

function MixRow({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="grid gap-[6px]">
      <div className="flex text-[11px] text-[#616861]">
        <span className="flex-1">{label}</span>
        <strong className="text-[#3d5540]">{percent}%</strong>
      </div>
      <div className="h-2 overflow-hidden rounded bg-[#f2efe7]">
        <div
          className="h-full rounded bg-[#3d5540]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
