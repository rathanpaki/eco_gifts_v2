import "server-only";

import { z } from "zod";
import type {
  PublicProduct,
  PublicProductPage,
  PublicProductQuery,
} from "@/types/catalog";

const apiBaseUrl = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000"
).replace(/\/$/, "");

const countSchema = z.number().int().nonnegative();
const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string(),
  description: z.string(),
  category: z.string(),
  priceCents: countSchema,
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
  images: z.array(z.object({
    id: z.string().min(1),
    url: z.url(),
    alt: z.string().min(1),
  })),
  featuredRank: countSchema.nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const pageSchema = z.object({
  items: z.array(productSchema),
  nextCursor: z.string().min(1).nullable(),
});

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
  const result = pageSchema.safeParse(await response.json());
  if (!result.success) throw new CatalogApiError();
  return result.data;
}

export async function getPublicProductBySlug(
  slug: string,
): Promise<PublicProduct | null> {
  const response = await catalogFetch(`/products/${encodeURIComponent(slug)}`);
  if (response.status === 404) return null;
  const result = productSchema.safeParse(await response.json());
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
  for (const key of ["search", "category", "sort", "cursor"] as const) {
    const value = query[key];
    if (value) params.set(key, value);
  }
  for (const key of ["minPriceCents", "maxPriceCents", "limit"] as const) {
    const value = query[key];
    if (value !== undefined) params.set(key, String(value));
  }
  if (query.personalizable !== undefined) {
    params.set("personalizable", String(query.personalizable));
  }
  return params.toString();
}
