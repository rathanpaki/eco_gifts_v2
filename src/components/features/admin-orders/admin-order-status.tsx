import type { FulfillmentStatus } from "@/types/checkout";
import styles from "./admin-orders.module.css";

const values: Record<
  FulfillmentStatus,
  { label: string; tone: "success" | "warning" | "error" | "neutral" }
> = {
  pending: { label: "Needs attention", tone: "warning" },
  confirmed: { label: "Confirmed", tone: "neutral" },
  processing: { label: "In production", tone: "success" },
  shipped: { label: "Shipped", tone: "neutral" },
  delivered: { label: "Delivered", tone: "success" },
  cancelled: { label: "Cancelled", tone: "error" },
};

export function AdminOrderStatus({ status }: { status: FulfillmentStatus }) {
  const value = values[status];
  return (
    <span className={`${styles.badge} ${styles[value.tone]}`}>
      <i aria-hidden="true" />
      {value.label}
    </span>
  );
}

export function statusLabel(status: FulfillmentStatus): string {
  return values[status].label;
}
