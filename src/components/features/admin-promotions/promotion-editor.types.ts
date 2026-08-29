import type {
  PromotionDiscountType,
  PromotionScope,
} from "@/types/admin-promotions";

export interface PromotionDraft {
  name: string;
  code: string;
  discountType: PromotionDiscountType;
  discountValue: string;
  minimumBasket: string;
  appliesTo: PromotionScope;
  eligibleIds: string;
  startsAt: string;
  endsAt: string;
}
