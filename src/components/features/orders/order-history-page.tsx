"use client";

import { useOrderHistory } from "@/hooks/use-order-history";
import { useAccountSession } from "@/components/providers/account-session-provider";
import { OrderHistoryCard } from "./order-history-card";
import {
  EmptyOrderHistory,
  OrderHistoryError,
  OrderHistorySkeleton,
} from "./order-history-states";

export function OrderHistoryPage() {
  const user = useAccountSession();
  const history = useOrderHistory(user.uid);
  const orders = history.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section aria-labelledby="orders-title">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">Account</p>
        <h1 id="orders-title" className="serif mt-2 text-4xl sm:text-5xl">Your orders</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Track confirmed purchases and review their environmental impact.</p>
      </div>

      {history.isLoading && <OrderHistorySkeleton />}
      {history.isError && (
        <OrderHistoryError retry={() => void history.refetch()} />
      )}
      {!history.isLoading && !history.isError && orders.length === 0 && (
        <EmptyOrderHistory />
      )}
      {orders.length > 0 && (
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderHistoryCard order={order} key={order.id} />
          ))}
        </div>
      )}
      {history.hasNextPage && (
        <div className="mt-7 text-center">
          <button
            type="button"
            disabled={history.isFetchingNextPage}
            onClick={() => void history.fetchNextPage()}
            className="rounded-xl border border-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand)] disabled:opacity-50"
          >
            {history.isFetchingNextPage ? "Loading..." : "Load more orders"}
          </button>
        </div>
      )}
    </section>
  );
}
