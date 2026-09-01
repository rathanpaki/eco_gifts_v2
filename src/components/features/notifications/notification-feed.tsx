import Link from "next/link";
import { Bell, ChevronRight } from "lucide-react";
import type { AccountNotification } from "@/types/notifications";

export function NotificationFeed(props: { items: AccountNotification[] }) {
  if (!props.items.length) {
    return (
      <section className="glass-panel grid min-h-[300px] place-items-center rounded-[20px] p-8 text-center">
        <div>
          <Bell
            aria-hidden="true"
            className="mx-auto text-[var(--brand)]"
            size={36}
          />
          <h2 className="serif mt-4 text-2xl">You’re all caught up</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            New account updates will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="glass-panel rounded-[20px] p-4">
      <p className="px-2 pb-3 text-[11px] font-semibold text-[#8a918a]">
        Recent
      </p>
      <div
        className="grid max-h-[620px] gap-2 overflow-y-auto overscroll-contain pr-1"
        tabIndex={0}
        aria-label="Scrollable notification list"
      >
        {props.items.map((item) => (
          <article
            key={item.id}
            className={`grid gap-4 rounded-2xl p-[18px] sm:grid-cols-[28px_minmax(0,1fr)_136px] sm:items-center ${
              item.read ? "bg-[var(--page)]" : "bg-[#eef4ee]"
            }`}
          >
            <span className="flex items-center gap-2 text-[var(--brand)]">
              {!item.read && (
                <span
                  className="size-2 rounded-full bg-[#56825a]"
                  aria-label="Unread"
                />
              )}
              <ChevronRight aria-hidden="true" size={18} />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <p className="mt-1 text-xs leading-[17px] text-[var(--muted)]">
                {item.body}
              </p>
              <time
                className="mt-3 block text-[10px] text-[#8a918a]"
                dateTime={item.createdAt}
              >
                {relativeTime(item.createdAt)}
              </time>
            </div>
            <Link
              href={item.href}
              className="flex h-11 items-center justify-center rounded-xl border border-[#b5c9b6] bg-white text-[13px] font-semibold text-[var(--brand)]"
            >
              {item.actionLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function relativeTime(value: string) {
  const difference = Date.now() - new Date(value).getTime();
  const hours = Math.max(0, Math.floor(difference / 3_600_000));
  if (hours < 1) return "Less than an hour ago";
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}
