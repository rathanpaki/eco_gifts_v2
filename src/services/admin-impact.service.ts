"use client";

import {
  adminImpactItemSchema,
  adminImpactPageSchema,
} from "@/lib/schemas/admin-impact.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type {
  AdminImpactItem,
  AdminImpactPage,
  AdminImpactQuery,
  VerifyImpactInput,
} from "@/types/admin-impact";

export async function getAdminImpact(
  input: AdminImpactQuery,
): Promise<AdminImpactPage> {
  const query = new URLSearchParams({
    cause: input.cause,
    limit: "100",
    status: input.status,
  });
  if (input.search.trim()) query.set("search", input.search.trim());
  const response = await fetch(
    `${clientApiBaseUrl}/api/admin/impact?${query.toString()}`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return adminImpactPageSchema.parse(await response.json());
}

export async function verifyAdminImpact(
  id: string,
  input: VerifyImpactInput,
): Promise<AdminImpactItem> {
  const response = await apiMutation(
    `/admin/impact/${encodeURIComponent(id)}/verify`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    },
  );
  return adminImpactItemSchema.parse(await response.json());
}
