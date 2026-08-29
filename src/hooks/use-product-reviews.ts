"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProductReview,
  getReviewedProductIds,
} from "@/services/product-reviews.service";

export function useReviewedProductIds(orderId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["order-reviews", orderId],
    queryFn: () => getReviewedProductIds(orderId),
    enabled,
    staleTime: 30_000,
  });
}

export function useCreateProductReview(orderId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createProductReview,
    onSuccess: (review) => {
      client.setQueryData<string[]>(["order-reviews", orderId], (current = []) =>
        current.includes(review.productId)
          ? current
          : [...current, review.productId],
      );
    },
  });
}
