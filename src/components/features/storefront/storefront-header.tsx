"use client";

import Link from "next/link";
import {
  Heart,
  Leaf,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCartQuery } from "@/hooks/use-cart";
import { PromotionBanner } from "@/components/features/promotions/promotion-banner";
import { PromotionModal } from "@/components/features/promotions/promotion-modal";
import { useStoreSettings } from "@/hooks/use-store-settings";
import { StorefrontSearchPopover } from "./storefront-search-popover";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Occasions", href: "/occasions" },
  { label: "Personalize", href: "/shop?personalizable=true" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "About", href: "/#impact" },
] as const;

export function StorefrontHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: cart } = useCartQuery();
  const store = useStoreSettings();
  const cartCount = cart?.totalQuantity ?? 0;
  const acceptingOrders = store.data?.storefrontActive !== false;

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur">
      {acceptingOrders ? <PromotionBanner /> : (
        <div className="bg-[#252a26] px-4 py-2 text-center text-[11px] font-medium text-white">
          Ordering is temporarily paused. You can still browse the collection.
        </div>
      )}
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-0 px-4 sm:h-[72px] sm:w-[calc(100%_-_40px)] sm:gap-[22px] sm:px-0">
        <Link
          href="/"
          className="serif flex shrink-0 items-center gap-2 text-2xl text-[var(--ink)]"
          aria-label="EcoGifts home"
        >
          <Leaf aria-hidden="true" className="hidden sm:block" size={22} />
          {store.data?.storeName ?? "EcoGifts"}
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 rounded-[10px] px-3 py-2 text-sm transition-colors hover:bg-[var(--subtle)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-white"
            aria-label={searchOpen ? "Close gift search" : "Search gifts"}
            aria-expanded={searchOpen}
          >
            {searchOpen ? (
              <X aria-hidden="true" size={18} />
            ) : (
              <Search aria-hidden="true" size={18} />
            )}
          </button>
          <HeaderAction href="/wishlist" label="Open your wishlist">
            <Heart aria-hidden="true" size={18} />
          </HeaderAction>
          <HeaderAction href="/account/orders" label="Open your account">
            <User aria-hidden="true" size={18} />
          </HeaderAction>
          <Link
            href="/cart"
            className="flex h-11 min-w-[62px] items-center justify-center gap-1 rounded-xl border border-[var(--brand)] bg-[var(--brand)] px-3 text-white"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag aria-hidden="true" size={18} />
            {cartCount > 0 ? (
              <span className="text-xs font-semibold">{cartCount}</span>
            ) : null}
          </Link>
        </div>

        <div className="ml-auto flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="grid size-11 place-items-center text-[var(--brand)]"
            aria-label={searchOpen ? "Close gift search" : "Search gifts"}
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          <Link
            href="/cart"
            className="relative grid size-11 place-items-center text-[var(--brand)]"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 ? <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-[var(--brand)] text-[10px] font-semibold text-white">{Math.min(cartCount, 9)}</span> : null}
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center text-[var(--brand)]"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="storefront-mobile-menu"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {searchOpen ? <StorefrontSearchPopover /> : null}
      {menuOpen ? (
        <nav
          id="storefront-mobile-menu"
          className="shell grid max-h-[calc(100svh-64px)] gap-1 overflow-y-auto border-t border-[var(--line)] bg-white py-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm hover:bg-[var(--subtle)]"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/wishlist" className="rounded-lg px-3 py-3 text-sm">
            Wishlist
          </Link>
          <details className="rounded-xl bg-[var(--subtle)] px-3 py-2 text-sm">
            <summary className="flex min-h-10 cursor-pointer items-center font-semibold text-[var(--brand)]">Account</summary>
            <div className="grid grid-cols-2 gap-1 border-t border-[var(--line)] pt-2">
              {[["Overview", "/account"], ["Orders", "/account/orders"], ["Addresses", "/account/addresses"], ["Preferences", "/account/preferences"], ["Impact", "/account/impact"], ["Notifications", "/account/notifications"], ["Profile & privacy", "/account/settings"]].map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-10 items-center rounded-lg px-2 text-xs hover:bg-white">{label}</Link>)}
            </div>
          </details>
          <Link href="/cart" className="rounded-lg px-3 py-3 text-sm">
            Cart{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </nav>
      ) : null}
    </header>
    {acceptingOrders ? <PromotionModal /> : null}
    </>
  );
}
function HeaderAction({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-white"
      aria-label={label}
    >
      {children}
    </Link>
  );
}
