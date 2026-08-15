"use client";

import {
  adminCustomerPageSchema,
  adminCustomerSchema,
  customerNoteSchema,
} from "@/lib/schemas/admin-customer.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type {
  AdminCustomer,
  AdminCustomerPage,
  AdminCustomerSummary,
  CustomerListInput,
  CustomerNote,
} from "@/types/admin-customer";

export async function getAdminCustomers(
  input: CustomerListInput,
  cursor?: string,
): Promise<AdminCustomerPage> {
  const query = new URLSearchParams({
    limit: "20",
    consent: input.consent,
    orders: input.orders,
  });
  if (input.search.trim()) query.set("search", input.search.trim());
  if (cursor) query.set("cursor", cursor);
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/customers?${query.toString()}`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return adminCustomerPageSchema.parse(await response.json());
}

export async function getAdminCustomer(id: string): Promise<AdminCustomer> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/customers/${encodeURIComponent(id)}`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return adminCustomerSchema.parse(await response.json());
}

export async function addCustomerNote(
  id: string,
  body: string,
): Promise<CustomerNote> {
  const response = await apiMutation(
    `/admin/customers/${encodeURIComponent(id)}/notes`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: body.trim() }),
    },
  );
  return customerNoteSchema.parse(await response.json());
}

export async function exportCustomerData(id: string): Promise<void> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/customers/${encodeURIComponent(id)}/export`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  download(
    JSON.stringify(await response.json(), null, 2),
    `eco-gifts-customer-${id}.json`,
    "application/json",
  );
}

export async function exportCustomersCsv(
  input: CustomerListInput,
): Promise<void> {
  const customers: AdminCustomerSummary[] = [];
  let cursor: string | undefined;
  do {
    const page = await getAdminCustomers(input, cursor);
    customers.push(...page.items);
    cursor = page.nextCursor ?? undefined;
  } while (cursor);
  const rows = [
    [
      "Name",
      "Email",
      "Orders",
      "Lifetime value",
      "Last order",
      "Marketing",
      "Plastic avoided (g)",
    ],
    ...customers.map((customer) => [
      customer.displayName,
      customer.email ?? "",
      String(customer.orderCount),
      (customer.lifetimeValueCents / 100).toFixed(2),
      customer.lastOrderAt ?? "",
      customer.marketingOptIn ? "Opted in" : "Not opted in",
      String(customer.impactPlasticAvoidedGrams),
    ]),
  ];
  download(
    rows.map(csvRow).join("\r\n"),
    "eco-gifts-customers.csv",
    "text/csv",
  );
}

function csvRow(values: string[]): string {
  return values.map((value) => `"${value.replaceAll('"', '""')}"`).join(",");
}
function download(content: string, name: string, type: string): void {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}
