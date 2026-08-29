"use client";

import Link from "next/link";
import { useState } from "react";
import { useAccountSession } from "@/components/providers/account-session-provider";
import { useOrderHistory } from "@/hooks/use-order-history";
import { OrderHistoryCard } from "./order-history-card-v2";
import {
  EmptyOrderHistory,
  OrderHistoryError,
  OrderHistorySkeleton,
} from "./order-history-states";

type Filter = "all" | "progress" | "delivered" | "cancelled";

export function OrderHistoryPage() {
  const user = useAccountSession();
  const history = useOrderHistory(user.uid);
  const [filter, setFilter] = useState<Filter>("all");
  const orders = history.data?.pages.flatMap((page) => page.items) ?? [];
  const visible = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "progress")
      return !["delivered", "cancelled"].includes(order.fulfillmentStatus);
    return order.fulfillmentStatus === filter;
  });
  return (
    <section className="min-w-0" aria-labelledby="orders-title">
      <header className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h1 id="orders-title" className="serif text-[34px] leading-none sm:text-[40px]">
            Order history
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Track deliveries, reopen receipts, or buy a thoughtful gift again.
          </p>
        </div>
        <Link
          href="/help#order-support"
          className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-6 text-xs font-semibold text-white sm:h-11 sm:w-auto sm:min-h-0"
        >
          Get order help
        </Link>
      </header>
      <nav className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-1" aria-label="Order filters">
        {[
          ["all", "All orders"],
          ["progress", "In progress"],
          ["delivered", "Delivered"],
          ["cancelled", "Cancelled"],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            onClick={() => setFilter(value as Filter)}
            className={
              "h-10 shrink-0 rounded-full border px-4 text-xs " +
              (filter === value
                ? "border-[#b5c9b6] bg-[#eef4ee] font-semibold text-[var(--brand)]"
                : "border-[var(--line)]")
            }
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {history.isLoading ? <OrderHistorySkeleton /> : null}
        {history.isError ? (
          <OrderHistoryError retry={() => void history.refetch()} />
        ) : null}
        {!history.isLoading && !history.isError && !orders.length ? (
          <EmptyOrderHistory />
        ) : null}
        {visible.length ? (
          <div className="grid gap-5">
            {visible.map((order) => (
              <OrderHistoryCard key={order.id} order={order} />
            ))}
          </div>
        ) : null}
        {!history.isLoading && orders.length && !visible.length ? (
          <p className="rounded-xl bg-[#eef4ee] p-4 text-xs text-[var(--brand)]">
            No matching orders? Clear filters or contact support—we’ll help you
            find it.
          </p>
        ) : null}
      </div>
      {history.hasNextPage ? (
        <button
          type="button"
          disabled={history.isFetchingNextPage}
          onClick={() => void history.fetchNextPage()}
          className="mt-6 min-h-12 w-full rounded-xl border border-[var(--brand)] px-6 text-sm font-semibold text-[var(--brand)] sm:h-11 sm:w-auto sm:min-h-0"
        >
          {history.isFetchingNextPage ? "Loading..." : "Load more orders"}
        </button>
      ) : null}
    </section>
  );
}
