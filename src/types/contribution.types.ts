export type ContributionCause =
  "Tree Planting" | "Carbon Offset" | "Wildlife Conservation";

export interface EcoContribution {
  id: string;
  userId?: string;
  cause: ContributionCause;
  orderId: string;
  amountCents: number;
  treeId: string | null;
  rewardPointsEarned: number;
  createdAt: string;
  status: "pending_verification" | "verified";
}

export interface TreeIDRecord {
  treeId: string;
  cause: ContributionCause | null;
  plantedDate: string | null;
  partnerName: string | null;
  partnerLocation: string | null;
  gpsCoordinates?: { lat: number; lng: number };
  certificateUrl: string | null;
  co2SequestrationKg: number | null;
  status: "pending_verification" | "verified";
  createdAt: string;
}

export interface EcoImpactSummary {
  rewardPoints: number;
  contributions: EcoContribution[];
  trees: TreeIDRecord[];
  vouchers: RewardVoucher[];
}

export type RewardVoucherStatus = "active" | "redeemed" | "expired";

export interface RewardDiscount {
  voucherId: string;
  code: string;
  amountCents: number;
}

export interface RewardVoucher {
  id: string;
  code: string;
  discountCents: number;
  pointsCost: number;
  createdAt: string;
  expiresAt: string;
  redeemedAt: string | null;
  orderId: string | null;
  status: RewardVoucherStatus;
  isRedeemed: boolean;
}
