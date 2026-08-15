import type { FulfillmentStatus, Order, PaymentStatus } from "./checkout";

export type AdminOrderFilter = "all" | FulfillmentStatus;

export interface AdminOrderSummary {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string | null;
  totalCents: number;
  currency: string;
  itemCount: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  createdAt: string;
}

export interface AdminOrderEvent {
  id: string;
  status: FulfillmentStatus;
  fromStatus: FulfillmentStatus | null;
  note: string | null;
  actorId: string;
  actorEmail: string | null;
  actorType: "user" | "admin";
  createdAt: string;
}

export interface AdminOrder extends Order {
  customerName: string;
  customerEmail: string | null;
  allowedTransitions: FulfillmentStatus[];
  events: AdminOrderEvent[];
}

export interface AdminOrderMetrics {
  total: number;
  pending: number;
  confirmed: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export interface AdminOrderPage {
  items: AdminOrderSummary[];
  metrics: AdminOrderMetrics;
  nextCursor: string | null;
}
