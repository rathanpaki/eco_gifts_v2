"use client";

import {
  ecoImpactSummarySchema,
  rewardVoucherSchema,
} from "@/lib/schemas/contribution.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type { EcoImpactSummary, RewardVoucher } from "@/types/contribution.types";

export async function getEcoImpactSummary(): Promise<EcoImpactSummary> {
  const response = await fetch(`${clientApiBaseUrl}/api/eco-contributions/summary`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return ecoImpactSummarySchema.parse(await response.json());
}

export async function redeemRewardVoucher(): Promise<RewardVoucher> {
  const response = await apiMutation("/eco-contributions/redeem-voucher", {
    method: "POST",
  });
  return rewardVoucherSchema.parse(await response.json());
}
