import type { Metadata } from "next";
import { CartPage } from "@/components/features/cart/cart-page";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

export const metadata: Metadata = {
  title: "Your bag | EcoGifts",
  description: "Review the gifts saved in your EcoGifts shopping bag.",
};

export default function CartRoute() {
  return <><StorefrontHeader /><CartPage /></>;
}
