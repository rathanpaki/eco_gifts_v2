import { formatMoney } from "@/lib/format-money";
import type { AdminCustomer } from "@/types/admin-customer";
import styles from "./customer-orders.module.css";

export function CustomerOrdersCard({ customer }: { customer: AdminCustomer }) {
  return (
    <section className={styles.orders}>
      <header>
        <h2>Recent orders</h2>
        <span>{customer.orderCount} total orders</span>
      </header>
      {customer.recentOrders.length ? (
        <div className={styles.orderTable}>
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Gift</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customer.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>
                    <strong>{order.items[0].name}</strong>
                    <small>
                      {order.totalQuantity} item
                      {order.totalQuantity === 1 ? "" : "s"}
                    </small>
                  </td>
                  <td>{date(order.createdAt)}</td>
                  <td>{formatMoney(order.totalCents, order.currency)}</td>
                  <td>{label(order.fulfillmentStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.noOrders}>No orders have been placed.</p>
      )}
      <div className={styles.preferences}>
        <strong>Known preferences</strong>
        <span>No customer-managed gift preferences have been recorded.</span>
      </div>
    </section>
  );
}

function date(value: string): string {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    new Date(value),
  );
}
function label(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
