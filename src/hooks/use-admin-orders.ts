"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAdminOrder,
  getAdminOrders,
  updateAdminOrderStatus,
} from "@/services/admin-orders.service";
import type { AdminOrderFilter } from "@/types/admin-order";
import type { FulfillmentStatus } from "@/types/checkout";

export const adminOrdersKey = ["admin", "orders"] as const;

export function useAdminOrders(filter: AdminOrderFilter) {
  return useInfiniteQuery({
    queryKey: [...adminOrdersKey, filter],
    queryFn: ({ pageParam }) => getAdminOrders(filter, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (page) => page.nextCursor ?? undefined,
    staleTime: 15_000,
  });
}

export function useAdminOrder(orderId: string | undefined) {
  return useQuery({
    queryKey: [...adminOrdersKey, "detail", orderId],
    queryFn: () => getAdminOrder(orderId as string),
    enabled: Boolean(orderId),
    staleTime: 15_000,
  });
}

export function useAdminOrderStatusMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: FulfillmentStatus;
    }) => updateAdminOrderStatus(orderId, status),
    onSuccess: async (order) => {
      client.setQueryData([...adminOrdersKey, "detail", order.id], order);
      await Promise.all([
        client.invalidateQueries({ queryKey: adminOrdersKey }),
        client.invalidateQueries({ queryKey: ["orders"] }),
        client.invalidateQueries({ queryKey: ["order"] }),
      ]);
    },
  });
}
