"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminImpact,
  verifyAdminImpact,
} from "@/services/admin-impact.service";
import type { AdminImpactQuery, VerifyImpactInput } from "@/types/admin-impact";

const adminImpactKey = ["admin", "impact"] as const;

export function useAdminImpact(input: AdminImpactQuery) {
  return useQuery({
    queryKey: [...adminImpactKey, input],
    queryFn: () => getAdminImpact(input),
    staleTime: 20_000,
  });
}

export function useVerifyAdminImpact(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: VerifyImpactInput) => verifyAdminImpact(id, input),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: adminImpactKey });
    },
  });
}
