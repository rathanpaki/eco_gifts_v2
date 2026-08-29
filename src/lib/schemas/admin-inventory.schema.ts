import { z } from "zod";

const count = z.number().int().nonnegative();
const urgency = z.enum(["critical", "moderate", "low", "none"]);
const risk = z.enum(["high_risk", "moderate_risk", "low_risk", "optimal"]);

export const inventoryEventSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  productName: z.string().min(1),
  orderId: z.string().min(1).nullable(),
  type: z.enum(["sale", "sale_reversal", "restock", "adjustment"]),
  quantityDelta: z.number().int(),
  stockBefore: count,
  stockAfter: count,
  reason: z.string().min(1),
  actorId: z.string().min(1),
  actorEmail: z.string().email().nullable(),
  createdAt: z.string().datetime(),
});

const stockItem = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  category: z.string().min(1),
  currentStock: count,
  allocatedStock: count,
  availableStock: count,
  unitCostCents: count.nullable(),
  salesVelocity: z.object({
    unitsSoldPerDay: z.number().nonnegative(),
    periodDays: z.number().int().positive(),
    trend: z.enum(["increasing", "stable", "decreasing"]),
    velocityScore: z.number().int().min(0).max(100),
  }),
  reorder: z.object({
    recommendedOrderQuantity: count,
    reorderThreshold: count,
    urgency,
    leadTimeDays: z.number().int().positive(),
    estimatedStockoutDays: count.nullable(),
  }),
  wasteIndex: z.object({
    wasteRiskScore: z.number().int().min(0).max(100),
    wasteRiskTag: risk,
    overstockQuantity: count,
    potentialSpoilageDays: count.nullable(),
    shelfLifeDays: z.number().int().positive().nullable(),
  }),
  lastRestockedAt: z.string().datetime().nullable(),
});

export const inventoryAnalyticsSchema = z.object({
  generatedAt: z.string().datetime(),
  totalProducts: count,
  criticalStockCount: count,
  overstockCount: count,
  items: z.array(stockItem),
  forecast: z.object({
    seasonName: z.string().min(1),
    multiplier: z.number().positive(),
    peakStart: z.string().min(1),
    peakEnd: z.string().min(1),
    projectedDemandUnits: count,
    recommendedStockBuffer: count,
    categorySurges: z.array(
      z.object({
        category: z.string().min(1),
        surgeMultiplier: z.number().positive(),
        description: z.string().min(1),
      }),
    ),
  }),
});
