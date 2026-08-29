"use client";

import { storeSettingsSchema } from "@/lib/schemas/store-settings.schema";
import type { StoreSettings } from "@/types/store-settings";
import { apiResponseMessage, clientApiBaseUrl } from "./client-api";

export async function getStoreSettings(): Promise<StoreSettings> {
  const response = await fetch(`${clientApiBaseUrl}/api/store/settings`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return storeSettingsSchema.parse(await response.json());
}
