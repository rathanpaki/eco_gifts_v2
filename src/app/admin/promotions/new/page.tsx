import type { Metadata } from "next";
import { PromotionEditorPage } from "@/components/features/admin-promotions/promotion-editor-page";

export const metadata: Metadata = {
  title: "Create promotion | EcoGifts Admin",
};

export default function CreatePromotionRoute() {
  return <PromotionEditorPage />;
}
