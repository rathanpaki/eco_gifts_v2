export type StockUrgency = "critical" | "moderate" | "low" | "none";
export type WasteRisk = "high_risk" | "moderate_risk" | "low_risk" | "optimal";

export interface StockAnalytics {
  productId: string;
  productName: string;
  category: string;
  currentStock: number;
  allocatedStock: number;
  availableStock: number;
  unitCostCents: number | null;
  salesVelocity: {
    unitsSoldPerDay: number;
    periodDays: number;
    trend: "increasing" | "stable" | "decreasing";
    velocityScore: number;
  };
  reorder: {
    recommendedOrderQuantity: number;
    reorderThreshold: number;
    urgency: StockUrgency;
    leadTimeDays: number;
    estimatedStockoutDays: number | null;
  };
  wasteIndex: {
    wasteRiskScore: number;
    wasteRiskTag: WasteRisk;
    overstockQuantity: number;
    potentialSpoilageDays: number | null;
    shelfLifeDays: number | null;
  };
  lastRestockedAt: string | null;
}

export interface InventoryForecast {
  seasonName: string;
  multiplier: number;
  peakStart: string;
  peakEnd: string;
  projectedDemandUnits: number;
  recommendedStockBuffer: number;
  categorySurges: {
    category: string;
    surgeMultiplier: number;
    description: string;
  }[];
}

export interface InventoryAnalyticsReport {
  generatedAt: string;
  totalProducts: number;
  criticalStockCount: number;
  overstockCount: number;
  items: StockAnalytics[];
  forecast: InventoryForecast;
}

export interface InventoryEvent {
  id: string;
  productId: string;
  productName: string;
  orderId: string | null;
  type: "sale" | "sale_reversal" | "restock" | "adjustment";
  quantityDelta: number;
  stockBefore: number;
  stockAfter: number;
  reason: string;
  actorId: string;
  actorEmail: string | null;
  createdAt: string;
}

export interface InventoryAdjustmentInput {
  kind: "restock" | "adjustment";
  quantityDelta: number;
  reason: string;
}
