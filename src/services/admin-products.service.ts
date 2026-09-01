import "server-only";

import { adminProductPageSchema, adminProductSchema } from "@/lib/schemas/admin-product.schema";
import { isRedirectError, serverApi } from "@/services/server-api";
import type { AdminProduct, AdminProductPage } from "@/types/admin-product";

export type ProductListLoad =
  | { kind: "ready"; page: AdminProductPage }
  | { kind: "unavailable" };
export type ProductLoad =
  | { kind: "ready"; product: AdminProduct }
  | { kind: "not-found" }
  | { kind: "unavailable" };
export type ProductCategoriesLoad =
  | { kind: "ready"; categories: string[] }
  | { kind: "unavailable" };

export async function loadAdminProducts(query: Record<string, string | string[] | undefined>): Promise<ProductListLoad> {
  const params = new URLSearchParams();
  for (const key of ["filter", "search", "page"] as const) {
    const value = query[key];
    if (typeof value === "string" && value) params.set(key, value);
  }
  params.set("limit", "12");
  try {
    const response = await serverApi(`/admin/products?${params.toString()}`);
    if (!response.ok) return { kind: "unavailable" };
    const parsed = adminProductPageSchema.safeParse(await response.json());
    return parsed.success ? { kind: "ready", page: parsed.data } : { kind: "unavailable" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { kind: "unavailable" };
  }
}

export async function loadAdminProduct(id: string): Promise<ProductLoad> {
  try {
    const response = await serverApi(`/admin/products/${encodeURIComponent(id)}`);
    if (response.status === 404) return { kind: "not-found" };
    if (!response.ok) throw new Error("Product unavailable");
    return {
      kind: "ready",
      product: adminProductSchema.parse(await response.json()),
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { kind: "unavailable" };
  }
}

export async function loadAdminProductCategories(): Promise<ProductCategoriesLoad> {
  try {
    const response = await serverApi("/admin/products/categories");
    if (!response.ok) return { kind: "unavailable" };
    const values: unknown = await response.json();
    return {
      kind: "ready",
      categories: Array.isArray(values)
        ? values.filter((value): value is string => typeof value === "string")
        : [],
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { kind: "unavailable" };
  }
}
