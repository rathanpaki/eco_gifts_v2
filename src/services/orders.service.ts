'use client';

import {
  orderHistoryPageSchema,
  orderSchema,
} from '@/lib/schemas/checkout.schema';
import {
  apiResponseMessage,
  clientApiBaseUrl,
} from '@/services/client-api';
import type { Order, OrderHistoryPage } from '@/types/checkout';

export async function getOrder(orderId: string): Promise<Order> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/orders/${encodeURIComponent(orderId)}`,
    { cache: 'no-store', credentials: 'include' },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return orderSchema.parse(await response.json());
}

export async function getOrderHistory(
  cursor?: string,
): Promise<OrderHistoryPage> {
  const query = new URLSearchParams({ limit: '10' });
  if (cursor) query.set('cursor', cursor);
  const response = await fetch(
    `${clientApiBaseUrl}/api/orders?${query.toString()}`,
    { cache: 'no-store', credentials: 'include' },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return orderHistoryPageSchema.parse(await response.json());
}
