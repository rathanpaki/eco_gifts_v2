"use client";

import { useState } from "react";
import {
  useAdminOrder,
  useAdminOrders,
  useAdminOrderStatusMutation,
} from "@/hooks/use-admin-orders";
import { exportAdminOrders } from "@/services/admin-orders.service";
import type { AdminOrderFilter } from "@/types/admin-order";
import type { FulfillmentStatus } from "@/types/checkout";
import {
  InspectorState,
  OrdersError,
  OrdersSkeleton,
} from "./admin-order-states";
import { OrderFilters } from "./order-filters";
import { OrderQueue } from "./order-queue";
import styles from "./admin-orders.module.css";

export function AdminOrdersPage() {
  const [filter, setFilter] = useState<AdminOrderFilter>("all");
  const [chosenId, setChosenId] = useState<string>();
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const listing = useAdminOrders(filter);
  const orders = listing.data?.pages.flatMap((page) => page.items) ?? [];
  const selectedId = orders.some((order) => order.id === chosenId)
    ? chosenId
    : orders[0]?.id;
  const detail = useAdminOrder(selectedId);
  const transition = useAdminOrderStatusMutation();
  const metrics = listing.data?.pages[0]?.metrics;

  const changeFilter = (value: AdminOrderFilter) => {
    transition.reset();
    setChosenId(undefined);
    setFilter(value);
  };
  const changeStatus = (status: FulfillmentStatus) => {
    if (!selectedId) return;
    if (
      status === "cancelled" &&
      !window.confirm("Cancel this order and restore its product stock?")
    )
      return;
    transition.mutate({ orderId: selectedId, status });
  };
  const exportOrders = async () => {
    setExporting(true);
    setExportError(null);
    try {
      await exportAdminOrders(filter);
    } catch (error) {
      setExportError(
        error instanceof Error
          ? error.message
          : "Orders could not be exported.",
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Orders</h1>
          <p>
            Prioritize exceptions, then move healthy orders through fulfillment.
          </p>
        </div>
        <button
          disabled={exporting || !metrics?.total}
          onClick={() => void exportOrders()}
          type="button"
        >
          {exporting ? "Preparing export…" : "Export orders"}
        </button>
      </header>
      {exportError && (
        <p className={styles.exportError} role="alert">
          {exportError}
        </p>
      )}
      {listing.isLoading && <OrdersSkeleton />}
      {listing.isError && (
        <OrdersError
          message={listing.error.message}
          retry={() => void listing.refetch()}
        />
      )}
      {metrics && !listing.isError && (
        <>
          <OrderFilters
            active={filter}
            metrics={metrics}
            onChange={changeFilter}
          />
          <div className={styles.workspace}>
            <OrderQueue
              hasNextPage={Boolean(listing.hasNextPage)}
              loadingMore={listing.isFetchingNextPage}
              onLoadMore={() => void listing.fetchNextPage()}
              onSelect={(id) => {
                transition.reset();
                setChosenId(id);
              }}
              orders={orders}
              selectedId={selectedId}
            />
            <InspectorState
              detail={detail}
              error={transition.error?.message ?? null}
              onTransition={changeStatus}
              pending={transition.isPending}
            />
          </div>
        </>
      )}
    </section>
  );
}
