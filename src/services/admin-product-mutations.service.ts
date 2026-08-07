"use client";

import { adminProductSchema } from "@/lib/schemas/admin-product.schema";
import { apiMutation } from "@/services/client-api";
import type { AdminProduct, ProductWritePayload } from "@/types/admin-product";

export async function createAdminProduct(payload: ProductWritePayload): Promise<AdminProduct> {
  return writeProduct("/admin/products", "POST", payload);
}

export async function updateAdminProduct(id: string, payload: ProductWritePayload): Promise<AdminProduct> {
  return writeProduct(`/admin/products/${encodeURIComponent(id)}`, "PUT", payload);
}

export async function uploadProductImage(id: string, file: File, alt: string): Promise<AdminProduct> {
  const form = new FormData();
  form.set("image", file);
  form.set("alt", alt);
  const response = await apiMutation(`/admin/products/${encodeURIComponent(id)}/images`, {
    method: "POST",
    body: form,
  });
  return adminProductSchema.parse(await response.json());
}

export async function deleteProductImage(id: string, imageId: string): Promise<AdminProduct> {
  const response = await apiMutation(
    `/admin/products/${encodeURIComponent(id)}/images/${encodeURIComponent(imageId)}`,
    { method: "DELETE" },
  );
  return adminProductSchema.parse(await response.json());
}

export async function reorderProductImages(id: string, imageIds: string[]): Promise<AdminProduct> {
  const response = await apiMutation(`/admin/products/${encodeURIComponent(id)}/images/order`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageIds }),
  });
  return adminProductSchema.parse(await response.json());
}

export async function archiveAdminProduct(id: string): Promise<void> {
  await apiMutation(`/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" });
}

async function writeProduct(
  path: string,
  method: "POST" | "PUT",
  payload: ProductWritePayload,
): Promise<AdminProduct> {
  const response = await apiMutation(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return adminProductSchema.parse(await response.json());
}
