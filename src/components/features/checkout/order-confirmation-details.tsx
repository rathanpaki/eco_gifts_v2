import { Leaf } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { Order } from "@/types/checkout";

export function OrderFacts({ order }: { order: Order }) {
  const facts = [
    ["Delivery estimate", order.delivery.estimatedDays],
    ["Recipient", order.address.fullName],
    [
      order.paymentMethod === "demo_card" ? "Payment total" : "Total due",
      formatMoney(order.totalCents, order.currency),
    ],
    [
      "Payment",
      order.paymentMethod === "demo_card" ? "Card payment" : "Pay on delivery",
    ],
  ];
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map(([label, value]) => (
        <article
          className="rounded-[14px] bg-[var(--subtle)] p-[18px]"
          key={label}
        >
          <p className="text-xs text-[var(--muted)]">{label}</p>
          <p className="mt-2 text-sm font-semibold">{value}</p>
        </article>
      ))}
    </section>
  );
}

export function ImpactReceipt({ order }: { order: Order }) {
  const impact = [
    `${order.impact.plasticAvoidedGrams}g plastic avoided`,
    `${order.impact.co2SavedKg}kg estimated CO₂ saving`,
    order.ecoContribution?.treeId ? "1 tree supported" : null,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <article className="rounded-2xl bg-[var(--subtle)] p-5">
      <div className="flex items-center gap-2">
        <Leaf className="size-5 text-[var(--brand)]" />
        <h2 className="serif text-2xl">Your impact receipt</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{impact}</p>
    </article>
  );
}
