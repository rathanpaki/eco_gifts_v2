import { z } from "zod";

export const adminSettingsSchema = z.object({
  storeName: z.string().min(2),
  supportEmail: z.string().email(),
  storefrontActive: z.boolean(),
  newOrderAlerts: z.boolean(),
  paymentFailureAlerts: z.boolean(),
  lowStockDigest: z.boolean(),
  handlingDays: z.number().int().min(1).max(10),
  carbonNeutralDelivery: z.boolean(),
  requireAddressValidation: z.boolean(),
  sessionTimeoutMinutes: z.number().int().min(5).max(1440),
});
