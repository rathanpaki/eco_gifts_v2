import { z } from "zod";

export const notificationFeedSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1),
      category: z.enum(["orders", "reminders", "impact"]),
      title: z.string().min(1),
      body: z.string().min(1),
      createdAt: z.string().datetime(),
      read: z.boolean(),
      href: z.string().startsWith("/"),
      actionLabel: z.string().min(1),
    }),
  ),
  unreadCount: z.number().int().nonnegative(),
});
