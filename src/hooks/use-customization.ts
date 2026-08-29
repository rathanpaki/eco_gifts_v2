"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCustomization,
  getCustomization,
  updateCustomization,
} from "@/services/customization.service";

export function useCreateCustomization() {
  return useMutation({ mutationFn: createCustomization });
}

export function useUpdateCustomization() {
  return useMutation({ mutationFn: updateCustomization });
}

export function useCustomization(id?: string) {
  return useQuery({
    queryKey: ["customization", id],
    queryFn: () => getCustomization(id!),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}
