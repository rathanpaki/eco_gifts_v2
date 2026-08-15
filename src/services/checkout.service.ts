'use client';

import {
  checkoutQuoteSchema,
  orderSchema,
} from '@/lib/schemas/checkout.schema';
import { apiMutation, apiResponseMessage, clientApiBaseUrl } from '@/services/client-api';
import type {
  CheckoutQuote,
  DeliveryOptionId,
  Order,
  PackagingOptionId,
  PlaceOrderInput,
} from '@/types/checkout';

export interface QuoteSelection {
  packagingId?: PackagingOptionId;
  deliveryId?: DeliveryOptionId;
}

export async function getCheckoutQuote(
  selection: QuoteSelection,
): Promise<CheckoutQuote> {
  const query = new URLSearchParams();
  if (selection.packagingId) query.set('packagingId', selection.packagingId);
  if (selection.deliveryId) query.set('deliveryId', selection.deliveryId);
  const suffix = query.size ? `?${query.toString()}` : '';
  const response = await fetch(
    `${clientApiBaseUrl}/api/checkout/quote${suffix}`,
    { cache: 'no-store', credentials: 'include' },
  );
  if (!response.ok) {
    const message = await apiResponseMessage(response);
    throw new Error(
      response.status === 400 && message === 'The cart is not ready for checkout.'
        ? 'Your bag is empty or its products are no longer available. Review your bag before checkout.'
        : message,
    );
  }
  return checkoutQuoteSchema.parse(await response.json());
}

export async function placeOrder(input: PlaceOrderInput): Promise<Order> {
  const response = await apiMutation('/checkout/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return orderSchema.parse(await response.json());
}
