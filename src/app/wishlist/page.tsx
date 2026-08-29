import type { Metadata } from "next";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { WishlistPage } from "@/components/features/wishlist/wishlist-page-v2";
import { requireUserSession } from "@/services/server-api";

export const metadata: Metadata = {
  title: "Wishlist | EcoGifts",
  description: "Your saved sustainable gifts.",
};

export default async function WishlistRoute() {
  await requireUserSession("/wishlist");
  return (
    <>
      <StorefrontHeader />
      <WishlistPage />
    </>
  );
}
