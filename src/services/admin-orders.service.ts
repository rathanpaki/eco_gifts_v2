"use client";

import {
  adminOrderPageSchema,
  adminOrderSchema,
} from "@/lib/schemas/admin-order.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type {
  AdminOrder,
  AdminOrderFilter,
  AdminOrderPage,
  AdminOrderSummary,
} from "@/types/admin-order";
import type { FulfillmentStatus } from "@/types/checkout";

export async function getAdminOrders(
  filter: AdminOrderFilter,
  cursor?: string,
): Promise<AdminOrderPage> {
  const query = new URLSearchParams({ limit: "12", filter });
  if (cursor) query.set("cursor", cursor);
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/orders?${query.toString()}`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return adminOrderPageSchema.parse(await response.json());
}

export async function getAdminOrder(orderId: string): Promise<AdminOrder> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/orders/${encodeURIComponent(orderId)}`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return adminOrderSchema.parse(await response.json());
}

export async function updateAdminOrderStatus(
  orderId: string,
  status: FulfillmentStatus,
): Promise<AdminOrder> {
  const response = await apiMutation(
    `/admin/orders/${encodeURIComponent(orderId)}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    },
  );
  return adminOrderSchema.parse(await response.json());
}

export async function exportAdminOrders(
  filter: AdminOrderFilter,
): Promise<void> {
  const orders: AdminOrderSummary[] = [];
  let cursor: string | undefined;
  do {
    const page = await getAdminOrders(filter, cursor);
    orders.push(...page.items);
    cursor = page.nextCursor ?? undefined;
  } while (cursor);
  const header = [
    "Order",
    "Customer",
    "Email",
    "Items",
    "Total",
    "Status",
    "Placed",
  ];
  const rows = orders.map((order) => [
    order.orderNumber,
    order.customerName,
    order.customerEmail ?? "",
    String(order.itemCount),
    (order.totalCents / 100).toFixed(2),
    order.fulfillmentStatus,
    order.createdAt,
  ]);
  downloadCsv([header, ...rows].map(csvRow).join("\r\n"));
}

function csvRow(values: string[]): string {
  return values.map((value) => `"${value.replaceAll('"', '""')}"`).join(",");
}

function downloadCsv(csv: string): void {
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `eco-gifts-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
