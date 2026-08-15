"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/services/orders.service";

export function useOrder(orderId: string, userId: string) {
  return useQuery({
    queryKey: ["order", userId, orderId],
    queryFn: () => getOrder(orderId),
    staleTime: 30_000,
  });
}
