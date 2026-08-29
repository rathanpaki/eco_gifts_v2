"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrder, useOrderDeliveryConfirmation } from "@/hooks/use-order";
import { OrderConfirmationView } from "@/components/features/checkout/order-confirmation-view-v2";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { OrderReviewSection } from "./order-review-section";

export function OrderPage({
  orderId,
  userId,
}: {
  orderId: string;
  userId: string;
}) {
  const router = useRouter();
  const order = useOrder(orderId, userId);
  const confirmation = useOrderDeliveryConfirmation(orderId, userId);
  if (order.isLoading) {
    return <LogoDrawLoader className="bg-slate-50" label="Loading your order" size="page" />;
  }
  if (order.isError || !order.data) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-slate-50 px-5">
        <section className="max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center">
          <h1 className="text-xl font-bold">Order unavailable</h1>
          <p className="mt-2 text-sm text-slate-600">
            {order.error?.message ?? "This order could not be loaded."}
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => void order.refetch()}
              className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
            <Link
              href="/shop"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
            >
              Shop
            </Link>
          </div>
        </section>
      </main>
    );
  }
  return (
    <>
      <OrderConfirmationView
        order={order.data}
        onContinueShopping={() => router.push("/shop")}
        onConfirmDelivery={() => confirmation.mutate()}
        confirmationPending={confirmation.isPending}
        confirmationError={confirmation.error?.message}
      />
      {order.data.deliveryConfirmationStatus === "confirmed" ? (
        <div className="bg-[var(--page)] px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-[1200px]">
            <OrderReviewSection
              orderId={order.data.id}
              items={order.data.items}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
