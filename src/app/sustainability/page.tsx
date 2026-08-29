import type { Metadata } from "next";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { SustainabilityPage } from "@/components/features/sustainability/sustainability-page";

export const metadata: Metadata = {
  title: "Our impact | EcoGifts",
  description:
    "Inspect EcoGifts impact metrics, methods, and partner projects.",
};

export default function SustainabilityRoute() {
  return (
    <>
      <StorefrontHeader />
      <SustainabilityPage />
    </>
  );
}
