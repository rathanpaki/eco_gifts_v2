"use client";

import {
  adminPromotionPageSchema,
  adminPromotionSchema,
} from "@/lib/schemas/admin-promotions.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type {
  AdminPromotion,
  AdminPromotionPage,
  PromotionWrite,
} from "@/types/admin-promotions";

export async function getAdminPromotions(): Promise<AdminPromotionPage> {
  const response = await fetch(`${clientApiBaseUrl}/api/admin/promotions`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return adminPromotionPageSchema.parse(await response.json());
}

export async function getAdminPromotion(id: string): Promise<AdminPromotion> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/promotions/${encodeURIComponent(id)}`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return adminPromotionSchema.parse(await response.json());
}

export async function createAdminPromotion(
  values: PromotionWrite,
): Promise<AdminPromotion> {
  const response = await apiMutation("/admin/promotions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return adminPromotionSchema.parse(await response.json());
}

export async function updateAdminPromotion(
  id: string,
  values: PromotionWrite,
): Promise<AdminPromotion> {
  const response = await apiMutation(
    `/admin/promotions/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );
  return adminPromotionSchema.parse(await response.json());
}

export async function deleteAdminPromotion(id: string): Promise<void> {
  await apiMutation(`/admin/promotions/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
