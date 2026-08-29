import { z } from "zod";
import { productOccasionValues } from "@/types/product-occasion";

const countSchema = z.number().int().nonnegative();

export const publicProductSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string(),
  description: z.string(),
  category: z.string(),
  priceCents: countSchema,
  occasions: z.array(z.enum(productOccasionValues)),
  currency: z.string().length(3),
  stockQuantity: countSchema,
  inStock: z.boolean(),
  lowStock: z.boolean(),
  personalizationAvailable: z.boolean(),
  ecoScore: z.number().int().min(0).max(100),
  ecoEvidence: z.object({
    materialsVerified: z.boolean(),
    packagingVerified: z.boolean(),
    contributionVerified: z.boolean(),
  }),
  images: z.array(
    z.object({
      id: z.string().min(1),
      url: z.url(),
      alt: z.string().min(1),
    }),
  ),
  featuredRank: countSchema.nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  savedCustomization: z.object({ id: z.string().min(1), previewPath: z.string().regex(/^\/api\/customizations\/[A-Za-z0-9_-]+\/preview$/) }).nullable().optional(),
});

export const publicProductPageSchema = z.object({
  items: z.array(publicProductSchema),
  nextCursor: z.string().min(1).nullable(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalItems: countSchema,
  totalPages: countSchema,
});

export const publicProductListSchema = z.array(publicProductSchema);
