"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirmOrderDelivery, getOrder } from "@/services/orders.service";

export function useOrder(orderId: string, userId: string) {
  return useQuery({
    queryKey: ["order", userId, orderId],
    queryFn: () => getOrder(orderId),
    staleTime: 30_000,
  });
}

export function useOrderDeliveryConfirmation(orderId: string, userId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => confirmOrderDelivery(orderId),
    onSuccess: async (order) => {
      client.setQueryData(["order", userId, orderId], order);
      await client.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
