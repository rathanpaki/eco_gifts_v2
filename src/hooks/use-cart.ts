"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/services/cart.service";

export const cartQueryKey = ["cart"] as const;

export function useCartQuery() {
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: getCart,
    staleTime: 15_000,
  });
}

export function useAddCartItem() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: addCartItem,
    onSuccess: (cart) => client.setQueryData(cartQueryKey, cart),
  });
}

export function useUpdateCartItem() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: (cart) => client.setQueryData(cartQueryKey, cart),
  });
}

export function useRemoveCartItem() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: (cart) => client.setQueryData(cartQueryKey, cart),
  });
}
