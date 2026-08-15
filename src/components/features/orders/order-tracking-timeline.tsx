import { Check, Circle } from "lucide-react";
import type { FulfillmentStatus, OrderTimelineEvent } from "@/types/checkout";

const path: Array<Exclude<FulfillmentStatus, "cancelled">> = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

const labels: Record<Exclude<FulfillmentStatus, "cancelled">, string> = {
  pending: "Order placed",
  confirmed: "Order confirmed",
  processing: "Preparing your gifts",
  shipped: "Shipped",
  delivered: "Delivered",
};

export function OrderTrackingTimeline({
  current,
  history,
}: {
  current: FulfillmentStatus;
  history: OrderTimelineEvent[];
}) {
  const reached = highestReached(history);
  if (current === "cancelled") {
    const cancellation = history.find((event) => event.status === "cancelled");
    return (
      <section
        className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4"
        aria-labelledby="tracking-title"
      >
        <h2 className="font-bold text-red-900" id="tracking-title">
          Order cancelled
        </h2>
        <p className="mt-1 text-xs text-red-700">
          {cancellation
            ? `Cancelled ${formatDate(cancellation.createdAt)}.`
            : "This order is no longer being fulfilled."}
        </p>
      </section>
    );
  }
  const currentIndex = path.indexOf(current);
  return (
    <section
      className="mt-5 border-t border-slate-100 pt-5"
      aria-labelledby="tracking-title"
    >
      <h2 className="font-bold text-slate-900" id="tracking-title">
        Fulfillment tracking
      </h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-5">
        {path.map((status, index) => {
          const event = history.find((item) => item.status === status);
          const complete = index < currentIndex || index <= reached;
          const active = index === currentIndex;
          return (
            <li className="flex gap-2 sm:block" key={status}>
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full border ${complete ? "border-emerald-700 bg-emerald-700 text-white" : active ? "border-2 border-emerald-700 bg-emerald-50 text-emerald-800" : "border-slate-300 text-slate-400"}`}
              >
                {complete && !active ? (
                  <Check size={15} />
                ) : (
                  <Circle fill="currentColor" size={8} />
                )}
              </span>
              <div className="sm:mt-2">
                <strong className="text-xs text-slate-800">
                  {labels[status]}
                </strong>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  {event
                    ? formatDate(event.createdAt)
                    : active
                      ? "In progress"
                      : "Upcoming"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function highestReached(history: OrderTimelineEvent[]): number {
  return history.reduce(
    (highest, event) =>
      Math.max(
        highest,
        path.indexOf(event.status as Exclude<FulfillmentStatus, "cancelled">),
      ),
    -1,
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
