"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAdminPromotions } from "@/hooks/use-admin-promotions";
import type { PromotionStatus } from "@/types/admin-promotions";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { PromotionTable } from "./promotion-table";

type Filter = "all" | PromotionStatus;
const filters: Filter[] = ["all", "draft", "active", "scheduled", "ended"];

export function AdminPromotionsPage() {
  const promotions = useAdminPromotions();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (promotions.data?.items ?? []).filter(
      (item) =>
        (filter === "all" || item.status === filter) &&
        (!query ||
          item.name.toLowerCase().includes(query) ||
          item.code.toLowerCase().includes(query)),
    );
  }, [filter, promotions.data?.items, search]);
  const metrics = promotions.data?.metrics;

  return (
    <section className="min-h-screen bg-[#f2efe7] px-4 py-7 sm:px-6 sm:py-10 lg:px-12">
      <header className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <h1 className="serif text-[32px] leading-tight sm:text-[38px]">Promotions</h1>
          <p className="text-sm text-[var(--muted)]">
            Create offers without hiding terms, expiry dates, or eligibility.
          </p>
        </div>
        <Link
          href="/admin/promotions/new"
          className="flex h-11 w-full items-center justify-center rounded-xl bg-[var(--brand)] text-sm font-semibold text-white sm:w-40"
        >
          Create promotion
        </Link>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Metric
          label="Active promotions"
          value={String(metrics?.activeCount ?? 0)}
          note="Live in the storefront"
        />
        <Metric
          label="Attributed revenue"
          value={money(metrics?.attributedRevenueCents ?? 0)}
          note="Across recorded redemptions"
        />
        <Metric
          label="Average discount"
          value={`${(metrics?.averageDiscountPercent ?? 0).toFixed(1)}%`}
          note="Within margin guardrail"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
        <label className="block w-full max-w-[420px] text-xs font-semibold">
          Search promotions
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try code or campaign name"
            className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-[13px] font-normal outline-none focus:border-[var(--brand)]"
          />
          <span className="mt-2 block font-normal text-[#8a918a]">
            Search applies to the current table.
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {filters.map((choice) => (
            <button
              type="button"
              key={choice}
              onClick={() => setFilter(choice)}
              aria-pressed={filter === choice}
              className={`rounded-full border px-[14px] py-2 text-[13px] capitalize ${
                filter === choice
                  ? "border-[#b5c9b6] bg-[#eef4ee] font-semibold text-[var(--brand)]"
                  : "border-[var(--line)] text-[var(--muted)]"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {promotions.isPending ? (
          <LogoDrawLoader label="Loading promotions" />
        ) : promotions.error ? (
          <p className="rounded-2xl bg-red-50 p-5 text-sm text-red-800">
            {promotions.error.message}
          </p>
        ) : (
          <PromotionTable items={visible} />
        )}
      </div>
      <p className="mt-5 rounded-xl bg-[#f7eee7] px-4 py-[13px] text-[13px] font-semibold text-[#a8714f]">
        Margin protection: discounts above 25% require finance approval before
        activation.
      </p>
    </section>
  );
}

function Metric(props: { label: string; note: string; value: string }) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--page)] p-5">
      <p className="text-[13px] text-[var(--muted)]">{props.label}</p>
      <p className="serif mt-3 text-[28px]">{props.value}</p>
      <p className="mt-3 text-xs text-[#8a918a]">{props.note}</p>
    </article>
  );
}

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
