"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEcoImpactSummary,
  redeemRewardVoucher,
} from "@/services/eco-contributions.service";

export const ecoImpactQueryKey = ["eco-impact"] as const;

export function useEcoImpactSummary() {
  return useQuery({
    queryKey: ecoImpactQueryKey,
    queryFn: getEcoImpactSummary,
    staleTime: 30_000,
  });
}

export function useRedeemRewardVoucher() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: redeemRewardVoucher,
    onSuccess: () => void client.invalidateQueries({ queryKey: ecoImpactQueryKey }),
  });
}
