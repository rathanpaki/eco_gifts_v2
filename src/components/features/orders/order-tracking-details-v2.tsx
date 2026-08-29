import { Check } from "lucide-react";
import type { Order } from "@/types/checkout";

export function Journey({ order }: { order: Order }) {
  const current = journeyIndex(order.fulfillmentStatus);
  const steps = [
    ["Order placed", order.createdAt],
    ["Personalization in production", "Expected to finish today"],
    ["Packed with care", "Next"],
    [order.delivery.name, "Tracking starts after dispatch"],
  ];
  return (
    <section className="min-h-[600px] rounded-[18px] bg-[var(--subtle)] p-6">
      <h2 className="serif text-[26px]">Journey to the recipient</h2>
      <ol className="mt-8 grid gap-7">
        {steps.map(([title, detail], index) => (
          <li className="flex items-center gap-4" key={title}>
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-full border text-sm font-semibold ${index < current ? "border-[var(--brand)] bg-[var(--brand)] text-white" : index === current ? "border-[var(--brand)] bg-[#eef4ee] text-[var(--brand)]" : "border-[var(--line)] text-[var(--muted)]"}`}
            >
              {index < current ? <Check size={16} /> : index + 1}
            </span>
            <span>
              <strong className="block text-sm">{title}</strong>
              <span className="mt-1 block text-xs text-[var(--muted)]">
                {detail === order.createdAt
                  ? new Date(detail).toLocaleDateString()
                  : detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function DetailCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <article className="min-h-[108px] rounded-2xl border border-[var(--line)] p-[18px]">
      <h2 className="serif text-lg">{title}</h2>
      <p className="mt-3 text-xs leading-4 text-[var(--muted)]">{children}</p>
    </article>
  );
}

export function trackingTitle(status: Order["fulfillmentStatus"]) {
  if (status === "delivered") return "Your gift has arrived";
  if (status === "shipped") return "Your gift is on the way";
  if (status === "processing") return "Making your gift";
  return "Preparing your gift";
}

function journeyIndex(status: Order["fulfillmentStatus"]) {
  if (status === "delivered" || status === "shipped") return 3;
  if (status === "processing") return 1;
  return 0;
}
