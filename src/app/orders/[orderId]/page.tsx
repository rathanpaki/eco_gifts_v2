import type { Metadata } from "next";
import { OrderPage } from "@/components/features/orders/order-page";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { requireUserSession } from "@/services/server-api";

export const metadata: Metadata = {
  title: "Order | EcoGifts",
  description: "Review your EcoGifts order status and delivery details.",
};

export default async function OrderRoute({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const user = await requireUserSession(`/orders/${orderId}`);
  return <><StorefrontHeader /><OrderPage orderId={orderId} userId={user.uid} /></>;
}
