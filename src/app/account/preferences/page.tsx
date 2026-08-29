import type { Metadata } from "next";
import { GiftPreferencesPage } from "@/components/features/preferences/gift-preferences-page";

export const metadata: Metadata = {
  title: "Gift preferences | EcoGifts",
};

export default function GiftPreferencesRoute() {
  return <GiftPreferencesPage />;
}
