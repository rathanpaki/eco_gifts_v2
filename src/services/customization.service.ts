"use client";

import { customizationSchema } from "@/lib/schemas/customization.schema";
import { apiMutation, clientApiBaseUrl } from "@/services/client-api";
import type {
  CustomizationDesign,
  SavedCustomization,
} from "@/types/customizer.types";

interface CreateCustomizationInput {
  productId: string;
  preview: Blob;
  design: CustomizationDesign;
}

export async function createCustomization(
  input: CreateCustomizationInput,
): Promise<SavedCustomization> {
  return writeCustomization("/customizations", "POST", input);
}

export async function updateCustomization(
  input: CreateCustomizationInput & { id: string },
): Promise<SavedCustomization> {
  return writeCustomization(
    `/customizations/${encodeURIComponent(input.id)}`,
    "PATCH",
    input,
  );
}

async function writeCustomization(
  path: string,
  method: "PATCH" | "POST",
  input: CreateCustomizationInput,
): Promise<SavedCustomization> {
  const form = new FormData();
  form.set("productId", input.productId);
  form.set("designJson", JSON.stringify(input.design));
  form.set("preview", input.preview, "customization.png");
  const response = await apiMutation(path, {
    method,
    body: form,
  });
  const saved = customizationSchema.parse(await response.json());
  return {
    ...saved,
    previewUrl: customizationPreviewUrl(saved.previewPath),
  };
}

export async function getCustomization(id: string): Promise<SavedCustomization> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/customizations/${encodeURIComponent(id)}`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error("The saved personalization could not be loaded.");
  const saved = customizationSchema.parse(await response.json());
  return { ...saved, previewUrl: customizationPreviewUrl(saved.previewPath) };
}

export function customizationPreviewUrl(previewPath: string): string {
  return `${clientApiBaseUrl}${previewPath}`;
}
