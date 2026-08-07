import type { Metadata } from "next";
import { CatalogPage } from "@/components/features/catalog/catalog-page";
import type { ShopSearchParams } from "@/components/features/catalog/catalog-query";

export const metadata: Metadata = {
  title: "Shop Sustainable Gifts | EcoGifts",
  description: "Explore live EcoGifts products with transparent eco details, pricing, and availability.",
};

export default function ShopPage({ searchParams }: { searchParams: Promise<ShopSearchParams> }) {
  return <CatalogPage searchParams={searchParams} />;
}
