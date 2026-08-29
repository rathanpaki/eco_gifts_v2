"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import { apiMutation } from "@/services/client-api";
import styles from "./admin-shell.module.css";
import { useStoreSettings } from "@/hooks/use-store-settings";

const items = [
  { label: "Dashboard", href: "/admin", enabled: true },
  { label: "Orders", href: "/admin/orders", enabled: true },
  { label: "Products", href: "/admin/products", enabled: true },
  { label: "Customers", href: "/admin/customers", enabled: true },
  { label: "Impact reports", href: "/admin/impact", enabled: true },
  { label: "Promotions", href: "/admin/promotions", enabled: true },
  { label: "Settings", href: "/admin/settings", enabled: true },
];

export function AdminSidebar({ operator }: { operator: string }) {
  const path = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const store = useStoreSettings();
  const [pending, setPending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className={styles.topRow}>
        <Link className={styles.brand} href="/admin">
          {store.data?.storeName ?? "EcoGifts"} Admin
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="admin-navigation-links"
          aria-label={menuOpen ? "Close admin navigation" : "Open admin navigation"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>
      <p className={`${styles.eyebrow} ${menuOpen ? styles.mobileOpen : ""}`}>Operations</p>
      <nav
        id="admin-navigation-links"
        className={menuOpen ? styles.navOpen : undefined}
        onClick={() => setMenuOpen(false)}
      >
        {items.map((item) => (
          <NavItem item={item} path={path} key={item.href} />
        ))}
      </nav>
      <div className={`${styles.account} ${menuOpen ? styles.accountOpen : ""}`}>
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
  const productInventory =
    item.href === "/admin/products" && path === "/admin/inventory";
  const active =
    productInventory ||
    (item.href === "/admin" ? path === item.href : path.startsWith(item.href));
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
