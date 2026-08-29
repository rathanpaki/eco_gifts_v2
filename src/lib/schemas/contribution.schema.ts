import { z } from "zod";

const cause = z.enum([
  "Tree Planting",
  "Carbon Offset",
  "Wildlife Conservation",
]);
const status = z.enum(["pending_verification", "verified"]);

const contribution = z.object({
  id: z.string().min(1),
  orderId: z.string().min(1),
  cause,
  amountCents: z.number().int().nonnegative(),
  rewardPointsEarned: z.number().int().nonnegative(),
  treeId: z.string().min(1).nullable(),
  createdAt: z.string().datetime(),
  status,
});

const tree = z.object({
  treeId: z.string().min(1),
  cause: cause.nullable(),
  plantedDate: z.string().datetime().nullable(),
  partnerName: z.string().min(1).nullable(),
  partnerLocation: z.string().min(1).nullable(),
  certificateUrl: z.string().url().nullable(),
  co2SequestrationKg: z.number().nonnegative().nullable(),
  status,
  createdAt: z.string().datetime(),
});

export const rewardVoucherSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  discountCents: z.number().int().positive(),
  pointsCost: z.number().int().positive(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  redeemedAt: z.string().datetime().nullable(),
  orderId: z.string().min(1).nullable(),
  status: z.enum(["active", "redeemed", "expired"]),
  isRedeemed: z.boolean(),
});

export const ecoImpactSummarySchema = z.object({
  rewardPoints: z.number().int().nonnegative(),
  contributions: z.array(contribution).max(20),
  trees: z.array(tree),
  vouchers: z.array(rewardVoucherSchema).max(20),
});
