import { z } from "zod";
import { orderSummarySchema } from "./checkout.schema";

const count = z.number().int().nonnegative();
const summary = z.object({
  id: z.string().min(20).max(128),
  displayName: z.string().min(1).max(150),
  email: z.string().email().nullable(),
  orderCount: count,
  completedOrderCount: count,
  lifetimeValueCents: count,
  lastOrderAt: z.string().datetime().nullable(),
  marketingOptIn: z.boolean(),
  impactPlasticAvoidedGrams: count,
  createdAt: z.string().datetime(),
});

const metrics = z.object({
  totalCustomers: count,
  monthlyChangePercent: z.number().nullable(),
  repeatPurchaseRate: z.number().min(0).max(100),
  emailOptInRate: z.number().min(0).max(100),
  averageOrderValueCents: count,
});

const note = z.object({
  id: z.string().min(1).max(128),
  body: z.string().min(3).max(500),
  actorEmail: z.string().email().nullable(),
  createdAt: z.string().datetime(),
});

export const adminCustomerPageSchema = z.object({
  items: z.array(summary),
  metrics,
  nextCursor: z.string().min(1).max(256).nullable(),
});

export const adminCustomerSchema = summary.extend({
  emailVerified: z.boolean(),
  disabled: z.boolean(),
  rewardPoints: count,
  impactCo2SavedKg: z.number().nonnegative(),
  marketingConsentUpdatedAt: z.string().datetime().nullable(),
  contact: z.object({
    phone: z.string().nullable(),
    address: z.string().nullable(),
  }),
  recentOrders: z.array(orderSummarySchema).max(8),
  notes: z.array(note).max(20),
});

export const customerNoteSchema = note;
