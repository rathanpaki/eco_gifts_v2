import type { CartItem } from "./cart";

export type PackagingOptionId =
  "recycled-box" | "seed-paper-wrap" | "zero-waste-cloth";
export type DeliveryOptionId = "standard" | "green-logistics";

export interface PackagingOption {
  id: PackagingOptionId;
  name: string;
  description: string;
  priceCents: number;
  co2SavingsKg: number;
  plasticAvoidedGrams: number;
  ecoBonusPoints: number;
}

export interface DeliveryOption {
  id: DeliveryOptionId;
  name: string;
  description: string;
  priceCents: number;
  co2OffsetKg: number;
  ecoBonusPoints: number;
  estimatedDays: string;
}

export interface CheckoutImpact {
  score: number;
  grade: "A+" | "A" | "B" | "C";
  co2SavedKg: number;
  plasticAvoidedGrams: number;
  methodologyVersion: string;
  estimated: true;
}

export interface CheckoutQuote {
  items: CartItem[];
  packagingOptions: PackagingOption[];
  deliveryOptions: DeliveryOption[];
  packaging: PackagingOption;
  delivery: DeliveryOption;
  subtotalCents: number;
  totalCents: number;
  currency: string;
  impact: CheckoutImpact;
  paymentMethod: "pay_on_delivery";
}

export interface DeliveryAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode: string;
  countryCode: string;
  phone?: string;
}

export interface PlaceOrderInput {
  idempotencyKey: string;
  packagingId: PackagingOptionId;
  deliveryId: DeliveryOptionId;
  paymentMethod: "pay_on_delivery";
  address: DeliveryAddress;
}

export interface OrderItem {
  itemId: string;
  productId: string;
  slug: string;
  name: string;
  image: { url: string; alt: string } | null;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
  ecoScore: number;
  customization: { id: string; previewPath: string } | null;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type FulfillmentStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderTimelineEvent {
  id: string;
  status: FulfillmentStatus;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  address: DeliveryAddress;
  packaging: PackagingOption;
  delivery: DeliveryOption;
  impact: CheckoutImpact;
  subtotalCents: number;
  totalCents: number;
  currency: string;
  paymentMethod: "pay_on_delivery";
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  history: OrderTimelineEvent[];
  createdAt: string;
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalQuantity: number;
  totalCents: number;
  currency: string;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  estimatedDelivery: string;
  impact: CheckoutImpact;
  createdAt: string;
}

export interface OrderHistoryPage {
  items: OrderSummary[];
  nextCursor: string | null;
}
