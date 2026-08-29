import Link from "next/link";
import type { AdminDashboard, RecentOrder } from "@/types/admin-dashboard";
import styles from "./admin-recent-orders.module.css";

export function RecentOrders({ dashboard }: { dashboard: AdminDashboard }) {
  return (
    <section className={styles.orders}>
      <div className={styles.cardHeader}>
        <h2>Recent orders</h2>
        <Link href="/admin/orders">View all orders</Link>
      </div>
      {dashboard.recentOrders.length ? (
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentOrders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.empty}>No orders have been placed yet.</p>
      )}
    </section>
  );
}

function OrderRow({ order }: { order: RecentOrder }) {
  const total = order.currency
    ? new Intl.NumberFormat("en", {
        style: "currency",
        currency: order.currency,
      }).format(order.totalCents / 100)
    : "—";
  const status = order.status ?? "Unknown";
  const tone = statusTone(status);
  return (
    <tr>
      <td data-label="Order">{order.orderNumber}</td>
      <td data-label="Customer">{order.customerName ?? "Unknown"}</td>
      <td data-label="Total">{total}</td>
      <td data-label="Status">
        <span className={`${styles.badge} ${styles[`badge${tone}`]}`}>
          <i aria-hidden="true" />
          {status}
        </span>
      </td>
    </tr>
  );
}

function statusTone(status: string): "Success" | "Warning" | "Error" {
  const value = status.toLowerCase();
  if (value.includes("fail") || value.includes("cancel")) return "Error";
  if (value.includes("pending") || value.includes("hold")) return "Warning";
  return "Success";
}
