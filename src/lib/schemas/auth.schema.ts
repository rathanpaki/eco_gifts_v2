import { z } from "zod";

export const sessionUserSchema = z.object({
  uid: z.string().min(1),
  displayName: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.boolean(),
  role: z.enum(["USER", "ADMIN"]),
});
