export type ContributionCause =
  | "Tree Planting"
  | "Carbon Offset"
  | "Wildlife Conservation";

export interface EcoContribution {
  id: string;
  userId?: string;
  cause: ContributionCause;
  amountCents: number;
  treeId: string | null;
  rewardPointsEarned: number;
  createdAt: string;
  status: "pending_verification" | "verified";
}

export interface TreeIDRecord {
  treeId: string;
  cause: ContributionCause;
  plantedDate: string | null;
  partnerName: string | null;
  partnerLocation: string | null;
  gpsCoordinates?: { lat: number; lng: number };
  certificateUrl: string | null;
  co2SequestrationKg: number | null;
  status: "pending_verification" | "verified";
}

export interface RewardVoucher {
  id: string;
  code: string;
  discountCents: number;
  pointsCost: number;
  expiresAt: string;
  isRedeemed: boolean;
}
