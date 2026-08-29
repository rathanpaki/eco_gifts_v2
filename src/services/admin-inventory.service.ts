"use client";

import {
  inventoryAnalyticsSchema,
  inventoryEventSchema,
} from "@/lib/schemas/admin-inventory.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type {
  InventoryAdjustmentInput,
  InventoryAnalyticsReport,
  InventoryEvent,
  StockAnalytics,
} from "@/types/admin-inventory";

export async function getInventoryAnalytics(): Promise<InventoryAnalyticsReport> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/dashboard/inventory-analytics`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return inventoryAnalyticsSchema.parse(await response.json());
}

export async function getInventoryHistory(
  productId: string,
): Promise<InventoryEvent[]> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/inventory/${encodeURIComponent(productId)}/history`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return inventoryEventSchema.array().parse(await response.json());
}

export async function adjustInventory(
  productId: string,
  input: InventoryAdjustmentInput,
): Promise<InventoryEvent> {
  const response = await apiMutation(
    `/admin/inventory/${encodeURIComponent(productId)}/adjustments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    },
  );
  return inventoryEventSchema.parse(await response.json());
}

export function exportInventoryCsv(items: StockAnalytics[]): void {
  const rows = [
    ["Product", "ID", "Category", "Stock", "Available", "Units/day", "Urgency"],
    ...items.map((item) => [
      item.productName,
      item.productId,
      item.category,
      String(item.currentStock),
      String(item.availableStock),
      String(item.salesVelocity.unitsSoldPerDay),
      item.reorder.urgency,
    ]),
  ];
  const csv = rows
    .map((row) =>
      row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","),
    )
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "eco-gifts-inventory.csv";
  link.click();
  URL.revokeObjectURL(url);
}
