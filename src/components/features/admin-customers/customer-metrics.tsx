import { formatMoney } from "@/lib/format-money";
import type { AdminCustomerMetrics } from "@/types/admin-customer";
import styles from "./admin-customers.module.css";

export function CustomerMetrics({
  metrics,
}: {
  metrics: AdminCustomerMetrics;
}) {
  const cards = [
    {
      label: "Total customers",
      value: metrics.totalCustomers.toLocaleString(),
      meta: change(metrics.monthlyChangePercent),
    },
    {
      label: "Repeat purchase rate",
      value: `${metrics.repeatPurchaseRate}%`,
      meta: "Among customers with orders",
    },
    {
      label: "Email opt-in",
      value: `${metrics.emailOptInRate}%`,
      meta: "Consent recorded",
    },
    {
      label: "Average order value",
      value: formatMoney(metrics.averageOrderValueCents, "USD"),
      meta: "Completed orders",
    },
  ];
  return (
    <div className={styles.metrics}>
      {cards.map((card) => (
        <article key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <small>{card.meta}</small>
        </article>
      ))}
    </div>
  );
}

function change(value: number | null): string {
  if (value === null) return "No prior-month baseline";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}% versus last month`;
}
