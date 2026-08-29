import Link from "next/link";
import { formatMoney } from "@/lib/format-money";
import type { AdminCustomer } from "@/types/admin-customer";
import styles from "./customer-detail.module.css";

export function CustomerDetailHeader({
  customer,
}: {
  customer: AdminCustomer;
}) {
  const rewardTarget = Math.max(
    500,
    Math.ceil((customer.rewardPoints + 1) / 500) * 500,
  );
  const cards = [
    [
      "Lifetime value",
      formatMoney(customer.lifetimeValueCents, "USD"),
      `${customer.completedOrderCount} completed orders`,
    ],
    [
      "Impact recorded",
      impact(customer.impactPlasticAvoidedGrams),
      "plastic avoided",
    ],
    [
      "EcoPoints",
      customer.rewardPoints.toLocaleString(),
      `Next reward at ${rewardTarget.toLocaleString()}`,
    ],
    [
      "Support contacts",
      customer.notes.length.toString(),
      customer.notes[0]
        ? `Last contact ${date(customer.notes[0].createdAt)}`
        : "No support contacts",
    ],
  ];
  return (
    <>
      <Link className={styles.back} href="/admin/customers">
        ‹ Back to customers
      </Link>
      <header className={styles.header}>
        <div>
          <p>Customer · {customer.id.slice(0, 8).toUpperCase()}</p>
          <h1>{customer.displayName}</h1>
          <small>
            {customer.email ?? "No email"} · Customer since{" "}
            {date(customer.createdAt)}
          </small>
        </div>
        <span
          className={
            customer.emailVerified ? styles.verified : styles.unverified
          }
        >
          <i />
          {customer.emailVerified ? "Email verified" : "Email not verified"}
        </span>
      </header>
      <div className={styles.metrics}>
        {cards.map(([label, value, meta]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{meta}</small>
          </article>
        ))}
      </div>
    </>
  );
}

function date(value: string): string {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

function impact(grams: number): string {
  return grams >= 1000 ? `${(grams / 1000).toFixed(1)}kg` : `${grams}g`;
}
