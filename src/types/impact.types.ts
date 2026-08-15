export type EcoGrade = "A+" | "A" | "B" | "C";

export type KnownMaterial = "bamboo" | "organic_cotton" | "seed_paper" | "wood" | "recycled_plastic" | "standard";

export interface MaterialImpact {
  material: KnownMaterial | string;
  percentage: number;
}

export interface PackagingOption {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  co2SavingsKg: number;
  plasticAvoidedGrams: number;
  ecoBonusPoints: number;
}

export interface LogisticsOption {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  co2OffsetKg: number;
  ecoBonusPoints: number;
  estimatedDays: string;
}

export interface EcoScoreInput {
  materials?: MaterialImpact[];
  packagingId?: string;
  logisticsId?: string;
  baseWeightGrams?: number;
}

export interface EcoScoreResult {
  score: number;
  grade: EcoGrade;
  co2SavedKg: number;
  plasticAvoidedGrams: number;
  highlights: string[];
}
