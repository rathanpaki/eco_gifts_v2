import { formatMoney } from '@/lib/format-money';
import type { PublicPromotion } from '@/types/promotions';

export function promotionCopy(promotion: PublicPromotion): string {
  const benefit = promotion.discountType === 'percentage'
    ? `${promotion.discountValue}% off`
    : promotion.discountType === 'fixed'
      ? `${formatMoney(promotion.discountValue, 'USD')} off`
      : 'Free delivery';
  const minimum = promotion.minimumBasketCents ? ` when you spend ${formatMoney(promotion.minimumBasketCents, 'USD')}` : '';
  return `${promotion.name} · ${benefit}${minimum}`;
}