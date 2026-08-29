import { z } from "zod";

export const productReviewSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  orderId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(100).nullable(),
  comment: z.string().min(10).max(1000),
  displayName: z.string().min(1),
  verifiedPurchase: z.literal(true),
  createdAt: z.string().datetime(),
});

export const productReviewFeedSchema = z.object({
  items: z.array(productReviewSchema),
  averageRating: z.number().min(0).max(5),
  totalReviews: z.number().int().nonnegative(),
});

export const reviewedProductIdsSchema = z.object({
  productIds: z.array(z.string().min(1)),
});
