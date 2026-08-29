import type { AdminDashboard } from "@/types/admin-dashboard";
import { RecentOrders } from "./admin-recent-orders";
import {
  AttentionPanel,
  DashboardMetrics,
  RevenueTrend,
} from "./admin-dashboard-sections";
import styles from "./admin-dashboard.module.css";

export function AdminDashboardView({
  dashboard,
}: {
  dashboard: AdminDashboard;
}) {
  const updated = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(dashboard.generatedAt));
  return (
    <section className={styles.content}>
      <header className={styles.header}>
        <div>
          <h1>Operations overview</h1>
          <p>{updated}</p>
        </div>
        <span className={styles.period}>Last {dashboard.periodDays} days</span>
      </header>
      <DashboardMetrics dashboard={dashboard} />
      <section className={styles.middle}>
        <RevenueTrend dashboard={dashboard} />
        <AttentionPanel dashboard={dashboard} />
      </section>
      <RecentOrders dashboard={dashboard} />
    </section>
  );
}

export function AdminState({ kind }: { kind: "forbidden" | "unavailable" }) {
  const unavailable = kind === "unavailable";
  return (
    <section className={styles.state} role={unavailable ? "alert" : "status"}>
      <p className={styles.operation}>Admin dashboard</p>
      <h1>{unavailable ? "Dashboard unavailable" : "Admin access required"}</h1>
      <p>
        {unavailable
          ? "We could not load the current operations data. Please try again shortly."
          : "Your account is signed in but does not have permission to view operations."}
      </p>
    </section>
  );
}
