"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCheckoutQuote,
  placeOrder,
  type QuoteSelection,
} from "@/services/checkout.service";
import type { Cart } from "@/types/cart";
import { cartQueryKey } from "./use-cart";

const emptyCart: Cart = {
  items: [],
  totalQuantity: 0,
  subtotalCents: 0,
  personalizationCents: 0,
  totalCents: 0,
  currency: null,
  readyForCheckout: false,
  updatedAt: null,
};

export function useCheckoutQuote(selection: QuoteSelection) {
  return useQuery({
    queryKey: ["checkout-quote", selection],
    queryFn: () => getCheckoutQuote(selection),
    staleTime: 10_000,
  });
}

export function usePlaceOrder() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      client.setQueryData(cartQueryKey, emptyCart);
      client.removeQueries({ queryKey: ["checkout-quote"] });
      void client.invalidateQueries({ queryKey: ["orders", "history"] });
    },
  });
}
