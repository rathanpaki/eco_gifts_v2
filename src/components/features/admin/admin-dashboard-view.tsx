import type { AdminDashboard, RecentOrder } from "@/types/admin-dashboard";
import styles from "@/components/features/admin/admin-dashboard.module.css";

export function AdminDashboardView({ dashboard }: { dashboard: AdminDashboard }) {
  const updated = new Intl.DateTimeFormat("en", { dateStyle: "full", timeStyle: "short" }).format(new Date(dashboard.generatedAt));
  const currency = (value: number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
  const maxRevenue = Math.max(...dashboard.revenueTrend.map((point) => point.revenueCents), 0);
  return <section className={styles.content}>
    <header className={styles.header}><div><h1>Operations overview</h1><p>{updated}</p></div><span className={styles.period}>Last {dashboard.periodDays} days</span></header>
    <section className={styles.kpis} aria-label="Key performance indicators">
      <Metric label="Revenue" value={currency(dashboard.kpis.revenueCents)} change={dashboard.kpis.revenueChangePercent} tone="green" />
      <Metric label="Orders" value={dashboard.kpis.orderCount.toLocaleString("en")} change={dashboard.kpis.orderChangePercent} tone="subtle" />
      <Metric label="Avg. order" value={currency(dashboard.kpis.averageOrderCents)} change={dashboard.kpis.averageChangePercent} tone="peach" />
      <Metric label="Open issues" value={dashboard.kpis.openIssues.toLocaleString("en")} note="Needs review" tone="plain" />
    </section>
    <section className={styles.middle}>
      <article className={styles.card}><div className={styles.cardHeader}><h2>Revenue trend</h2><strong>{currency(dashboard.revenueTrend.reduce((total, point) => total + point.revenueCents, 0))} this period</strong></div>
        {dashboard.revenueTrend.length && maxRevenue > 0 ? <div className={styles.chart} aria-label="Revenue by day">{dashboard.revenueTrend.map((point) => <div className={styles.barColumn} key={point.date}><span aria-label={`${point.label}: ${currency(point.revenueCents)}`} className={styles.bar} style={{ height: `${Math.max(3, (point.revenueCents / maxRevenue) * 100)}%` }} /><small>{point.label}</small></div>)}</div> : <Empty text="No revenue recorded in this period." />}
      </article>
      <Attention dashboard={dashboard} />
    </section>
    <section className={styles.orders}><div className={styles.cardHeader}><h2>Recent orders</h2><span>{dashboard.recentOrders.length} shown</span></div>
      {dashboard.recentOrders.length ? <div className={styles.tableWrap}><table><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>{dashboard.recentOrders.map((order) => <OrderRow key={order.id} order={order} />)}</tbody></table></div> : <Empty text="No orders have been placed yet." />}
    </section>
  </section>;
}

export function AdminState({ kind }: { kind: "forbidden" | "unavailable" }) {
  const unavailable = kind === "unavailable";
  return <section className={styles.state} role={unavailable ? "alert" : "status"}><p className={styles.operation}>Admin dashboard</p><h1>{unavailable ? "Dashboard unavailable" : "Admin access required"}</h1><p>{unavailable ? "We could not load the current operations data. Please try again shortly." : "Your account is signed in but does not have permission to view operations."}</p></section>;
}

function Metric({ label, value, change, note, tone }: { label: string; value: string; change?: number | null; note?: string; tone: string }) { return <article className={`${styles.metric} ${styles[`metric${tone}`]}`}><p>{label}</p><h2>{value}</h2><strong>{note ?? (change == null ? "No comparison" : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`)}</strong></article>; }
function Attention({ dashboard }: { dashboard: AdminDashboard }) { const rows = [["Payment failures", dashboard.attention.paymentFailures, "Error"], ["Low-stock products", dashboard.attention.lowStockProducts, "Warning"], ["Ready to ship", dashboard.attention.readyToShip, "Success"]] as const; return <aside className={styles.attention}><h2>Needs attention</h2>{rows.map(([label, value, tone]) => <div className={styles.attentionRow} key={label}><span>{label}</span><StatusBadge label={`${value}`} tone={tone} /></div>)}</aside>; }
function OrderRow({ order }: { order: RecentOrder }) { const total = order.currency ? new Intl.NumberFormat("en", { style: "currency", currency: order.currency }).format(order.totalCents / 100) : "—"; const status = order.status ?? "Unknown"; return <tr><td>{order.orderNumber}</td><td>{order.customerName ?? "Unknown"}</td><td>{total}</td><td><StatusBadge label={status} tone={statusTone(status)} /></td></tr>; }
function StatusBadge({ label, tone }: { label: string; tone: "Success" | "Warning" | "Error" }) { return <span className={`${styles.badge} ${styles[`badge${tone}`]}`}><i aria-hidden="true" />{label}</span>; }
function statusTone(status: string): "Success" | "Warning" | "Error" { const value = status.toLowerCase(); return value.includes("fail") || value.includes("cancel") ? "Error" : value.includes("pending") || value.includes("hold") ? "Warning" : "Success"; }
function Empty({ text }: { text: string }) { return <p className={styles.empty} role="status">{text}</p>; }
