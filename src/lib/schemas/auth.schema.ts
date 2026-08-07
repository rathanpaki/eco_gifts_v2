import { z } from "zod";

export const sessionUserSchema = z.object({
  uid: z.string().min(1),
  email: z.string().email().nullable(),
  emailVerified: z.boolean(),
  role: z.enum(["USER", "ADMIN"]),
});
