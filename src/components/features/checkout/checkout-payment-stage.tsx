"use client";

import { useState } from "react";
import { useSavePaymentMethod } from "@/hooks/use-account-saved";
import type { SavedPaymentMethod } from "@/types/account-saved";
import { CardDetailsPanel, type NewCardDetails } from "./card-details-panel";
import { PaymentMethodPanel, type CheckoutPaymentChoice } from "./payment-method-panel";

export function CheckoutPaymentStage(props: {
  cards?: SavedPaymentMethod[];
  choice: CheckoutPaymentChoice;
  currency: string;
  selectedCard?: SavedPaymentMethod;
  onCardAdded: (card: SavedPaymentMethod) => void;
  onChange: (choice: CheckoutPaymentChoice) => void;
  onContinue: () => void;
  totalCents: number;
}) {
  const [addingCard, setAddingCard] = useState(false);
  const saveCard = useSavePaymentMethod();
  const cards = props.cards ?? [];
  async function useCard(details: NewCardDetails) {
    const values = { cardholderName: details.cardholderName, brand: details.brand, lastFour: details.lastFour, expiryMonth: details.expiryMonth, expiryYear: details.expiryYear, primary: cards.length === 0 };
    const selected = details.save ? await saveCard.mutateAsync(values) : { ...values, id: "session", createdAt: new Date().toISOString() };
    props.onCardAdded(selected);
    setAddingCard(false);
    props.onContinue();
  }
  if (addingCard) return <CardDetailsPanel onBack={() => setAddingCard(false)} onUseCard={useCard} />;
  return <PaymentMethodPanel cards={cards} choice={props.choice} currency={props.currency} selectedCard={props.selectedCard} onAddCard={() => setAddingCard(true)} onChange={props.onChange} totalCents={props.totalCents} pending={false} onContinue={props.onContinue} />;
}