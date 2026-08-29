import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/format-money";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { Order } from "@/types/checkout";

export function DeliveryProgress({ order }: { order: Order }) {
  const active = progressIndex(order.fulfillmentStatus);
  const steps = [
    "Ordered",
    "Packed",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];
  return (
    <section className="mt-7 rounded-[18px] border border-[var(--line)] bg-white p-6">
      <div className="flex justify-between gap-4">
        <h2 className="text-xl font-semibold">Delivery progress</h2>
        <p className="text-xs text-[var(--muted)]">{order.delivery.name}</p>
      </div>
      <ol className="relative mt-10 grid grid-cols-5">
        <span className="absolute left-[5%] right-[5%] top-2 h-[3px] bg-[var(--line)]" />
        <span
          className="absolute left-[5%] top-2 h-[3px] bg-[var(--brand)]"
          style={{ width: Math.max(0, active) * 22.5 + "%" }}
        />
        {steps.map((step, index) => (
          <li className="relative z-10 text-center" key={step}>
            <span
              className={
                "mx-auto block size-4 rounded-full border " +
                (index <= active
                  ? "border-[var(--brand)] bg-[var(--brand)]"
                  : "border-[#b5c9b6] bg-white")
              }
            />
            <strong className="mt-5 block text-xs font-semibold">{step}</strong>
            <span className="mt-2 block text-[11px] text-[var(--muted)]">
              {index < active
                ? "Complete"
                : index === active
                  ? "Current"
                  : "Pending"}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function GiftDetails({ order }: { order: Order }) {
  const item = order.items[0];
  return (
    <section className="rounded-[18px] border border-[var(--line)] bg-white p-6">
      <h2 className="text-xl font-semibold">Gift details</h2>
      {item ? (
        <div className="mt-5 flex items-center gap-5">
          <div className="relative size-[110px] shrink-0 overflow-hidden rounded-2xl bg-[var(--subtle)]">
            {item.image ? (
              <Image
                alt={item.image.alt}
                fill
                sizes="110px"
                src={item.image.url}
                unoptimized={shouldBypassImageOptimization(item.image.url)}
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {item.customization?.text
                ? "Personalized · " + item.customization.text
                : "Quantity " + item.quantity}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {order.packaging.name}
            </p>
          </div>
          <strong>{formatMoney(item.lineTotalCents, order.currency)}</strong>
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
        <p className="text-xs text-[var(--brand)]">
          {order.impact.plasticAvoidedGrams}g plastic avoided ·{" "}
          {order.impact.co2SavedKg}kg CO₂e estimate
        </p>
        {item ? (
          <Link
            href={"/shop/" + item.slug}
            className="flex h-11 items-center rounded-xl border border-[#b5c9b6] px-5 text-xs font-semibold text-[var(--brand)]"
          >
            View gift details
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function DeliveryDetails({ order }: { order: Order }) {
  return (
    <aside className="rounded-[18px] border border-[var(--line)] p-6">
      <h2 className="text-xl font-semibold">Delivery details</h2>
      <p className="mt-6 text-[10px] font-semibold uppercase text-[var(--muted)]">
        Delivering to
      </p>
      <address className="mt-3 text-sm not-italic leading-5">
        {order.address.fullName}
        <br />
        {order.address.addressLine1}
        <br />
        {order.address.city} {order.address.postalCode}
      </address>
      <div className="mt-5 border-t border-[var(--line)] pt-5">
        <p className="text-[10px] font-semibold uppercase text-[var(--muted)]">
          Payment
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {order.paymentMethod === "demo_card"
            ? "Card payment"
            : "Pay on delivery"}{" "}
          · {formatMoney(order.totalCents, order.currency)}
        </p>
      </div>
    </aside>
  );
}

function progressIndex(status: Order["fulfillmentStatus"]) {
  if (status === "delivered") return 4;
  if (status === "shipped") return 3;
  if (status === "processing") return 1;
  return 0;
}
