export interface GiftProfile {
  id: string;
  recipientName: string;
  relationship: string;
  occasion: string;
  importantDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export type GiftProfileValues = Omit<
  GiftProfile,
  "id" | "createdAt" | "updatedAt" | "importantDate" | "notes"
> & {
  importantDate?: string;
  notes?: string;
};

export type CardBrand = "visa" | "mastercard" | "card";

export interface SavedPaymentMethod {
  id: string;
  cardholderName: string;
  brand: CardBrand;
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  primary: boolean;
  createdAt: string;
}

export type PaymentMethodValues = Omit<
  SavedPaymentMethod,
  "id" | "createdAt"
>;