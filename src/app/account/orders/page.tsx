import type { Metadata } from "next";
import { OrderHistoryPage } from "@/components/features/orders/order-history-page";

export const metadata: Metadata = {
  title: "Your orders | EcoGifts",
  description: "Track your EcoGifts orders and environmental impact.",
};

export default function AccountOrdersPage() {
  return <OrderHistoryPage />;
}
