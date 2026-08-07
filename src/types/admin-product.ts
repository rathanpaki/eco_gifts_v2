import type { z } from "zod";
import type {
  adminProductPageSchema,
  adminProductSchema,
  productFormSchema,
} from "@/lib/schemas/admin-product.schema";

export type AdminProduct = z.infer<typeof adminProductSchema>;
export type AdminProductPage = z.infer<typeof adminProductPageSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductStatus = AdminProduct["status"];

export type ProductWritePayload = {
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  sku: string;
  priceCents: number;
  currency: string;
  stockQuantity: number;
  lowStockThreshold: number;
  ecoScore: number;
  personalizationAvailable: boolean;
  materialsVerified: boolean;
  packagingVerified: boolean;
  contributionVerified: boolean;
  status: "active" | "draft";
};
