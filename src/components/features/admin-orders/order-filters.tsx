import type { AdminOrderFilter, AdminOrderMetrics } from "@/types/admin-order";
import styles from "./admin-orders.module.css";

const filters: Array<{
  value: AdminOrderFilter;
  label: string;
  metric: keyof AdminOrderMetrics;
}> = [
  { value: "all", label: "All", metric: "total" },
  { value: "pending", label: "Needs attention", metric: "pending" },
  { value: "confirmed", label: "Confirmed", metric: "confirmed" },
  { value: "processing", label: "In production", metric: "processing" },
  { value: "shipped", label: "Shipped", metric: "shipped" },
  { value: "delivered", label: "Delivered", metric: "delivered" },
  { value: "cancelled", label: "Cancelled", metric: "cancelled" },
];

export function OrderFilters({
  active,
  metrics,
  onChange,
}: {
  active: AdminOrderFilter;
  metrics: AdminOrderMetrics;
  onChange: (filter: AdminOrderFilter) => void;
}) {
  return (
    <div className={styles.filters} aria-label="Order status filters">
      {filters.map((filter) => (
        <button
          aria-pressed={active === filter.value}
          className={
            active === filter.value ? styles.filterActive : styles.filter
          }
          key={filter.value}
          onClick={() => onChange(filter.value)}
          type="button"
        >
          {filter.label} <span>{metrics[filter.metric]}</span>
        </button>
      ))}
    </div>
  );
}
