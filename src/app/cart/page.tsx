import type { Metadata } from "next";
import { CartPage } from "@/components/features/cart/cart-page";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { getFeaturedProducts } from "@/services/catalog.service";

export const metadata: Metadata = {
  title: "Your bag | EcoGifts",
  description: "Review the gifts saved in your EcoGifts shopping bag.",
};

export default async function CartRoute() {
  const suggestions = await getFeaturedProducts();
  return (
    <>
      <StorefrontHeader />
      <CartPage suggestions={suggestions} />
    </>
  );
}
