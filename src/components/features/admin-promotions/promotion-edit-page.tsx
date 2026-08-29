"use client";

import { useAdminPromotion } from "@/hooks/use-admin-promotions";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { PromotionEditorPage } from "./promotion-editor-page";

export function PromotionEditPage({ id }: { id: string }) {
  const promotion = useAdminPromotion(id);
  if (promotion.isPending) {
    return <LogoDrawLoader label="Loading promotion" />;
  }
  if (promotion.error || !promotion.data) {
    return (
      <section className="min-h-screen bg-[#f2efe7] px-4 py-8 sm:px-6 lg:px-12">
        <p className="rounded-2xl bg-red-50 p-5 text-sm text-red-800">
          {promotion.error?.message ?? "Promotion not found."}
        </p>
      </section>
    );
  }
  return <PromotionEditorPage promotion={promotion.data} />;
}
