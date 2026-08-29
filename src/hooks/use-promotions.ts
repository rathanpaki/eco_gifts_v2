"use client";

import { useQuery } from '@tanstack/react-query';
import { getActivePromotions } from '@/services/promotions.service';

export const promotionsKey = ['promotions', 'active'] as const;
export function useActivePromotions() {
  return useQuery({ queryKey: promotionsKey, queryFn: getActivePromotions, staleTime: 60_000 });
}