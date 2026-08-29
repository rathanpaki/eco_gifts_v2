"use client";

import {
  giftProfileListSchema,
  giftProfileSchema,
  savedPaymentMethodListSchema,
  savedPaymentMethodSchema,
} from "@/lib/schemas/account-saved.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type {
  GiftProfile,
  GiftProfileValues,
  PaymentMethodValues,
  SavedPaymentMethod,
} from "@/types/account-saved";

async function getList(path: string) {
  const response = await fetch(`${clientApiBaseUrl}/api${path}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return response.json();
}

export async function getGiftProfiles(): Promise<GiftProfile[]> {
  return giftProfileListSchema.parse(
    await getList("/account/gift-profiles"),
  );
}

export async function createGiftProfile(
  values: GiftProfileValues,
): Promise<GiftProfile> {
  const response = await apiMutation("/account/gift-profiles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return giftProfileSchema.parse(await response.json());
}

export async function updateGiftProfile(input: {
  id: string;
  values: GiftProfileValues;
}): Promise<GiftProfile> {
  const response = await apiMutation(
    `/account/gift-profiles/${encodeURIComponent(input.id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input.values),
    },
  );
  return giftProfileSchema.parse(await response.json());
}

export async function deleteGiftProfile(id: string): Promise<void> {
  await apiMutation(`/account/gift-profiles/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export async function getSavedPaymentMethods(): Promise<SavedPaymentMethod[]> {
  return savedPaymentMethodListSchema.parse(
    await getList("/account/payment-methods"),
  );
}

export async function savePaymentMethod(
  values: PaymentMethodValues,
): Promise<SavedPaymentMethod> {
  const response = await apiMutation("/account/payment-methods", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return savedPaymentMethodSchema.parse(await response.json());
}

export async function deleteSavedPaymentMethod(id: string): Promise<void> {
  await apiMutation(`/account/payment-methods/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}