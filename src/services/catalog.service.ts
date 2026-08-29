import "server-only";

import {
  publicProductPageSchema,
  publicProductSchema,
} from "@/lib/schemas/catalog.schema";
import type {
  PublicProduct,
  PublicProductPage,
  PublicProductQuery,
} from "@/types/catalog";
import { productReviewFeedSchema } from "@/lib/schemas/product-review.schema";
import type { ProductReviewFeed } from "@/types/product-review";

const apiBaseUrl = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000"
).replace(/\/$/, "");

export class CatalogApiError extends Error {
  constructor(message = "The gift collection is temporarily unavailable.") {
    super(message);
    this.name = "CatalogApiError";
  }
}

export async function getPublicProducts(
  query: PublicProductQuery = {},
): Promise<PublicProductPage> {
  const response = await catalogFetch(`/products?${toQueryString(query)}`);
  const result = publicProductPageSchema.safeParse(await response.json());
  if (!result.success) throw new CatalogApiError();
  return result.data;
}

export async function getPublicProductBySlug(
  slug: string,
): Promise<PublicProduct | null> {
  const response = await catalogFetch(`/products/${encodeURIComponent(slug)}`);
  if (response.status === 404) return null;
  const result = publicProductSchema.safeParse(await response.json());
  if (!result.success) throw new CatalogApiError();
  return result.data;
}

export async function getFeaturedProducts(): Promise<PublicProduct[]> {
  try {
    return (await getPublicProducts({ sort: "featured", limit: 4 })).items;
  } catch {
    return [];
  }
}

export async function getPublicProductReviews(
  productId: string,
): Promise<ProductReviewFeed> {
  try {
    const response = await catalogFetch(
      `/product-reviews/product/${encodeURIComponent(productId)}?limit=12`,
    );
    const result = productReviewFeedSchema.safeParse(await response.json());
    return result.success ? result.data : emptyReviews();
  } catch {
    return emptyReviews();
  }
}

async function catalogFetch(path: string): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/api${path}`, {
      cache: "no-store",
    });
  } catch {
    throw new CatalogApiError();
  }
  if (!response.ok && response.status !== 404) throw new CatalogApiError();
  return response;
}

function toQueryString(query: PublicProductQuery): string {
  const params = new URLSearchParams();
  for (const key of [
    "search",
    "category",
    "occasion",
    "sort",
    "cursor",
  ] as const) {
    const value = query[key];
    if (value) params.set(key, value);
  }
  for (const key of ["minPriceCents", "maxPriceCents", "page", "limit"] as const) {
    const value = query[key];
    if (value !== undefined) params.set(key, String(value));
  }
  if (query.personalizable !== undefined) {
    params.set("personalizable", String(query.personalizable));
  }
  return params.toString();
}

function emptyReviews(): ProductReviewFeed {
  return { items: [], averageRating: 0, totalReviews: 0 };
}
