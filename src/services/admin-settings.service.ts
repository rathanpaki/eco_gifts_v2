"use client";

import { adminSettingsSchema } from "@/lib/schemas/admin-settings.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type { AdminSettings } from "@/types/admin-settings";

export async function getAdminSettings(): Promise<AdminSettings> {
  const response = await fetch(`${clientApiBaseUrl}/api/admin/settings`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return adminSettingsSchema.parse(await response.json());
}

export async function updateAdminSettings(
  values: AdminSettings,
): Promise<AdminSettings> {
  const response = await apiMutation("/admin/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return adminSettingsSchema.parse(await response.json());
}
