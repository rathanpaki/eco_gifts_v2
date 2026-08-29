"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markAllNotificationsRead,
} from "@/services/notifications.service";
import type { AccountNotificationFeed } from "@/types/notifications";

export const notificationsKey = ["account-notifications"] as const;

export function useNotifications() {
  return useQuery({
    queryKey: notificationsKey,
    queryFn: getNotifications,
    staleTime: 30_000,
  });
}

export function useMarkAllNotificationsRead() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () =>
      client.setQueryData<AccountNotificationFeed>(
        notificationsKey,
        (current) =>
          current
            ? {
                items: current.items.map((item) => ({ ...item, read: true })),
                unreadCount: 0,
              }
            : current,
      ),
  });
}
