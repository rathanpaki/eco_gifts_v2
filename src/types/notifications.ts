export type NotificationCategory = "orders" | "reminders" | "impact";

export interface AccountNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  href: string;
  actionLabel: string;
}

export interface AccountNotificationFeed {
  items: AccountNotification[];
  unreadCount: number;
}
