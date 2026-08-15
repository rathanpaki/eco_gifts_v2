import type { AdminOrderSummary } from "@/types/admin-order";
import { formatMoney } from "@/lib/format-money";
import { AdminOrderStatus } from "./admin-order-status";
import styles from "./admin-orders.module.css";

export function OrderQueue({
  orders,
  selectedId,
  hasNextPage,
  loadingMore,
  onLoadMore,
  onSelect,
}: {
  orders: AdminOrderSummary[];
  selectedId?: string;
  hasNextPage: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
  onSelect: (id: string) => void;
}) {
  if (!orders.length) {
    return (
      <section className={styles.queue}>
        <div className={styles.empty}>
          <h2>No orders in this queue</h2>
          <p>Choose another fulfillment filter to review live orders.</p>
        </div>
      </section>
    );
  }
  return (
    <section className={styles.queue} aria-label="Order queue">
      <div className={styles.queueHeader} aria-hidden="true">
        <span>Order</span>
        <span>Customer</span>
        <span>Total</span>
        <span>Status</span>
      </div>
      {orders.map((order) => (
        <button
          aria-pressed={selectedId === order.id}
          className={selectedId === order.id ? styles.rowActive : styles.row}
          key={order.id}
          onClick={() => onSelect(order.id)}
          type="button"
        >
          <strong>{order.orderNumber}</strong>
          <span title={order.customerName}>{order.customerName}</span>
          <span>{formatMoney(order.totalCents, order.currency)}</span>
          <AdminOrderStatus status={order.fulfillmentStatus} />
        </button>
      ))}
      {hasNextPage && (
        <button
          className={styles.loadMore}
          disabled={loadingMore}
          onClick={onLoadMore}
          type="button"
        >
          {loadingMore ? "Loading…" : "Load more orders"}
        </button>
      )}
    </section>
  );
}
