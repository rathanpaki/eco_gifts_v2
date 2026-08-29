import type { ContributionCause } from "./contribution.types";

export type AdminImpactStatus = "all" | "pending_verification" | "verified";

export interface AdminImpactItem {
  id: string;
  orderId: string;
  userId: string;
  customerName: string | null;
  customerEmail: string | null;
  cause: ContributionCause;
  amountCents: number;
  rewardPointsEarned: number;
  treeId: string | null;
  createdAt: string;
  status: Exclude<AdminImpactStatus, "all">;
  verifiedAt: string | null;
  verifiedBy: string | null;
}

export interface AdminImpactMetrics {
  total: number;
  pending: number;
  verified: number;
  totalAmountCents: number;
  treeCount: number;
}

export interface AdminImpactTrendPoint {
  month: string;
  label: string;
  amountCents: number;
  contributionCount: number;
}

export interface AdminImpactPage {
  items: AdminImpactItem[];
  metrics: AdminImpactMetrics;
  trend: AdminImpactTrendPoint[];
}

export interface AdminImpactQuery {
  status: AdminImpactStatus;
  cause: "all" | ContributionCause;
  search: string;
}

export interface VerifyImpactInput {
  partnerName?: string;
  partnerLocation?: string;
  plantedDate?: string;
  certificateUrl?: string;
  co2SequestrationKg?: number;
}
