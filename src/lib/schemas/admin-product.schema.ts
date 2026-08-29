import { z } from "zod";
import { productOccasionValues } from "@/types/product-occasion";

export const productStatusSchema = z.enum(["active", "draft", "archived"]);
const count = z.number().int().nonnegative();
const imageSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
  storagePath: z.string(),
  alt: z.string().min(1),
});

export const adminProductSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string(),
  description: z.string(),
  category: z.string(),
  occasions: z.array(z.enum(productOccasionValues)),
  sku: z.string().min(1),
  priceCents: count,
  currency: z.string().length(3),
  stockQuantity: count,
  lowStockThreshold: count,
  lowStock: z.boolean(),
  personalizationAvailable: z.boolean(),
  ecoScore: z.number().int().min(0).max(100),
  ecoEvidence: z.object({
    materialsVerified: z.boolean(),
    packagingVerified: z.boolean(),
    contributionVerified: z.boolean(),
  }),
  ecoEvidenceComplete: z.boolean(),
  images: z.array(imageSchema),
  status: productStatusSchema,
  featuredRank: count.nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const adminProductPageSchema = z.object({
  items: z.array(adminProductSchema),
  metrics: z.object({
    active: count,
    lowStock: count,
    drafts: count,
    missingEcoEvidence: count,
  }),
  nextCursor: z.string().min(1).nullable(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalItems: count,
  totalPages: count,
});

export const productFormSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    shortDescription: z.string().trim().min(2).max(160),
    description: z.string().trim().min(1).max(2000),
    category: z.string().trim().min(2).max(80),
    occasions: z.array(z.enum(productOccasionValues)).max(3),
    sku: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z0-9][A-Z0-9_-]{2,63}$/),
    price: z.string().regex(/^\d{1,8}(\.\d{1,2})?$/, "Enter a valid price."),
    currency: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{3}$/),
    stockQuantity: z.string().regex(/^\d{1,7}$/),
    lowStockThreshold: z.string().regex(/^\d{1,7}$/),
    ecoScore: z.string().regex(/^\d{1,3}$/),
    personalizationAvailable: z.boolean(),
    materialsVerified: z.boolean(),
    packagingVerified: z.boolean(),
    contributionVerified: z.boolean(),
  })
  .superRefine((values, context) => {
    if (Number(values.ecoScore) > 100) {
      context.addIssue({
        code: "custom",
        path: ["ecoScore"],
        message: "Eco score cannot exceed 100.",
      });
    }
    if (Number(values.stockQuantity) > 1_000_000) {
      context.addIssue({
        code: "custom",
        path: ["stockQuantity"],
        message: "Inventory is too large.",
      });
    }
    if (Number(values.lowStockThreshold) > 1_000_000) {
      context.addIssue({
        code: "custom",
        path: ["lowStockThreshold"],
        message: "Low-stock threshold is too large.",
      });
    }
  });
