import Link from "next/link";
import { formatMoney } from "@/lib/format-money";
import type { AdminCustomerSummary } from "@/types/admin-customer";
import styles from "./customer-table.module.css";

export function CustomerTable({
  customers,
}: {
  customers: AdminCustomerSummary[];
}) {
  if (!customers.length) {
    return (
      <div className={styles.empty}>
        <h2>No customers found</h2>
        <p>Adjust the current search or customer filters.</p>
      </div>
    );
  }
  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Orders</th>
            <th>Lifetime value</th>
            <th>Last order</th>
            <th>Marketing</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <Link href={`/admin/customers/${customer.id}`}>
                  <strong>{customer.displayName}</strong>
                  <small>{customer.email ?? "No email"}</small>
                </Link>
              </td>
              <td>{customer.orderCount}</td>
              <td>{formatMoney(customer.lifetimeValueCents, "USD")}</td>
              <td>
                {customer.lastOrderAt
                  ? date(customer.lastOrderAt)
                  : "No orders"}
              </td>
              <td>{customer.marketingOptIn ? "Opted in" : "Not opted in"}</td>
              <td>{formatImpact(customer.impactPlasticAvoidedGrams)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function date(value: string): string {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    new Date(value),
  );
}
function formatImpact(grams: number): string {
  return grams >= 1000
    ? `${(grams / 1000).toFixed(1)}kg avoided`
    : `${grams}g avoided`;
}
