import type { OrderSummary } from "./checkout";

export type CustomerConsentFilter = "any" | "opted-in" | "not-opted-in";
export type CustomerOrderFilter = "any" | "none" | "first-time" | "repeat";

export interface AdminCustomerSummary {
  id: string;
  displayName: string;
  email: string | null;
  orderCount: number;
  completedOrderCount: number;
  lifetimeValueCents: number;
  lastOrderAt: string | null;
  marketingOptIn: boolean;
  impactPlasticAvoidedGrams: number;
  createdAt: string;
}

export interface AdminCustomerMetrics {
  totalCustomers: number;
  monthlyChangePercent: number | null;
  repeatPurchaseRate: number;
  emailOptInRate: number;
  averageOrderValueCents: number;
}

export interface AdminCustomerPage {
  items: AdminCustomerSummary[];
  metrics: AdminCustomerMetrics;
  nextCursor: string | null;
}

export interface CustomerNote {
  id: string;
  body: string;
  actorEmail: string | null;
  createdAt: string;
}

export interface AdminCustomer extends AdminCustomerSummary {
  emailVerified: boolean;
  disabled: boolean;
  rewardPoints: number;
  impactCo2SavedKg: number;
  marketingConsentUpdatedAt: string | null;
  contact: { phone: string | null; address: string | null };
  recentOrders: OrderSummary[];
  notes: CustomerNote[];
}

export interface CustomerListInput {
  consent: CustomerConsentFilter;
  orders: CustomerOrderFilter;
  search: string;
}
