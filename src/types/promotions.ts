import type { PromotionDiscountType } from './admin-promotions';

export interface PublicPromotion {
  id: string;
  name: string;
  code: string;
  discountType: PromotionDiscountType;
  discountValue: number;
  minimumBasketCents: number;
  endsAt: string;
}
export interface PromotionDiscount {
  id: string;
  code: string;
  name: string;
  discountType: PromotionDiscountType;
  amountCents: number;
}