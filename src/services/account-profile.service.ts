"use client";

import {
  accountAddressSchema,
  accountProfileSchema,
  giftPreferencesSchema,
  phoneVerificationRequestSchema,
  phoneVerificationResultSchema,
} from "@/lib/schemas/account-profile.schema";
import {
  publicProductListSchema,
  publicProductSchema,
} from "@/lib/schemas/catalog.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "./client-api";
import type {
  AccountAddress,
  AccountProfile,
  AddressValues,
  GiftPreferences,
  ProfileValues,
  PhoneVerificationRequest,
  PhoneVerificationResult,
} from "@/types/account-profile";
import type { PublicProduct } from "@/types/catalog";

export async function getAccountProfile(): Promise<AccountProfile> {
  const response = await fetch(`${clientApiBaseUrl}/api/account/profile`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return accountProfileSchema.parse(await response.json());
}

export async function updateAccountProfile(
  values: ProfileValues,
): Promise<AccountProfile> {
  const response = await apiMutation("/account/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return accountProfileSchema.parse(await response.json());
}

export async function uploadAccountPhoto(file: File): Promise<AccountProfile> {
  const form = new FormData();
  form.set("photo", file);
  const response = await apiMutation("/account/profile/photo", {
    method: "POST",
    body: form,
  });
  return accountProfileSchema.parse(await response.json());
}

export async function createAccountAddress(
  values: AddressValues,
): Promise<AccountAddress> {
  const response = await apiMutation("/account/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return accountAddressSchema.parse(await response.json());
}

export async function updateAccountAddress(input: {
  id: string;
  values: AddressValues;
}): Promise<AccountAddress> {
  const response = await apiMutation(
    `/account/addresses/${encodeURIComponent(input.id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input.values),
    },
  );
  return accountAddressSchema.parse(await response.json());
}

export async function deleteAccountAddress(addressId: string): Promise<void> {
  await apiMutation(`/account/addresses/${encodeURIComponent(addressId)}`, {
    method: "DELETE",
  });
}

export async function getWishlist(): Promise<PublicProduct[]> {
  const response = await fetch(`${clientApiBaseUrl}/api/account/wishlist`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return publicProductListSchema.parse(await response.json());
}

export async function addWishlistProduct(input: {
  productId: string;
  customizationId?: string;
}): Promise<PublicProduct> {
  const response = await apiMutation(
    `/account/wishlist/${encodeURIComponent(input.productId)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customizationId: input.customizationId }),
    },
  );
  return publicProductSchema.parse(await response.json());
}

export async function removeWishlistProduct(productId: string): Promise<void> {
  await apiMutation(`/account/wishlist/${encodeURIComponent(productId)}`, {
    method: "DELETE",
  });
}

export async function getGiftPreferences(): Promise<GiftPreferences> {
  const response = await fetch(`${clientApiBaseUrl}/api/account/preferences`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return giftPreferencesSchema.parse(await response.json());
}

export async function updateGiftPreferences(
  values: GiftPreferences,
): Promise<GiftPreferences> {
  const response = await apiMutation("/account/preferences", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return giftPreferencesSchema.parse(await response.json());
}

export async function requestPhoneVerification(
  phone: string,
): Promise<PhoneVerificationRequest> {
  const response = await apiMutation("/account/phone/request-verification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  return phoneVerificationRequestSchema.parse(await response.json());
}

export async function verifyPhoneNumber(input: {
  phone: string;
  code: string;
}): Promise<PhoneVerificationResult> {
  const response = await apiMutation("/account/phone/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return phoneVerificationResultSchema.parse(await response.json());
}
