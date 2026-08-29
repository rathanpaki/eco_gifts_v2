export interface AccountAddress {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2: string | null;
  city: string;
  region: string | null;
  postalCode: string;
  country: string;
  countryCode: string;
  phone: string | null;
  primary: boolean;
}

export interface AccountProfile {
  displayName: string;
  email: string | null;
  emailVerified: boolean;
  phone: string | null;
  phoneVerified: boolean;
  avatarUrl: string | null;
  addresses: AccountAddress[];
}

export interface GiftPreferences {
  occasions: string[];
  packaging: string;
  cardStyle: string;
  avoidPlasticExtras: boolean;
  occasionReminders: boolean;
  newCollectionUpdates: boolean;
  impactMilestones: boolean;
}

export interface ProfileValues {
  displayName: string;
  phone?: string;
}

export interface PhoneVerificationRequest {
  phone: string;
  alreadyVerified: boolean;
  expiresInSeconds: number;
}

export interface PhoneVerificationResult {
  phone: string;
  verified: true;
}

export type AddressValues = Omit<AccountAddress, "id" | "line2" | "region" | "phone"> & {
  line2?: string;
  region?: string;
  phone: string;
};
