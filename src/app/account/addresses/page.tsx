import type { Metadata } from "next";
import { ProfileAddressesPage } from "@/components/features/profile/profile-addresses-page";

export const metadata: Metadata = { title: "Saved addresses | EcoGifts" };

export default function AccountAddressesRoute() {
  return <ProfileAddressesPage />;
}