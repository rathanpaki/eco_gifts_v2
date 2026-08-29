"use client";

import Link from "next/link";
import { useAccountSession } from "@/components/providers/account-session-provider";
import { useOrder, useOrderDeliveryConfirmation } from "@/hooks/use-order";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { DeliveryConfirmationCard } from "./delivery-confirmation-card";
import { OrderReviewSection } from "./order-review-section";
import {
  DeliveryDetails,
  DeliveryProgress,
  GiftDetails,
} from "./order-detail-sections-v2";

export function OrderDetailPage({ orderId }: { orderId: string }) {
  const user = useAccountSession();
  const order = useOrder(orderId, user.uid);
  const confirmation = useOrderDeliveryConfirmation(orderId, user.uid);
  if (order.isLoading)
    return <LogoDrawLoader label="Loading order details" />;
  if (order.isError || !order.data)
    return (
      <p className="rounded-2xl border border-red-200 p-6 text-sm text-red-700">
        This order could not be loaded.
      </p>
    );
  const data = order.data;
  return (
    <section aria-labelledby="order-detail-title">
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between sm:gap-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--brand)]">
            Order {data.orderNumber}
          </p>
          <h1
            id="order-detail-title"
            className="serif mt-4 text-[34px] leading-[0.98] sm:text-[40px]"
          >
            Track, manage, or resolve this gift
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Placed {new Date(data.createdAt).toLocaleDateString()} ·{" "}
            {data.delivery.estimatedDays}
          </p>
        </div>
        <span className="w-fit rounded-full bg-[#eef4ee] px-4 py-2 text-xs font-semibold text-[var(--brand)]">
          ● {data.fulfillmentStatus.replaceAll("_", " ")}
        </span>
      </header>

      <DeliveryProgress order={data} />
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_368px]">
        <GiftDetails order={data} />
        <DeliveryDetails order={data} />
      </div>
      <IssuePanel />
      {data.deliveryConfirmationStatus !== "not_ready" ? (
        <div className="mt-6">
          <DeliveryConfirmationCard
            confirmedAt={data.deliveryConfirmedAt}
            error={confirmation.error?.message}
            onConfirm={() => confirmation.mutate()}
            pending={confirmation.isPending}
            status={data.deliveryConfirmationStatus}
          />
        </div>
      ) : null}
      {data.deliveryConfirmationStatus === "confirmed" ? (
        <OrderReviewSection orderId={data.id} items={data.items} />
      ) : null}
    </section>
  );
}

function IssuePanel() {
  return (
    <section className="mt-6 rounded-[18px] bg-[#252a26] p-6 text-white">
      <p className="text-[10px] font-semibold uppercase">Need help?</p>
      <h2 className="serif mt-4 text-[26px]">
        Resolve an issue without starting over
      </h2>
      <p className="mt-3 max-w-2xl text-xs leading-5 text-white/80">
        Report damage, change the delivery note, or contact support. Your order
        context is attached automatically.
      </p>
      <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {["Delivery issue", "Item arrived damaged", "Something else"].map(
          (label) => (
            <Link
              href={"/help?topic=" + encodeURIComponent(label)}
              key={label}
              className="flex h-10 items-center justify-center rounded-full bg-white px-5 text-xs text-[var(--ink)]"
            >
              {label}
            </Link>
          ),
        )}
        <Link
          href="/help#order-support"
          className="flex h-11 w-full items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[var(--brand)] sm:ml-auto sm:w-auto sm:min-w-44"
        >
          Start a request
        </Link>
      </div>
    </section>
  );
}
