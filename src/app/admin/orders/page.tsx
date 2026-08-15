import type { Metadata } from "next";
import { AdminOrdersPage } from "@/components/features/admin-orders/admin-orders-page";

export const metadata: Metadata = {
  title: "Orders | EcoGifts Admin",
  description: "Review and fulfill live EcoGifts orders.",
};

export default function AdminOrdersRoute() {
  return <AdminOrdersPage />;
}
