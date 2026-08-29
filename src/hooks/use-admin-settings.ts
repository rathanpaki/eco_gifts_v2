"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminSettings,
  updateAdminSettings,
} from "@/services/admin-settings.service";
import { storeSettingsKey } from "@/hooks/use-store-settings";

export const adminSettingsKey = ["admin-settings"] as const;

export function useAdminSettings() {
  return useQuery({
    queryKey: adminSettingsKey,
    queryFn: getAdminSettings,
    staleTime: 30_000,
  });
}

export function useUpdateAdminSettings() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateAdminSettings,
    onSuccess: (settings) => {
      client.setQueryData(adminSettingsKey, settings);
      client.setQueryData(storeSettingsKey, {
        storeName: settings.storeName,
        supportEmail: settings.supportEmail,
        storefrontActive: settings.storefrontActive,
      });
    },
  });
}
