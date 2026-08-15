"use client";

import { LayoutDashboard, LogOut, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiMutation } from "@/services/client-api";

interface AccountSidebarProps {
  email: string | null;
  isAdmin: boolean;
}

export function AccountSidebar({ email, isAdmin }: AccountSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();

  const logout = async () => {
    setPending(true);
    setError(undefined);
    try {
      await apiMutation("/auth/logout", { method: "POST" });
      queryClient.clear();
      router.replace("/sign-in");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Sign out failed.");
      setPending(false);
    }
  };

  return (
    <aside className="h-fit rounded-2xl border border-[var(--line)] bg-white p-4 lg:sticky lg:top-24">
      <div className="border-b border-[var(--line)] px-2 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Account</p>
        <p className="mt-1 truncate text-sm font-semibold">{email ?? "EcoGifts customer"}</p>
      </div>
      <nav className="mt-3 grid gap-1" aria-label="Account navigation">
        <AccountLink active={pathname === "/account/orders"} href="/account/orders">
          <Package size={17} /> Orders
        </AccountLink>
        <AccountLink active={false} href="/shop">
          <ShoppingBag size={17} /> Continue shopping
        </AccountLink>
        {isAdmin && (
          <AccountLink active={false} href="/admin">
            <LayoutDashboard size={17} /> Admin dashboard
          </AccountLink>
        )}
      </nav>
      <button
        type="button"
        disabled={pending}
        onClick={logout}
        className="mt-4 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
      >
        <LogOut size={17} /> {pending ? "Signing out..." : "Sign out"}
      </button>
      {error && <p className="mt-2 px-2 text-xs text-red-700" role="alert">{error}</p>}
    </aside>
  );
}

function AccountLink({
  active,
  children,
  href,
}: {
  active: boolean;
  children: ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold ${active ? "bg-[var(--brand)] text-white" : "hover:bg-[var(--subtle)]"}`}
    >
      {children}
    </Link>
  );
}
