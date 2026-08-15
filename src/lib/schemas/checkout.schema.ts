import { z } from "zod";
import { cartItemSchema } from "./cart.schema";

const money = z.number().int().nonnegative();
const packagingId = z.enum([
  "recycled-box",
  "seed-paper-wrap",
  "zero-waste-cloth",
]);
const deliveryId = z.enum(["standard", "green-logistics"]);

const packagingSchema = z.object({
  id: packagingId,
  name: z.string().min(1),
  description: z.string().min(1),
  priceCents: money,
  co2SavingsKg: z.number().nonnegative(),
  plasticAvoidedGrams: money,
  ecoBonusPoints: money,
});

const deliverySchema = z.object({
  id: deliveryId,
  name: z.string().min(1),
  description: z.string().min(1),
  priceCents: money,
  co2OffsetKg: z.number().nonnegative(),
  ecoBonusPoints: money,
  estimatedDays: z.string().min(1),
});

const impactSchema = z.object({
  score: z.number().int().min(0).max(100),
  grade: z.enum(["A+", "A", "B", "C"]),
  co2SavedKg: z.number().nonnegative(),
  plasticAvoidedGrams: money,
  methodologyVersion: z.string().min(1),
  estimated: z.literal(true),
});

export const deliveryAddressSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  addressLine1: z.string().trim().min(3).max(120),
  addressLine2: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2).max(80),
  region: z.string().trim().max(80).optional(),
  postalCode: z.string().trim().min(2).max(20),
  countryCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,24}$/)
    .optional(),
});

export const checkoutQuoteSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(50),
  packagingOptions: z.array(packagingSchema).min(1),
  deliveryOptions: z.array(deliverySchema).min(1),
  packaging: packagingSchema,
  delivery: deliverySchema,
  subtotalCents: money,
  totalCents: money,
  currency: z.string().regex(/^[A-Z]{3}$/),
  impact: impactSchema,
  paymentMethod: z.literal("pay_on_delivery"),
});

const orderItemSchema = z.object({
  itemId: z.string().min(1).max(128),
  productId: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  image: z.object({ url: z.string().url(), alt: z.string().min(1) }).nullable(),
  unitPriceCents: money,
  quantity: z.number().int().positive(),
  lineTotalCents: money,
  ecoScore: z.number().int().min(0).max(100),
  customization: z
    .object({
      id: z.string().min(1).max(128),
      previewPath: z
        .string()
        .regex(/^\/api\/customizations\/[A-Za-z0-9_-]+\/preview$/),
    })
    .nullable(),
});

export const fulfillmentStatusSchema = z.enum([
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

const orderTimelineEventSchema = z.object({
  id: z.string().min(1).max(128),
  status: fulfillmentStatusSchema,
  createdAt: z.string().datetime(),
});

export const orderSchema = z.object({
  id: z.string().min(20).max(64),
  orderNumber: z.string().min(1),
  items: z.array(orderItemSchema).min(1),
  address: deliveryAddressSchema,
  packaging: packagingSchema,
  delivery: deliverySchema,
  impact: impactSchema,
  subtotalCents: money,
  totalCents: money,
  currency: z.string().regex(/^[A-Z]{3}$/),
  paymentMethod: z.literal("pay_on_delivery"),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
  fulfillmentStatus: fulfillmentStatusSchema,
  history: z.array(orderTimelineEventSchema).max(100),
  createdAt: z.string().datetime(),
});

export const orderHistoryPageSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().min(20).max(64),
      orderNumber: z.string().min(1),
      items: z.array(orderItemSchema).min(1),
      totalQuantity: z.number().int().positive(),
      totalCents: money,
      currency: z.string().regex(/^[A-Z]{3}$/),
      paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
      fulfillmentStatus: fulfillmentStatusSchema,
      estimatedDelivery: z.string().min(1),
      impact: impactSchema,
      createdAt: z.string().datetime(),
    }),
  ),
  nextCursor: z.string().min(1).max(256).nullable(),
});

export const orderSummarySchema = orderHistoryPageSchema.shape.items.element;
