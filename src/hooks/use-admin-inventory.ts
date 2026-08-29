"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adjustInventory,
  getInventoryAnalytics,
  getInventoryHistory,
} from "@/services/admin-inventory.service";
import type { InventoryAdjustmentInput } from "@/types/admin-inventory";

const inventoryKey = ["admin", "inventory"] as const;

export function useInventoryAnalytics() {
  return useQuery({
    queryKey: inventoryKey,
    queryFn: getInventoryAnalytics,
    staleTime: 20_000,
  });
}

export function useInventoryHistory(productId: string) {
  return useQuery({
    queryKey: [...inventoryKey, productId, "history"],
    queryFn: () => getInventoryHistory(productId),
    staleTime: 10_000,
  });
}

export function useAdjustInventory(productId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: InventoryAdjustmentInput) =>
      adjustInventory(productId, input),
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({ queryKey: inventoryKey }),
        client.invalidateQueries({
          queryKey: [...inventoryKey, productId, "history"],
        }),
      ]);
    },
  });
}
