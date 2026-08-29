import type { Metadata } from "next";
import { SupportPage } from "@/components/features/support/support-page-v2";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

export const metadata: Metadata = {
  title: "Help Centre | EcoGifts",
  description:
    "Find help with EcoGifts orders, personalization, delivery, and impact.",
};

export default function HelpPage() {
  return (
    <>
      <StorefrontHeader />
      <SupportPage />
    </>
  );
}
