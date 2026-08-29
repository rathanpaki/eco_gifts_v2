"use client";

import { useQuery } from "@tanstack/react-query";
import { getStoreSettings } from "@/services/store-settings.service";

export const storeSettingsKey = ["store-settings"] as const;

export function useStoreSettings() {
  return useQuery({
    queryKey: storeSettingsKey,
    queryFn: getStoreSettings,
    staleTime: 60_000,
  });
}
