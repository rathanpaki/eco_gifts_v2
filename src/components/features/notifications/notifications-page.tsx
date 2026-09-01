"use client";

import { useEffect, useMemo, useState } from "react";
import { useGiftPreferences } from "@/hooks/use-gift-preferences";
import {
  useMarkAllNotificationsRead,
  useNotifications,
} from "@/hooks/use-notifications";
import type { NotificationCategory } from "@/types/notifications";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { NotificationFeed } from "./notification-feed";
import { NotificationSidebar } from "./notification-sidebar";

type Filter = "all" | NotificationCategory;
const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Orders", value: "orders" },
  { label: "Reminders", value: "reminders" },
  { label: "Impact", value: "impact" },
];

export function NotificationsPage() {
  const feed = useNotifications();
  const preferences = useGiftPreferences();
  const mark = useMarkAllNotificationsRead();
  const [filter, setFilter] = useState<Filter>("all");
  const items = useMemo(
    () =>
      (feed.data?.items ?? []).filter(
        (item) => filter === "all" || item.category === filter,
      ),
    [feed.data?.items, filter],
  );

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "m") mark.mutate();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [mark]);

  return (
    <section>
      <header className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-[11px] font-semibold text-[var(--brand)]">
            ACCOUNT UPDATES
          </p>
          <h1 className="serif mt-1 text-[32px] leading-[46px]">
            Notifications
          </h1>
          <p className="text-[13px] text-[var(--muted)]">
            Order updates, thoughtful reminders, and verified impact news.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => mark.mutate()}
            disabled={!feed.data?.unreadCount || mark.isPending}
            className="glass-soft premium-action h-11 w-[142px] rounded-xl text-[13px] font-semibold text-[var(--brand)] disabled:opacity-50"
          >
            {mark.isPending ? "Updating..." : "Mark all read"}
          </button>
          <span className="rounded-full bg-[#f7eee7] px-3 py-2 text-xs font-semibold text-[#c98b3c]">
            ● {feed.data?.unreadCount ?? 0} unread
          </span>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((choice) => (
          <button
            type="button"
            key={choice.value}
            onClick={() => setFilter(choice.value)}
            aria-pressed={filter === choice.value}
            className={`h-9 rounded-full border px-5 text-xs font-medium ${
              filter === choice.value
                ? "border-[#b5c9b6] bg-[#eef4ee] text-[var(--brand)]"
                : "border-[var(--line)] bg-white text-[var(--muted)]"
            }`}
          >
            {choice.label}
          </button>
        ))}
      </div>

      {feed.isPending ? (
        <LogoDrawLoader className="mt-4" label="Loading notifications" />
      ) : feed.error ? (
        <p className="mt-4 rounded-2xl bg-red-50 p-5 text-sm text-red-800">
          {feed.error.message}
        </p>
      ) : (
        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,680px)_316px]">
          <NotificationFeed items={items} />
          <NotificationSidebar preferences={preferences.data} />
        </div>
      )}
    </section>
  );
}
