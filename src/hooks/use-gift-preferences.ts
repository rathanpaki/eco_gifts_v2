"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getGiftPreferences,
  updateGiftPreferences,
} from "@/services/account-profile.service";

export const giftPreferencesKey = ["gift-preferences"] as const;

export function useGiftPreferences() {
  return useQuery({
    queryKey: giftPreferencesKey,
    queryFn: getGiftPreferences,
    staleTime: 30_000,
  });
}

export function useUpdateGiftPreferences() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateGiftPreferences,
    onSuccess: (preferences) =>
      client.setQueryData(giftPreferencesKey, preferences),
  });
}
