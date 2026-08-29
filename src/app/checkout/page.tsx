import type { Metadata } from "next";
import { CheckoutPage } from "@/components/features/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Checkout | EcoGifts",
  description: "Review delivery choices and place your EcoGifts order.",
};

export default async function CheckoutRoute(props: {
  searchParams: Promise<{ promoCode?: string | string[] }>;
}) {
  const query = await props.searchParams;
  const value = Array.isArray(query.promoCode) ? query.promoCode[0] : query.promoCode;
  const promoCode = value && /^[A-Za-z0-9_-]{3,24}$/.test(value) ? value.toUpperCase() : undefined;
  return <CheckoutPage initialPromoCode={promoCode} />;
}