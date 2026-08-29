"use client";

import {
  productReviewSchema,
  reviewedProductIdsSchema,
} from "@/lib/schemas/product-review.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "./client-api";
import type {
  CreateProductReviewInput,
  ProductReview,
} from "@/types/product-review";

export async function getReviewedProductIds(
  orderId: string,
): Promise<string[]> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/product-reviews/order/${encodeURIComponent(orderId)}`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return reviewedProductIdsSchema.parse(await response.json()).productIds;
}

export async function createProductReview(
  input: CreateProductReviewInput,
): Promise<ProductReview> {
  const response = await apiMutation("/product-reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return productReviewSchema.parse(await response.json());
}
