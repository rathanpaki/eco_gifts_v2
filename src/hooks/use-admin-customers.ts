"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addCustomerNote,
  getAdminCustomer,
  getAdminCustomers,
} from "@/services/admin-customers.service";
import type { CustomerListInput } from "@/types/admin-customer";

export const adminCustomersKey = ["admin", "customers"] as const;

export function useAdminCustomers(input: CustomerListInput) {
  return useInfiniteQuery({
    queryKey: [...adminCustomersKey, input],
    queryFn: ({ pageParam }) => getAdminCustomers(input, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (page) => page.nextCursor ?? undefined,
    staleTime: 30_000,
  });
}

export function useAdminCustomer(customerId: string) {
  return useQuery({
    queryKey: [...adminCustomersKey, customerId],
    queryFn: () => getAdminCustomer(customerId),
    staleTime: 30_000,
  });
}

export function useAddCustomerNote(customerId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => addCustomerNote(customerId, body),
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: [...adminCustomersKey, customerId],
      });
    },
  });
}
