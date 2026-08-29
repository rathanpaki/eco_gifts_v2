import type { AdminDashboard } from "@/types/admin-dashboard";
import styles from "./admin-dashboard-sections.module.css";

export function DashboardMetrics({ dashboard }: { dashboard: AdminDashboard }) {
  const kpis = dashboard.kpis;
  return (
    <section className={styles.kpis} aria-label="Key performance indicators">
      <Metric
        change={kpis.revenueChangePercent}
        label="Revenue"
        tone="green"
        value={currency(kpis.revenueCents)}
      />
      <Metric
        change={kpis.orderChangePercent}
        label="Orders"
        tone="subtle"
        value={kpis.orderCount.toLocaleString("en")}
      />
      <Metric
        change={kpis.averageChangePercent}
        label="Avg. order"
        tone="peach"
        value={currency(kpis.averageOrderCents)}
      />
      <Metric
        label="Open issues"
        note="Needs review"
        tone="plain"
        value={kpis.openIssues.toLocaleString("en")}
      />
    </section>
  );
}

export function RevenueTrend({ dashboard }: { dashboard: AdminDashboard }) {
  const total = dashboard.revenueTrend.reduce(
    (sum, point) => sum + point.revenueCents,
    0,
  );
  const maximum = Math.max(
    ...dashboard.revenueTrend.map((point) => point.revenueCents),
    0,
  );
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Revenue trend</h2>
        <strong>{currency(total)} this period</strong>
      </div>
      {dashboard.revenueTrend.length && maximum > 0 ? (
        <div className={styles.chart} aria-label="Revenue by day">
          {dashboard.revenueTrend.map((point) => (
            <div className={styles.barColumn} key={point.date}>
              <span
                aria-label={`${point.label}: ${currency(point.revenueCents)}`}
                className={styles.bar}
                style={{
                  height: `${Math.max(3, (point.revenueCents / maximum) * 100)}%`,
                }}
              />
              <small>{point.label}</small>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No revenue recorded in this period.</p>
      )}
    </article>
  );
}

export function AttentionPanel({ dashboard }: { dashboard: AdminDashboard }) {
  const rows = [
    ["Payment failures", dashboard.attention.paymentFailures, "Error"],
    ["Low-stock products", dashboard.attention.lowStockProducts, "Warning"],
    ["Ready to ship", dashboard.attention.readyToShip, "Success"],
  ] as const;
  return (
    <aside className={styles.attention}>
      <h2>Needs attention</h2>
      {rows.map(([label, value, tone]) => (
        <div className={styles.attentionRow} key={label}>
          <span>{label}</span>
          <StatusBadge label={String(value)} tone={tone} />
        </div>
      ))}
    </aside>
  );
}

function Metric({
  change,
  label,
  note,
  tone,
  value,
}: {
  change?: number | null;
  label: string;
  note?: string;
  tone: string;
  value: string;
}) {
  const comparison =
    change == null
      ? "No comparison"
      : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
  return (
    <article className={`${styles.metric} ${styles[`metric${tone}`]}`}>
      <p>{label}</p>
      <h2>{value}</h2>
      <strong>{note ?? comparison}</strong>
    </article>
  );
}

function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: "Success" | "Warning" | "Error";
}) {
  return (
    <span className={`${styles.badge} ${styles[`badge${tone}`]}`}>
      <i aria-hidden="true" />
      {label}
    </span>
  );
}

function currency(value: number): string {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
}
