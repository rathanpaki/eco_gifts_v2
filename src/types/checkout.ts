import type { CartItem } from "./cart";
import type { ContributionCause, RewardDiscount } from "./contribution.types";
import type { PromotionDiscount } from "./promotions";

export type PackagingOptionId =
  "recycled-box" | "seed-paper-wrap" | "zero-waste-cloth";
export type DeliveryOptionId = "standard" | "express" | "green-logistics";

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

export interface EcoContributionSummary {
  cause: ContributionCause;
  amountCents: number;
  rewardPointsEarned: number;
  treeId: string | null;
}

export type PaymentMethod = "pay_on_delivery" | "demo_card";

export interface CheckoutQuote {
  items: CartItem[];
  packagingOptions: PackagingOption[];
  deliveryOptions: DeliveryOption[];
  packaging: PackagingOption;
  delivery: DeliveryOption;
  subtotalCents: number;
  personalizationCents: number;
  totalCents: number;
  currency: string;
  impact: CheckoutImpact;
  ecoContribution: EcoContributionSummary | null;
  rewardDiscount: RewardDiscount | null;
  promotionDiscount: PromotionDiscount | null;
  paymentMethod: PaymentMethod;
}

export interface DeliveryAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode: string;
  countryCode: string;
  phone: string;
}

export type OrderAddress = Omit<DeliveryAddress, "phone"> & {
  phone: string | null;
};

export interface PlaceOrderInput {
  idempotencyKey: string;
  packagingId: PackagingOptionId;
  deliveryId: DeliveryOptionId;
  paymentMethod: PaymentMethod;
  address: DeliveryAddress;
  contributionCause?: ContributionCause;
  contributionAmountCents?: number;
  voucherId?: string;
  promoCode?: string;
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
  customization: {
    id: string;
    previewPath: string;
    text: string | null;
  } | null;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type FulfillmentStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type DeliveryConfirmationStatus =
  "not_ready" | "awaiting_customer" | "confirmed";

export interface OrderTimelineEvent {
  id: string;
  status: FulfillmentStatus;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  address: OrderAddress;
  packaging: PackagingOption;
  delivery: DeliveryOption;
  impact: CheckoutImpact;
  ecoContribution: EcoContributionSummary | null;
  rewardDiscount: RewardDiscount | null;
  promotionDiscount: PromotionDiscount | null;
  subtotalCents: number;
  personalizationCents: number;
  totalCents: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  deliveryConfirmationStatus: DeliveryConfirmationStatus;
  deliveryConfirmedAt: string | null;
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
  deliveryConfirmationStatus: DeliveryConfirmationStatus;
  deliveryConfirmedAt: string | null;
  estimatedDelivery: string;
  impact: CheckoutImpact;
  createdAt: string;
}

export interface OrderHistoryPage {
  items: OrderSummary[];
  nextCursor: string | null;
}
