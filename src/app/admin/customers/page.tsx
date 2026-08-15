import type { Metadata } from "next";
import { AdminCustomersPage } from "@/components/features/admin-customers/admin-customers-page";

export const metadata: Metadata = {
  title: "Customers | EcoGifts Admin",
  description: "Review live customer commerce and consent records.",
};

export default function AdminCustomersRoute() {
  return <AdminCustomersPage />;
}
