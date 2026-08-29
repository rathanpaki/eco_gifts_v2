import { OrderDetailPage } from "@/components/features/orders/order-detail-page-v2";

export default async function AccountOrderDetailRoute({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <OrderDetailPage orderId={orderId} />;
}
