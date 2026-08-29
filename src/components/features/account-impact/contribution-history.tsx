import { formatMoney } from "@/lib/format-money";
import type { EcoContribution } from "@/types/contribution.types";

export function ContributionHistory({
  contributions,
}: {
  contributions: EcoContribution[];
}) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-white p-4 sm:p-6">
      <h2 className="text-lg font-bold sm:text-xl">Contribution history</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Every cause contribution is linked to its order and verification state.
      </p>
      <div className="mt-4 grid gap-3 sm:hidden">
        {contributions.map((item) => (
          <article
            className="rounded-xl border border-[var(--line)] bg-[var(--page)] p-4"
            key={item.id}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold">{item.cause}</h3>
              <span className="shrink-0 rounded-full bg-[#eef4ee] px-2.5 py-1 text-[10px] font-semibold text-[var(--brand)]">
                {item.status.replaceAll("_", " ")}
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <dt className="text-[10px] uppercase text-[var(--muted)]">Amount</dt>
                <dd className="mt-1 text-sm font-semibold">
                  {formatMoney(item.amountCents, "USD")}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase text-[var(--muted)]">EcoPoints</dt>
                <dd className="mt-1 text-sm font-semibold">
                  +{item.rewardPointsEarned}
                </dd>
              </div>
            </dl>
            <p className="mt-3 break-all text-[11px] text-[var(--muted)]">
              Order {item.orderId}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-5 hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="border-b border-[var(--line)] text-xs uppercase tracking-wide text-[var(--muted)]">
            <tr>
              <th className="py-3 pr-4">Cause</th>
              <th className="py-3 pr-4">Order</th>
              <th className="py-3 pr-4">Amount</th>
              <th className="py-3 pr-4">EcoPoints</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((item) => (
              <tr
                className="border-b border-[var(--line)] last:border-0"
                key={item.id}
              >
                <td className="py-4 pr-4 font-semibold">{item.cause}</td>
                <td className="py-4 pr-4 text-[var(--muted)]">
                  {item.orderId}
                </td>
                <td className="py-4 pr-4">
                  {formatMoney(item.amountCents, "USD")}
                </td>
                <td className="py-4 pr-4">+{item.rewardPointsEarned}</td>
                <td className="py-4">
                  <span className="rounded-full bg-[#eef4ee] px-2.5 py-1 text-xs font-semibold text-[var(--brand)]">
                    {item.status.replaceAll("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!contributions.length ? (
        <p className="mt-5 text-sm text-[var(--muted)]">
          No contributions yet.
        </p>
      ) : null}
    </section>
  );
}
