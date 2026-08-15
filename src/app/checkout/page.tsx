import type { Metadata } from "next";
import { CheckoutPage } from "@/components/features/checkout/checkout-page";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

export const metadata: Metadata = {
  title: "Checkout | EcoGifts",
  description: "Review delivery choices and place your EcoGifts order.",
};

export default function CheckoutRoute() {
  return <><StorefrontHeader /><CheckoutPage /></>;
}
