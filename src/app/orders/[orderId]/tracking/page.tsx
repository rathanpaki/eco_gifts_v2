import type { Metadata } from "next";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { OrderTrackingPage } from "@/components/features/orders/order-tracking-page-v2";
import { requireUserSession } from "@/services/server-api";

export const metadata: Metadata = {
  title: "Track order | EcoGifts",
  description: "Follow your EcoGifts order from production to delivery.",
};

export default async function TrackingRoute({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const user = await requireUserSession(`/orders/${orderId}/tracking`);
  return (
    <>
      <StorefrontHeader />
      <OrderTrackingPage orderId={orderId} userId={user.uid} />
    </>
  );
}
