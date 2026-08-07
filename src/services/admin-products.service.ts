import "server-only";

import { adminProductPageSchema, adminProductSchema } from "@/lib/schemas/admin-product.schema";
import { serverApi } from "@/services/server-api";
import type { AdminProduct, AdminProductPage } from "@/types/admin-product";

export type ProductListLoad =
  | { kind: "ready"; page: AdminProductPage }
  | { kind: "unavailable" };

export async function loadAdminProducts(query: Record<string, string | string[] | undefined>): Promise<ProductListLoad> {
  const params = new URLSearchParams();
  for (const key of ["filter", "search", "cursor", "limit"] as const) {
    const value = query[key];
    if (typeof value === "string" && value) params.set(key, value);
  }
  try {
    const response = await serverApi(`/admin/products?${params.toString()}`);
    if (!response.ok) return { kind: "unavailable" };
    const parsed = adminProductPageSchema.safeParse(await response.json());
    return parsed.success ? { kind: "ready", page: parsed.data } : { kind: "unavailable" };
  } catch {
    return { kind: "unavailable" };
  }
}

export async function loadAdminProduct(id: string): Promise<AdminProduct | null> {
  try {
    const response = await serverApi(`/admin/products/${encodeURIComponent(id)}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Product unavailable");
    return adminProductSchema.parse(await response.json());
  } catch {
    return null;
  }
}
