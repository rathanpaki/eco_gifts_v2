"use client";

import { useEffect, useRef, useState } from "react";
import type { SavedPaymentMethod } from "@/types/account-saved";
import type { CheckoutPaymentChoice } from "./payment-method-panel";

export function useCheckoutPayment(savedCards: SavedPaymentMethod[]) {
  const [choice, setChoice] = useState<CheckoutPaymentChoice>("pay-on-delivery");
  const [sessionCard, setSessionCard] = useState<SavedPaymentMethod>();
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current || !savedCards.length) return;
    initialized.current = true;
    const preferred = savedCards.find((card) => card.primary) ?? savedCards[0];
    setChoice(`card:${preferred.id}`);
  }, [savedCards]);
  const cards = sessionCard ? [sessionCard, ...savedCards.filter((card) => card.id !== sessionCard.id)] : savedCards;
  const selectedCard = choice.startsWith("card:") ? cards.find((card) => `card:${card.id}` === choice) : undefined;
  function addCard(card: SavedPaymentMethod) {
    if (card.id === "session") setSessionCard(card);
    setChoice(`card:${card.id}`);
  }
  return { addCard, cards, choice, selectedCard, setChoice };
}