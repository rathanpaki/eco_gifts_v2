import { z } from "zod";

export const accountAddressSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  fullName: z.string(),
  line1: z.string(),
  line2: z.string().nullable(),
  city: z.string(),
  region: z.string().nullable(),
  postalCode: z.string(),
  country: z.string(),
  countryCode: z.string().length(2),
  phone: z.string().nullable(),
  primary: z.boolean(),
});

export const accountProfileSchema = z.object({
  displayName: z.string(),
  email: z.string().email().nullable(),
  emailVerified: z.boolean(),
  phone: z.string().nullable(),
  phoneVerified: z.boolean(),
  avatarUrl: z.string().url().nullable(),
  addresses: z.array(accountAddressSchema),
});

export const giftPreferencesSchema = z.object({
  occasions: z.array(
    z.enum(["birthdays", "weddings", "new-baby", "thank-you", "corporate"]),
  ),
  packaging: z.enum(["recycled-sage", "natural-kraft", "fabric-wrap"]),
  cardStyle: z.enum(["elegant", "classic", "modern", "script"]),
  avoidPlasticExtras: z.boolean(),
  occasionReminders: z.boolean(),
  newCollectionUpdates: z.boolean(),
  impactMilestones: z.boolean(),
});

export const phoneVerificationRequestSchema = z.object({
  phone: z.string(),
  alreadyVerified: z.boolean(),
  expiresInSeconds: z.number().int().positive(),
});

export const phoneVerificationResultSchema = z.object({
  phone: z.string(),
  verified: z.literal(true),
});
