"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Occasions", href: "/occasions" },
  { label: "Personalize", href: "/shop?personalizable=true" },
  { label: "Sustainability", href: "/sustainability" },
] as const;

export function DesktopNavLinks() {
  const path = usePathname();
  return (
    <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Main navigation">
      {navigation.map((item) => {
        const active = isActive(item.href, path);
        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={`premium-nav-link ${active ? "is-active" : ""}`}
            href={item.href}
            key={item.label}
          >
            {active ? (
              <motion.span
                className="premium-nav-pill"
                layoutId="storefront-active-route"
                transition={{ damping: 24, stiffness: 320, type: "spring" }}
              />
            ) : null}
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavLinks({ cartCount, close }: { cartCount: number; close: () => void }) {
  const path = usePathname();
  return (
    <>
      {navigation.map((item, index) => (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -12 }}
          key={item.label}
          transition={{ delay: index * 0.035 }}
        >
          <MobileLink active={isActive(item.href, path)} href={item.href} label={item.label} close={close} />
        </motion.div>
      ))}
      <MobileLink active={path === "/wishlist"} href="/wishlist" label="Wishlist" close={close} />
      <details className="glass-soft rounded-xl px-3 py-2 text-sm">
        <summary className="flex min-h-10 cursor-pointer items-center font-semibold text-[var(--brand)]">Account</summary>
        <div className="grid grid-cols-2 gap-1 border-t border-white/60 pt-2">
          {accountLinks.map(([label, href]) => (
            <MobileLink active={path === href} close={close} href={href} key={href} label={label} compact />
          ))}
        </div>
      </details>
      <MobileLink active={path === "/cart"} href="/cart" label={`Cart${cartCount ? ` (${cartCount})` : ""}`} close={close} />
    </>
  );
}

function MobileLink(props: { active: boolean; close: () => void; compact?: boolean; href: string; label: string }) {
  return (
    <Link
      aria-current={props.active ? "page" : undefined}
      className={`${props.compact ? "min-h-10 px-2 text-xs" : "min-h-12 px-3 text-sm"} flex items-center rounded-lg font-medium transition ${props.active ? "glass-nav-active" : "hover:bg-white/55"}`}
      href={props.href}
      onClick={props.close}
    >
      {props.label}
    </Link>
  );
}

function isActive(href: string, path: string) {
  if (href === "/") return path === "/";
  if (href.includes("?") || href.includes("#")) return false;
  return path === href || path.startsWith(`${href}/`);
}

const accountLinks = [
  ["Overview", "/account"], ["Orders", "/account/orders"],
  ["Addresses", "/account/addresses"], ["Preferences", "/account/preferences"],
  ["Impact", "/account/impact"], ["Notifications", "/account/notifications"],
  ["Profile & privacy", "/account/settings"],
] as const;
