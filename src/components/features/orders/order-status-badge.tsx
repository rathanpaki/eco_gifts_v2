import type { FulfillmentStatus } from "@/types/checkout";

const statusStyles: Record<
  FulfillmentStatus,
  { label: string; className: string }
> = {
  pending: { label: "Order placed", className: "bg-amber-50 text-amber-800" },
  confirmed: { label: "Confirmed", className: "bg-blue-50 text-blue-800" },
  processing: { label: "Preparing", className: "bg-violet-50 text-violet-800" },
  shipped: { label: "Shipped", className: "bg-sky-50 text-sky-800" },
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-800" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-800" },
};

export function OrderStatusBadge({ status }: { status: FulfillmentStatus }) {
  const value = statusStyles[status];
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${value.className}`}>
      {value.label}
    </span>
  );
}
