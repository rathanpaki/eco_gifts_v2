import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().min(1),
});

export const cartItemSchema = z.object({
  itemId: z.string().min(1).max(128),
  productId: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  image: imageSchema.nullable(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().regex(/^[A-Z]{3}$/),
  quantity: z.number().int().min(1).max(99),
  lineTotalCents: z.number().int().nonnegative(),
  stockQuantity: z.number().int().nonnegative(),
  available: z.boolean(),
  exceedsStock: z.boolean(),
  personalizationAvailable: z.boolean(),
  ecoScore: z.number().int().min(0).max(100),
  customization: z
    .object({
      id: z.string().min(1).max(128),
      previewPath: z
        .string()
        .regex(/^\/api\/customizations\/[A-Za-z0-9_-]+\/preview$/),
    })
    .nullable(),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema).max(50),
  totalQuantity: z.number().int().nonnegative(),
  subtotalCents: z.number().int().nonnegative(),
  currency: z.string().regex(/^[A-Z]{3}$/).nullable(),
  readyForCheckout: z.boolean(),
  updatedAt: z.string().datetime().nullable(),
});
