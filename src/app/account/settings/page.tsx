import type { Metadata } from "next";
import { AccountSettingsPage } from "@/components/features/profile/account-settings-page";

export const metadata: Metadata = { title: "Profile settings | EcoGifts" };

export default function AccountSettingsRoute() {
  return <AccountSettingsPage />;
}