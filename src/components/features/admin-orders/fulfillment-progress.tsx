import { Check } from "lucide-react";
import type { AdminOrder } from "@/types/admin-order";
import type { FulfillmentStatus } from "@/types/checkout";
import { statusLabel } from "./admin-order-status";
import styles from "./admin-orders.module.css";

type ActiveStatus = Exclude<FulfillmentStatus, "cancelled">;

const path: ActiveStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

const labels: Record<ActiveStatus, string> = {
  pending: "Order placed",
  confirmed: "Order confirmed",
  processing: "In production",
  shipped: "Pack and dispatch",
  delivered: "Delivered",
};

export function FulfillmentProgress({ order }: { order: AdminOrder }) {
  const currentIndex =
    order.fulfillmentStatus === "cancelled"
      ? highestReached(order)
      : path.indexOf(order.fulfillmentStatus);
  return (
    <section className={styles.progress} aria-labelledby="fulfillment-title">
      <h3 id="fulfillment-title">Fulfillment</h3>
      {path.map((status, index) => {
        const event = order.events.find((item) => item.status === status);
        const complete = index < currentIndex;
        const current = order.fulfillmentStatus === status;
        if (index > currentIndex + 1) return null;
        return (
          <div
            className={styles.step}
            data-state={
              complete ? "complete" : current ? "current" : "upcoming"
            }
            key={status}
          >
            <span className={styles.marker}>
              {complete ? <Check aria-hidden="true" size={18} /> : index + 1}
            </span>
            <span className={styles.stepCopy}>
              <strong>{labels[status]}</strong>
              <small>{stepMeta(event, complete, current)}</small>
              {event?.note && (
                <small className={styles.note}>{event.note}</small>
              )}
            </span>
          </div>
        );
      })}
      {order.fulfillmentStatus === "cancelled" && (
        <div className={styles.cancelledStep}>
          <span aria-hidden="true">x</span>
          <div>
            <strong>{statusLabel("cancelled")}</strong>
            <small>{cancelledMeta(order)}</small>
          </div>
        </div>
      )}
    </section>
  );
}

function stepMeta(
  event: AdminOrder["events"][number] | undefined,
  complete: boolean,
  current: boolean,
): string {
  if (event) return eventMeta(event.createdAt, event.actorEmail);
  if (complete) return "Completed before tracking";
  return current ? "In progress" : "Next";
}

function eventMeta(createdAt: string, actorEmail: string | null): string {
  const date = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(createdAt));
  return actorEmail ? `${date} - ${actorEmail}` : date;
}

function cancelledMeta(order: AdminOrder): string {
  const event = order.events.find((item) => item.status === "cancelled");
  return event
    ? eventMeta(event.createdAt, event.actorEmail)
    : "Order cancelled";
}

function highestReached(order: AdminOrder): number {
  return order.events.reduce(
    (highest, event) =>
      Math.max(
        highest,
        path.indexOf(event.status as ActiveStatus),
        event.fromStatus ? path.indexOf(event.fromStatus as ActiveStatus) : -1,
      ),
    -1,
  );
}
