"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiMutation } from "@/services/client-api";

const accountLinks = [
  { label: "Overview", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Gift profiles", href: "/account/gift-profiles" },
  { label: "Preferences", href: "/account/preferences" },
  { label: "My impact", href: "/account/impact" },
  { label: "Notifications", href: "/account/notifications" },
  { label: "Settings", href: "/account/settings" },
];

export function FigmaAccountSidebar(props: {
  displayName: string | null;
  email: string | null;
  isAdmin: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const client = useQueryClient();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();

  async function logout() {
    setPending(true);
    setError(undefined);
    try {
      await apiMutation("/auth/logout", { method: "POST" });
      client.clear();
      router.replace("/sign-in");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Sign out failed.");
      setPending(false);
    }
  }

  return (
    <>
    <aside className="order-1 hidden h-fit rounded-2xl bg-[var(--subtle)] p-3 lg:sticky lg:top-24 lg:block lg:min-h-[652px] lg:p-5">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
        My EcoGifts
      </h2>
      <nav className="mt-2 flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-1" aria-label="Account navigation">
        {accountLinks.map((link) => {
          const active =
            link.href === "/account"
              ? pathname === link.href
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`flex h-10 shrink-0 items-center rounded-[10px] px-4 text-xs lg:h-11 lg:px-3 ${
                active
                  ? "bg-[var(--brand)] font-semibold text-white"
                  : "font-medium text-[var(--ink)] hover:bg-white/60"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        {props.isAdmin && (
          <Link
            href="/admin"
            className="flex h-10 shrink-0 items-center rounded-[10px] px-4 text-xs font-medium text-[#616861] hover:bg-white/60 lg:h-11 lg:px-3"
          >
            Admin dashboard
          </Link>
        )}
      </nav>
      <button
        type="button"
        disabled={pending}
        onClick={logout}
        className="mt-3 flex h-10 w-full items-center rounded-[10px] px-3 text-left text-xs font-medium text-[#616861] hover:bg-white/60 disabled:opacity-50 lg:mt-8 lg:h-11"
      >
        {pending ? "Signing out..." : "Sign out"}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </aside>
    <div className="order-3 lg:hidden">
      <button type="button" disabled={pending} onClick={logout} className="flex h-12 w-full items-center justify-center rounded-xl border border-[var(--muted)] bg-[var(--subtle)] text-sm font-semibold text-[var(--brand)] disabled:opacity-50">{pending ? "Signing out..." : "Sign out of this account"}</button>
      {error ? <p className="mt-2 text-xs text-red-700" role="alert">{error}</p> : null}
    </div>
    </>
  );
}
