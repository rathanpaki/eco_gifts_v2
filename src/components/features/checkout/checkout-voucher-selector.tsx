"use client";

import Link from "next/link";
import { Check, Ticket } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { RewardVoucher } from "@/types/contribution.types";

export function CheckoutVoucherSelector({
  currency,
  onSelect,
  selectedId,
  vouchers,
}: {
  currency: string;
  onSelect: (voucherId: string | undefined) => void;
  selectedId?: string;
  vouchers: RewardVoucher[];
}) {
  const active = vouchers.filter((voucher) => voucher.status === "active");
  return (
    <section aria-labelledby="voucher-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 id="voucher-title" className="text-sm font-semibold">
            EcoPoints rewards
          </h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Apply one available reward to this order.
          </p>
        </div>
        {selectedId ? (
          <button
            className="text-xs font-semibold text-[var(--brand)]"
            onClick={() => onSelect(undefined)}
            type="button"
          >
            Remove
          </button>
        ) : null}
      </div>
      {active.length ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {active.map((voucher) => {
            const selected = voucher.id === selectedId;
            return (
              <button
                aria-checked={selected}
                className={`flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left ${selected ? "border-[1.5px] border-[var(--brand)] bg-[#eef4ee]" : "border-[var(--line)] bg-[var(--page)]"}`}
                key={voucher.id}
                onClick={() => onSelect(voucher.id)}
                role="radio"
                type="button"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--subtle)] text-[var(--brand)]">
                  <Ticket size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {formatMoney(voucher.discountCents, currency)} reward
                  </span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {voucher.code}
                  </span>
                </span>
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-full border ${selected ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--muted)]"}`}
                >
                  {selected ? <Check size={12} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="mt-3 rounded-xl bg-[var(--subtle)] p-4 text-xs text-[var(--muted)]">
          No active rewards yet.{" "}
          <Link
            className="font-semibold text-[var(--brand)]"
            href="/account/impact"
          >
            View your impact wallet
          </Link>
        </p>
      )}
    </section>
  );
}
