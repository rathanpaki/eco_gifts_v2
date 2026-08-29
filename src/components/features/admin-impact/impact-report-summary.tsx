import { formatMoney } from "@/lib/format-money";
import type {
  AdminImpactPage,
  AdminImpactTrendPoint,
} from "@/types/admin-impact";
import { ImpactReportCharts } from "./impact-report-charts";

export function ImpactReportSummary({
  data,
  onReview,
}: {
  data: AdminImpactPage;
  onReview: () => void;
}) {
  const verifiedRate = data.metrics.total
    ? Math.round((data.metrics.verified / data.metrics.total) * 100)
    : 0;
  const cards = [
    [
      "Eco-contributions",
      data.metrics.total.toLocaleString(),
      "recorded customer contributions",
    ],
    [
      "Contribution value",
      formatMoney(data.metrics.totalAmountCents, "USD"),
      "reconciled to contribution records",
    ],
    [
      "Verified records",
      `${verifiedRate}%`,
      `${data.metrics.pending} pending review`,
    ],
    [
      "Tree records",
      data.metrics.treeCount.toLocaleString(),
      "partner evidence tracked",
    ],
  ];
  return (
    <>
      <aside className="flex h-[46px] items-center gap-[10px] rounded-[10px] bg-[#eef4ee] px-[14px] text-[11px] text-[#616861]">
        <strong className="text-[10px] text-[#3d5540]">Scope</strong>
        Recorded customer contributions · methodology v2.3
      </aside>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, note]) => (
          <article
            className="h-28 rounded-[14px] border border-[#e3e0d8] bg-[#faf8f3] px-[18px] py-4"
            key={label}
          >
            <p className="text-[10px] font-medium text-[#8a918a]">{label}</p>
            <p className="serif mt-[6px] text-[27px] leading-none">{value}</p>
            <p className="mt-[8px] text-[9px] text-[#616861]">{note}</p>
          </article>
        ))}
      </div>
      <ImpactReportCharts data={data} />
      <Verification
        pending={data.metrics.pending}
        verified={data.metrics.verified}
        onReview={onReview}
      />
    </>
  );
}

function Verification({
  onReview,
  pending,
  verified,
}: {
  onReview: () => void;
  pending: number;
  verified: number;
}) {
  return (
    <section className="grid min-h-[164px] gap-6 rounded-2xl border border-[#e3e0d8] bg-[#faf8f3] p-[18px] lg:grid-cols-[520px_1fr]">
      <div>
        <h2 className="serif text-[21px]">Verification & methodology</h2>
        <p className="mt-2 text-[11px] leading-[15px] text-[#616861]">
          Measured contribution records reconcile to checkout payment records.
          Partner evidence is reviewed individually and keeps an administrator
          audit trail.
        </p>
        <button
          className="mt-2 text-[11px] font-semibold text-[#3d5540]"
          onClick={onReview}
          type="button"
        >
          Review contribution records →
        </button>
      </div>
      <div className="grid content-start gap-[10px]">
        <Check
          label="Contribution reconciliation"
          value={verified ? "Verified" : "Awaiting data"}
        />
        <Check
          label="Partner evidence queue"
          value={pending ? `${pending} pending` : "Current"}
          warning={pending > 0}
        />
        <Check label="Administrator audit trail" value="Current" />
      </div>
    </section>
  );
}

function Check({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="flex h-8 items-center text-[11px] text-[#616861]">
      <span className="flex-1">{label}</span>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
          warning
            ? "bg-[#f7eee7] text-[#c98b3c]"
            : "bg-[#eef4ee] text-[#56825a]"
        }`}
      >
        <i className="size-2 rounded-full bg-current" />
        {value}
      </span>
    </div>
  );
}

export function impactPeriod(trend: AdminImpactTrendPoint[]): string {
  if (!trend.length) return "Current reporting period";
  const start = new Date(`${trend[0].month}-01T00:00:00`);
  const endBase = new Date(`${trend.at(-1)?.month}-01T00:00:00`);
  const end = new Date(endBase.getFullYear(), endBase.getMonth() + 1, 0);
  const format = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
  });
  return `${format.format(start)}–${format.format(end)} ${end.getFullYear()}`;
}
