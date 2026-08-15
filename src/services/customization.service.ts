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
  const form = new FormData();
  form.set("productId", input.productId);
  form.set("designJson", JSON.stringify(input.design));
  form.set("preview", input.preview, "customization.png");
  const response = await apiMutation("/customizations", {
    method: "POST",
    body: form,
  });
  const saved = customizationSchema.parse(await response.json());
  return {
    ...saved,
    previewUrl: customizationPreviewUrl(saved.previewPath),
  };
}

export function customizationPreviewUrl(previewPath: string): string {
  return `${clientApiBaseUrl}${previewPath}`;
}
