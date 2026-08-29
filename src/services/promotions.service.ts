"use client";

import { publicPromotionListSchema } from '@/lib/schemas/promotions.schema';
import { apiResponseMessage, clientApiBaseUrl } from './client-api';
import type { PublicPromotion } from '@/types/promotions';

export async function getActivePromotions(): Promise<PublicPromotion[]> {
  const response = await fetch(`${clientApiBaseUrl}/api/promotions/active`, { cache: 'no-store', credentials: 'include' });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return publicPromotionListSchema.parse(await response.json());
}