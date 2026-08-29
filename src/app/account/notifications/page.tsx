import type { Metadata } from "next";
import { NotificationsPage } from "@/components/features/notifications/notifications-page";

export const metadata: Metadata = {
  title: "Notifications | EcoGifts",
};

export default function NotificationsRoute() {
  return <NotificationsPage />;
}
