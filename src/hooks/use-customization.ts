"use client";

import { useMutation } from "@tanstack/react-query";
import { createCustomization } from "@/services/customization.service";

export function useCreateCustomization() {
  return useMutation({ mutationFn: createCustomization });
}
