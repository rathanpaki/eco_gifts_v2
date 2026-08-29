import type { Metadata } from "next";
import { GiftProfilesPage } from "@/components/features/gift-profiles/gift-profiles-page";

export const metadata: Metadata = { title: "Gift profiles | EcoGifts" };

export default function GiftProfilesRoute() {
  return <GiftProfilesPage />;
}