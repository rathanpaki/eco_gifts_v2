"use client";

import { cartSchema } from "@/lib/schemas/cart.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type { AddCartItemInput, Cart, UpdateCartItemInput } from "@/types/cart";

export async function getCart(): Promise<Cart> {
  const response = await fetch(`${clientApiBaseUrl}/api/cart`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return cartSchema.parse(await response.json());
}

export async function addCartItem(input: AddCartItemInput): Promise<Cart> {
  return mutateCart("/cart/items", "POST", input);
}

export async function updateCartItem(input: UpdateCartItemInput): Promise<Cart> {
  return mutateCart(
    `/cart/items/${encodeURIComponent(input.itemId)}`,
    "PATCH",
    { quantity: input.quantity },
  );
}

export async function removeCartItem(itemId: string): Promise<Cart> {
  const response = await apiMutation(
    `/cart/items/${encodeURIComponent(itemId)}`,
    { method: "DELETE" },
  );
  return cartSchema.parse(await response.json());
}

async function mutateCart(
  path: string,
  method: "PATCH" | "POST",
  body: object,
): Promise<Cart> {
  const response = await apiMutation(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return cartSchema.parse(await response.json());
}
