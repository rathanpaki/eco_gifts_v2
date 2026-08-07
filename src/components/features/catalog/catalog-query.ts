import { z } from "zod";
import type { PublicProductQuery } from "@/types/catalog";

export type ShopSearchParams = Record<string, string | string[] | undefined>;

const firstString = (value: unknown) => Array.isArray(value) ? value[0] : value;
const optionalText = (maximum: number) => z.preprocess(
  firstString,
  z.string().trim().max(maximum).transform((value) => value || undefined).optional(),
);
const optionalInteger = z.preprocess(
  firstString,
  z.coerce.number().int().nonnegative().max(100_000_000).optional(),
);
const querySchema = z.object({
  search: optionalText(80),
  category: optionalText(80),
  minPriceCents: optionalInteger,
  maxPriceCents: optionalInteger,
  personalizable: z.preprocess(firstString, z.enum(["true", "false"]).optional()),
  sort: z.preprocess(
    firstString,
    z.enum(["featured", "newest", "price-asc", "price-desc", "name-asc"]).default("featured"),
  ),
  cursor: optionalText(500),
});

export function parseCatalogQuery(params: ShopSearchParams): PublicProductQuery {
  const result = querySchema.safeParse(params);
  if (!result.success) return { sort: "featured", limit: 12 };
  return normalizeCatalogQuery({
    ...result.data,
    personalizable: result.data.personalizable === undefined
      ? undefined
      : result.data.personalizable === "true",
    limit: 12,
  });
}

export function shopHref(
  current: PublicProductQuery,
  changes: Partial<PublicProductQuery>,
): string {
  const next = normalizeCatalogQuery({ ...current, ...changes, cursor: changes.cursor });
  const params = new URLSearchParams();
  for (const key of ["search", "category", "sort", "cursor"] as const) {
    const value = next[key];
    if (value) params.set(key, value);
  }
  for (const key of ["minPriceCents", "maxPriceCents"] as const) {
    const value = next[key];
    if (value !== undefined) params.set(key, String(value));
  }
  if (next.personalizable !== undefined) {
    params.set("personalizable", String(next.personalizable));
  }
  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}

export function normalizeCatalogQuery(query: PublicProductQuery): PublicProductQuery {
  const next = { ...query };
  const hasPrice = next.minPriceCents !== undefined || next.maxPriceCents !== undefined;
  const hasFacet = Boolean(next.search || next.category || next.personalizable !== undefined);
  if (hasPrice && next.sort !== "price-asc" && next.sort !== "price-desc") {
    next.sort = "price-asc";
  } else if (hasFacet && (next.sort === "featured" || next.sort === "name-asc")) {
    next.sort = "newest";
  }
  return next;
}
