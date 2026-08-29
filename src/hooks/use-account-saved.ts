"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGiftProfile,
  deleteGiftProfile,
  deleteSavedPaymentMethod,
  getGiftProfiles,
  getSavedPaymentMethods,
  savePaymentMethod,
  updateGiftProfile,
} from "@/services/account-saved.service";

export const giftProfilesKey = ["account", "gift-profiles"] as const;
export const savedPaymentMethodsKey = ["account", "payment-methods"] as const;

export function useGiftProfiles() {
  return useQuery({ queryKey: giftProfilesKey, queryFn: getGiftProfiles });
}
export function useCreateGiftProfile() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createGiftProfile,
    onSuccess: () => client.invalidateQueries({ queryKey: giftProfilesKey }),
  });
}
export function useUpdateGiftProfile() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateGiftProfile,
    onSuccess: () => client.invalidateQueries({ queryKey: giftProfilesKey }),
  });
}
export function useDeleteGiftProfile() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteGiftProfile,
    onSuccess: () => client.invalidateQueries({ queryKey: giftProfilesKey }),
  });
}
export function useSavedPaymentMethods() {
  return useQuery({
    queryKey: savedPaymentMethodsKey,
    queryFn: getSavedPaymentMethods,
  });
}
export function useSavePaymentMethod() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: savePaymentMethod,
    onSuccess: () =>
      client.invalidateQueries({ queryKey: savedPaymentMethodsKey }),
  });
}
export function useDeleteSavedPaymentMethod() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteSavedPaymentMethod,
    onSuccess: () =>
      client.invalidateQueries({ queryKey: savedPaymentMethodsKey }),
  });
}