import type { Metadata } from "next";
import { AdminSettingsPage } from "@/components/features/admin-settings/admin-settings-page";

export const metadata: Metadata = {
  title: "Store settings | EcoGifts Admin",
};

export default function AdminSettingsRoute() {
  return <AdminSettingsPage />;
}
