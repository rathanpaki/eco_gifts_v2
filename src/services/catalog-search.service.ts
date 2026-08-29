"use client";

import { publicProductPageSchema } from "@/lib/schemas/catalog.schema";
import { clientApiBaseUrl } from "./client-api";
import type { PublicProduct } from "@/types/catalog";

export async function searchPublicProducts(
  search: string,
  signal?: AbortSignal,
): Promise<PublicProduct[]> {
  const query = new URLSearchParams({
    search,
    sort: "newest",
    page: "1",
    limit: "5",
  });
  const response = await fetch(
    `${clientApiBaseUrl}/api/products?${query.toString()}`,
    { cache: "no-store", signal },
  );
  if (!response.ok) throw new Error("Search is temporarily unavailable.");
  return publicProductPageSchema.parse(await response.json()).items;
}
