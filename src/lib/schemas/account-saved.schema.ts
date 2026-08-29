import { z } from "zod";

export const giftProfileSchema = z.object({
  id: z.string().min(1),
  recipientName: z.string(),
  relationship: z.string(),
  occasion: z.string(),
  importantDate: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const giftProfileListSchema = z.array(giftProfileSchema);

export const savedPaymentMethodSchema = z.object({
  id: z.string().min(1),
  cardholderName: z.string(),
  brand: z.enum(["visa", "mastercard", "card"]),
  lastFour: z.string().regex(/^\d{4}$/),
  expiryMonth: z.number().int().min(1).max(12),
  expiryYear: z.number().int(),
  primary: z.boolean(),
  createdAt: z.string().datetime(),
});
export const savedPaymentMethodListSchema = z.array(savedPaymentMethodSchema);