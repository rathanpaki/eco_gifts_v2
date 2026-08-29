"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdminPromotion,
  deleteAdminPromotion,
  getAdminPromotion,
  getAdminPromotions,
  updateAdminPromotion,
} from "@/services/admin-promotions.service";
import type { PromotionWrite } from "@/types/admin-promotions";

export const adminPromotionsKey = ["admin-promotions"] as const;

export function useAdminPromotions() {
  return useQuery({
    queryKey: adminPromotionsKey,
    queryFn: getAdminPromotions,
    staleTime: 15_000,
  });
}

export function useCreateAdminPromotion() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createAdminPromotion,
    onSuccess: () => client.invalidateQueries({ queryKey: adminPromotionsKey }),
  });
}

export function useAdminPromotion(id: string) {
  return useQuery({
    queryKey: [...adminPromotionsKey, id],
    queryFn: () => getAdminPromotion(id),
    enabled: Boolean(id),
  });
}

export function useUpdateAdminPromotion(id: string | undefined) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: PromotionWrite) => {
      if (!id) throw new Error("Promotion id is required.");
      return updateAdminPromotion(id, values);
    },
    onSuccess: (promotion) => {
      client.setQueryData([...adminPromotionsKey, promotion.id], promotion);
      return client.invalidateQueries({ queryKey: adminPromotionsKey });
    },
  });
}

export function useDeleteAdminPromotion() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminPromotion,
    onSuccess: () => client.invalidateQueries({ queryKey: adminPromotionsKey }),
  });
}
