import type { ProductOccasion } from "./product-occasion";

export type CatalogSort =
  "featured" | "newest" | "price-asc" | "price-desc" | "name-asc";

export interface PublicProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface PublicProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  occasions: ProductOccasion[];
  priceCents: number;
  currency: string;
  stockQuantity: number;
  inStock: boolean;
  lowStock: boolean;
  personalizationAvailable: boolean;
  ecoScore: number;
  ecoEvidence: {
    materialsVerified: boolean;
    packagingVerified: boolean;
    contributionVerified: boolean;
  };
  images: PublicProductImage[];
  featuredRank: number | null;
  createdAt: string;
  updatedAt: string;
  savedCustomization?: { id: string; previewPath: string } | null;
}

export interface PublicProductPage {
  items: PublicProduct[];
  nextCursor: string | null;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PublicProductQuery {
  search?: string;
  category?: string;
  occasion?: ProductOccasion;
  minPriceCents?: number;
  maxPriceCents?: number;
  personalizable?: boolean;
  sort?: CatalogSort;
  cursor?: string;
  page?: number;
  limit?: number;
}

export type Product = PublicProduct;

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}
