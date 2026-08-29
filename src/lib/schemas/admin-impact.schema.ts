import { z } from "zod";

const cause = z.enum([
  "Tree Planting",
  "Carbon Offset",
  "Wildlife Conservation",
]);
const status = z.enum(["pending_verification", "verified"]);
export const adminImpactItemSchema = z.object({
  id: z.string().min(1),
  orderId: z.string().min(1),
  userId: z.string().min(1),
  customerName: z.string().min(1).nullable(),
  customerEmail: z.string().email().nullable(),
  cause,
  amountCents: z.number().int().nonnegative(),
  rewardPointsEarned: z.number().int().nonnegative(),
  treeId: z.string().min(1).nullable(),
  createdAt: z.string().datetime(),
  status,
  verifiedAt: z.string().datetime().nullable(),
  verifiedBy: z.string().min(1).nullable(),
});

export const adminImpactPageSchema = z.object({
  items: z.array(adminImpactItemSchema).max(500),
  metrics: z.object({
    total: z.number().int().nonnegative(),
    pending: z.number().int().nonnegative(),
    verified: z.number().int().nonnegative(),
    totalAmountCents: z.number().int().nonnegative(),
    treeCount: z.number().int().nonnegative(),
  }),
  trend: z.array(
    z.object({
      month: z.string().regex(/^\d{4}-\d{2}$/),
      label: z.string().min(1),
      amountCents: z.number().int().nonnegative(),
      contributionCount: z.number().int().nonnegative(),
    }),
  ),
});
