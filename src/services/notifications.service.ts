"use client";

import { notificationFeedSchema } from "@/lib/schemas/notifications.schema";
import {
  apiMutation,
  apiResponseMessage,
  clientApiBaseUrl,
} from "@/services/client-api";
import type { AccountNotificationFeed } from "@/types/notifications";

export async function getNotifications(): Promise<AccountNotificationFeed> {
  const response = await fetch(
    `${clientApiBaseUrl}/api/account/notifications`,
    { cache: "no-store", credentials: "include" },
  );
  if (!response.ok) throw new Error(await apiResponseMessage(response));
  return notificationFeedSchema.parse(await response.json());
}

export async function markAllNotificationsRead(): Promise<void> {
  await apiMutation("/account/notifications/read-all", { method: "POST" });
}
