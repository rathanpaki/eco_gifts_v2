import { z } from "zod";

export const storeSettingsSchema = z.object({
  storeName: z.string().min(2),
  supportEmail: z.string().email(),
  storefrontActive: z.boolean(),
});
