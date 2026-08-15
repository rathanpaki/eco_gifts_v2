"use client";

import { ArrowRight, CheckCircle2, Printer, Truck } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { Order } from "@/types/checkout";
import { OrderTrackingTimeline } from "@/components/features/orders/order-tracking-timeline";

interface OrderConfirmationViewProps {
  order: Order;
  onContinueShopping: () => void;
}

export function OrderConfirmationView({
  order,
  onContinueShopping,
}: OrderConfirmationViewProps) {
  return (
    <main className="mx-auto max-w-2xl space-y-6">
      <section className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-xs">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-10" strokeWidth={2.5} />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Order placed
        </p>
        <h1 className="mt-1 text-2xl font-black text-slate-900">
          Thank you for choosing thoughtfully
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Order{" "}
          <strong className="font-mono text-slate-700">
            {order.orderNumber}
          </strong>{" "}
          is awaiting fulfilment.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-emerald-900">
          <Truck className="mt-0.5 size-5 shrink-0" />
          <div>
            <h2 className="font-bold">Pay on delivery</h2>
            <p className="mt-1 text-xs leading-5">
              {formatMoney(order.totalCents, order.currency)} is due when your
              order arrives. Delivery estimate: {order.delivery.estimatedDays}.
            </p>
          </div>
        </div>
        <div className="mt-5 divide-y divide-slate-100">
          {order.items.map((item) => (
            <div
              className="flex justify-between gap-4 py-3 text-sm"
              key={item.itemId}
            >
              <div>
                <strong>{item.name}</strong>
                <p className="text-xs text-slate-500">
                  Quantity {item.quantity}
                  {item.customization ? " · Personalized" : ""}
                </p>
              </div>
              <span className="font-semibold">
                {formatMoney(item.lineTotalCents, order.currency)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-slate-200 pt-4 font-bold">
          <span>Total due</span>
          <span className="text-emerald-700">
            {formatMoney(order.totalCents, order.currency)}
          </span>
        </div>
        <address className="mt-5 border-t border-slate-100 pt-4 text-xs not-italic leading-5 text-slate-600">
          <strong className="text-slate-900">Deliver to</strong>
          <br />
          {order.address.fullName}
          <br />
          {order.address.addressLine1}
          {order.address.addressLine2 ? (
            <>
              <br />
              {order.address.addressLine2}
            </>
          ) : null}
          <br />
          {order.address.city}
          {order.address.region ? `, ${order.address.region}` : ""}{" "}
          {order.address.postalCode}
          <br />
          {order.address.countryCode}
        </address>
        <OrderTrackingTimeline
          current={order.fulfillmentStatus}
          history={order.history}
        />
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 text-sm font-semibold"
        >
          <Printer size={16} />
          Print order
        </button>
        <button
          type="button"
          onClick={onContinueShopping}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-semibold text-white"
        >
          Continue shopping <ArrowRight size={16} />
        </button>
      </div>
    </main>
  );
}
