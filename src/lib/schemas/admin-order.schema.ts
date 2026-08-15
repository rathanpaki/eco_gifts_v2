import { z } from "zod";
import { fulfillmentStatusSchema, orderSchema } from "./checkout.schema";

const money = z.number().int().nonnegative();
const paymentStatus = z.enum(["pending", "paid", "failed", "refunded"]);

const adminOrderSummarySchema = z.object({
  id: z.string().min(20).max(64),
  orderNumber: z.string().min(1),
  customerName: z.string().min(1),
  customerEmail: z.string().email().nullable(),
  totalCents: money,
  currency: z.string().regex(/^[A-Z]{3}$/),
  itemCount: z.number().int().positive(),
  paymentStatus,
  fulfillmentStatus: fulfillmentStatusSchema,
  createdAt: z.string().datetime(),
});

const metricsSchema = z.object({
  total: money,
  pending: money,
  confirmed: money,
  processing: money,
  shipped: money,
  delivered: money,
  cancelled: money,
});

const adminEventSchema = z.object({
  id: z.string().min(1).max(128),
  status: fulfillmentStatusSchema,
  fromStatus: fulfillmentStatusSchema.nullable(),
  note: z.string().max(300).nullable(),
  actorId: z.string().min(1),
  actorEmail: z.string().email().nullable(),
  actorType: z.enum(["user", "admin"]),
  createdAt: z.string().datetime(),
});

export const adminOrderPageSchema = z.object({
  items: z.array(adminOrderSummarySchema),
  metrics: metricsSchema,
  nextCursor: z.string().min(1).max(256).nullable(),
});

export const adminOrderSchema = orderSchema.extend({
  customerName: z.string().min(1),
  customerEmail: z.string().email().nullable(),
  allowedTransitions: z.array(fulfillmentStatusSchema),
  events: z.array(adminEventSchema).max(100),
});
