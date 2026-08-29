import { z } from "zod";

const promotionSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  code: z.string(),
  discountType: z.enum(["percentage", "fixed", "free_delivery"]),
  discountValue: z.number().int().nonnegative(),
  minimumBasketCents: z.number().int().nonnegative(),
  appliesTo: z.enum(["all", "collections", "products"]),
  eligibleIds: z.array(z.string()),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  status: z.enum(["draft", "scheduled", "active", "ended"]),
  redemptions: z.number().int().nonnegative(),
  attributedRevenueCents: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const adminPromotionSchema = promotionSchema;
export const adminPromotionPageSchema = z.object({
  items: z.array(promotionSchema),
  metrics: z.object({
    activeCount: z.number().int().nonnegative(),
    attributedRevenueCents: z.number().int().nonnegative(),
    averageDiscountPercent: z.number().nonnegative(),
  }),
});
