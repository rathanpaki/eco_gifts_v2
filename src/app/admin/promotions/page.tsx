import type { Metadata } from "next";
import { AdminPromotionsPage } from "@/components/features/admin-promotions/admin-promotions-page";

export const metadata: Metadata = {
  title: "Promotions | EcoGifts Admin",
};

export default function AdminPromotionsRoute() {
  return <AdminPromotionsPage />;
}
