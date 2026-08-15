'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getOrderHistory } from '@/services/orders.service';

export const orderHistoryQueryKey = (userId: string) =>
  ['orders', 'history', userId] as const;

export function useOrderHistory(userId: string) {
  return useInfiniteQuery({
    queryKey: orderHistoryQueryKey(userId),
    queryFn: ({ pageParam }) => getOrderHistory(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (page) => page.nextCursor ?? undefined,
    staleTime: 30_000,
  });
}
