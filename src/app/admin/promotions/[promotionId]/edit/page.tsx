import type { Metadata } from "next";
import { PromotionEditPage } from "@/components/features/admin-promotions/promotion-edit-page";

export const metadata: Metadata = {
  title: "Edit promotion | EcoGifts Admin",
};

export default async function EditPromotionRoute({
  params,
}: {
  params: Promise<{ promotionId: string }>;
}) {
  const { promotionId } = await params;
  return <PromotionEditPage id={promotionId} />;
}
