"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addWishlistProduct,
  getWishlist,
  removeWishlistProduct,
} from "@/services/account-profile.service";
import type { PublicProduct } from "@/types/catalog";

export const wishlistKey = ["wishlist"] as const;

export function useWishlist(enabled = true) {
  return useQuery({
    queryKey: wishlistKey,
    queryFn: getWishlist,
    enabled,
    staleTime: 30_000,
  });
}

export function useAddWishlistProduct() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: addWishlistProduct,
    onSuccess: (product) => {
      client.setQueryData<PublicProduct[]>(wishlistKey, (current = []) =>
        current.some((item) => item.id === product.id)
          ? current
          : [product, ...current],
      );
    },
  });
}

export function useRemoveWishlistProduct() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: removeWishlistProduct,
    onSuccess: (_, productId) => {
      client.setQueryData<PublicProduct[]>(wishlistKey, (current = []) =>
        current.filter((product) => product.id !== productId),
      );
    },
  });
}
