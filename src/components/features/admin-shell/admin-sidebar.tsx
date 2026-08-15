"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiMutation } from "@/services/client-api";
import styles from "@/components/features/admin-shell/admin-shell.module.css";

const items = [
  { label: "Dashboard", href: "/admin", enabled: true },
  { label: "Orders", href: "/admin/orders", enabled: true },
  { label: "Products", href: "/admin/products", enabled: true },
  { label: "Customers", href: "/admin/customers", enabled: true },
  { label: "Impact reports", href: "/admin/impact", enabled: false },
  { label: "Promotions", href: "/admin/promotions", enabled: false },
  { label: "Settings", href: "/admin/settings", enabled: false },
];

export function AdminSidebar({ operator }: { operator: string }) {
  const path = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);
  const logout = async () => {
    setPending(true);
    try {
      await apiMutation("/auth/logout", { method: "POST" });
      queryClient.clear();
      router.replace("/sign-in");
      router.refresh();
    } finally {
      setPending(false);
    }
  };
  return (
    <aside className={styles.sidebar} aria-label="Admin navigation">
      <Link className={styles.brand} href="/admin">
        EcoGifts Admin
      </Link>
      <p className={styles.eyebrow}>Operations</p>
      <nav>
        {items.map((item) => (
          <NavItem item={item} path={path} key={item.href} />
        ))}
      </nav>
      <div className={styles.account}>
        <span>{operator} · Admin</span>
        <button disabled={pending} onClick={logout} type="button">
          {pending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  item,
  path,
}: {
  item: (typeof items)[number];
  path: string;
}) {
  const active =
    item.href === "/admin" ? path === item.href : path.startsWith(item.href);
  if (!item.enabled)
    return (
      <span aria-disabled="true" className={styles.navDisabled}>
        {item.label}
      </span>
    );
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={active ? styles.navActive : styles.navLink}
      href={item.href}
    >
      {item.label}
    </Link>
  );
}
