import type { Metadata } from "next";
import { FaqPage } from "@/components/features/faq/faq-page";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

export const metadata: Metadata = {
  title: "Frequently asked questions | EcoGifts",
};

export default async function FaqRoute({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const query = await searchParams;
  const initialSearch = typeof query.search === "string" ? query.search : "";
  return (
    <>
      <StorefrontHeader />
      <FaqPage initialSearch={initialSearch} />
    </>
  );
}
