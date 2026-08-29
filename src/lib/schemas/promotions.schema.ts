import { z } from 'zod';

export const publicPromotionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  code: z.string().min(1),
  discountType: z.enum(['percentage', 'fixed', 'free_delivery']),
  discountValue: z.number().int().nonnegative(),
  minimumBasketCents: z.number().int().nonnegative(),
  endsAt: z.string().datetime(),
});
export const publicPromotionListSchema = z.array(publicPromotionSchema);
export const promotionDiscountSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  name: z.string().min(1),
  discountType: z.enum(['percentage', 'fixed', 'free_delivery']),
  amountCents: z.number().int().nonnegative(),
});