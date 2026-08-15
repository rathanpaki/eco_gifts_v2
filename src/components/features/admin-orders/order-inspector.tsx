import Image from "next/image";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import { formatMoney } from "@/lib/format-money";
import type { AdminOrder } from "@/types/admin-order";
import type { FulfillmentStatus } from "@/types/checkout";
import { AdminOrderStatus, statusLabel } from "./admin-order-status";
import { FulfillmentProgress } from "./fulfillment-progress";
import styles from "./admin-orders.module.css";

export function OrderInspector({
  order,
  pending,
  error,
  onTransition,
}: {
  order: AdminOrder;
  pending: boolean;
  error: string | null;
  onTransition: (status: FulfillmentStatus) => void;
}) {
  const next = order.allowedTransitions.find(
    (status) => status !== "cancelled",
  );
  const canCancel = order.allowedTransitions.includes("cancelled");
  return (
    <aside
      className={styles.inspector}
      aria-label={`Order ${order.orderNumber}`}
    >
      <header className={styles.inspectorHeader}>
        <h2>{order.orderNumber}</h2>
        <AdminOrderStatus status={order.fulfillmentStatus} />
      </header>
      <p className={styles.customer}>
        {order.customerName}
        {order.customerEmail ? ` · ${order.customerEmail}` : ""}
      </p>
      <div className={styles.items}>
        {order.items.map((item) => (
          <article className={styles.item} key={item.itemId}>
            <div className={styles.itemImage}>
              {item.image && (
                <Image
                  alt={item.image.alt}
                  fill
                  sizes="72px"
                  src={item.image.url}
                  unoptimized={shouldBypassImageOptimization(item.image.url)}
                />
              )}
            </div>
            <div>
              <strong>{item.name}</strong>
              <small>
                Qty {item.quantity}
                {item.customization ? " · Personalized" : ""}
              </small>
            </div>
            <strong>{formatMoney(item.lineTotalCents, order.currency)}</strong>
          </article>
        ))}
      </div>
      <FulfillmentProgress order={order} />
      <address className={styles.address}>
        <strong>Ship to</strong>
        <span>{addressLine(order)}</span>
      </address>
      {error && (
        <p className={styles.actionError} role="alert">
          {error}
        </p>
      )}
      {next && (
        <button
          className={styles.primaryAction}
          disabled={pending}
          onClick={() => onTransition(next)}
          type="button"
        >
          {pending ? "Updating…" : actionLabel(next)}
        </button>
      )}
      {canCancel && (
        <button
          className={styles.cancelAction}
          disabled={pending}
          onClick={() => onTransition("cancelled")}
          type="button"
        >
          Cancel order and restore stock
        </button>
      )}
    </aside>
  );
}

function actionLabel(status: FulfillmentStatus): string {
  if (status === "confirmed") return "Confirm order";
  if (status === "processing") return "Start production";
  if (status === "shipped") return "Mark packed and dispatched";
  if (status === "delivered") return "Mark delivered and paid";
  return `Mark ${statusLabel(status).toLowerCase()}`;
}

function addressLine(order: AdminOrder): string {
  const address = order.address;
  return [
    address.fullName,
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.region,
    address.postalCode,
    address.countryCode,
  ]
    .filter(Boolean)
    .join(", ");
}
