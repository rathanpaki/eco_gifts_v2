import { CheckCircle2, Clock3 } from "lucide-react";
import type { AdminOrder } from "@/types/admin-order";

export function AdminDeliveryConfirmation({ order }: { order: AdminOrder }) {
  if (order.deliveryConfirmationStatus === "not_ready") return null;
  const confirmed = order.deliveryConfirmationStatus === "confirmed";
  return (
    <section
      className={`rounded-xl border p-4 ${confirmed ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}
      aria-label="Customer delivery confirmation"
    >
      <div className="flex items-start gap-3">
        {confirmed ? (
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        ) : (
          <Clock3 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        )}
        <div>
          <h3 className="text-sm font-bold">
            {confirmed
              ? "Customer confirmed delivery"
              : "Awaiting customer confirmation"}
          </h3>
          <p className="mt-1 text-xs leading-5">
            {confirmed && order.deliveryConfirmedAt
              ? `Confirmed ${formatDate(order.deliveryConfirmedAt)}.`
              : "The customer can confirm receipt from their order details page."}
          </p>
        </div>
      </div>
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
