export type CatalogSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc";

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
}

export interface PublicProductPage {
  items: PublicProduct[];
  nextCursor: string | null;
}

export interface PublicProductQuery {
  search?: string;
  category?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  personalizable?: boolean;
  sort?: CatalogSort;
  cursor?: string;
  limit?: number;
}

export type Product = PublicProduct;

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}
