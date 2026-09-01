import { Gift, Ticket } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { RewardVoucher } from "@/types/contribution.types";

export function ImpactWallet({
  error,
  onRedeem,
  pending,
  rewardPoints,
  vouchers,
}: {
  error?: string;
  onRedeem: () => void;
  pending: boolean;
  rewardPoints: number;
  vouchers: RewardVoucher[];
}) {
  return (
    <section className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
            Reward wallet
          </p>
          <h2 className="mt-2 text-2xl font-bold">{rewardPoints} EcoPoints</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Exchange 100 points for a $5 reward.
          </p>
        </div>
        <button
          className="premium-action min-h-12 w-full rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white disabled:opacity-45 sm:min-h-11 sm:w-auto"
          disabled={pending || rewardPoints < 100}
          onClick={onRedeem}
          type="button"
        >
          <Gift className="mr-2 inline size-4" />
          {pending ? "Creating reward…" : "Create $5 reward"}
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {vouchers.map((voucher) => (
          <article
            className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--page)] p-4"
            key={voucher.id}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eef4ee] text-[var(--brand)]">
              <Ticket size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {formatMoney(voucher.discountCents, "USD")} reward
              </p>
              <p className="mt-1 truncate text-xs text-[var(--muted)]">
                {voucher.code}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--brand)]">
                {voucher.status}
              </p>
            </div>
          </article>
        ))}
      </div>
      {!vouchers.length ? (
        <p className="mt-6 rounded-xl bg-[var(--subtle)] p-4 text-sm text-[var(--muted)]">
          Your rewards will appear here after you exchange EcoPoints.
        </p>
      ) : null}
    </section>
  );
}
