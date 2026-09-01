"use client";

import Link from "next/link";
import { Heart, Leaf, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { PromotionBanner } from "@/components/features/promotions/promotion-banner";
import { useCartQuery } from "@/hooks/use-cart";
import { useStoreSettings } from "@/hooks/use-store-settings";
import { DesktopNavLinks, MobileNavLinks } from "./storefront-nav-links";
import { StorefrontSearchPopover } from "./storefront-search-popover";

export function StorefrontHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const path = usePathname();
  const { data: cart } = useCartQuery();
  const store = useStoreSettings();
  const cartCount = cart?.totalQuantity ?? 0;
  const acceptingOrders = store.data?.storefrontActive !== false;

  return (
    <>
      <header className="glass-navbar sticky top-0 z-50">
        {acceptingOrders ? <PromotionBanner /> : <PausedBanner />}
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center px-4 sm:h-[72px] sm:w-[calc(100%_-_40px)] sm:gap-[22px] sm:px-0">
          <Link
            aria-label="EcoGifts home"
            className="serif group flex shrink-0 items-center gap-2 text-2xl text-[var(--ink)] transition hover:text-[var(--brand)]"
            href="/"
          >
            <span className="hidden size-8 place-items-center rounded-full bg-white/45 transition duration-500 group-hover:rotate-12 group-hover:scale-110 sm:grid">
              <Leaf aria-hidden="true" size={20} />
            </span>
            {store.data?.storeName ?? "EcoGifts"}
          </Link>

          <DesktopNavLinks />

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <button
              aria-expanded={searchOpen}
              aria-label={searchOpen ? "Close gift search" : "Search gifts"}
              className={`nav-icon glass-soft grid size-11 place-items-center rounded-xl ${searchOpen ? "is-active" : ""}`}
              onClick={() => setSearchOpen((open) => !open)}
              type="button"
            >
              {searchOpen ? <X aria-hidden="true" size={18} /> : <Search aria-hidden="true" size={18} />}
            </button>
            <HeaderAction active={path === "/wishlist"} href="/wishlist" label="Open your wishlist">
              <Heart aria-hidden="true" size={18} />
            </HeaderAction>
            <HeaderAction active={path.startsWith("/account")} href="/account" label="Open your account">
              <User aria-hidden="true" size={18} />
            </HeaderAction>
            <Link
              aria-current={path === "/cart" ? "page" : undefined}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="premium-action flex h-11 min-w-[62px] items-center justify-center gap-1 rounded-xl bg-[var(--brand)] px-3 text-white"
              href="/cart"
            >
              <ShoppingBag aria-hidden="true" size={18} />
              {cartCount ? <span className="text-xs font-semibold">{cartCount}</span> : null}
            </Link>
          </div>

          <div className="ml-auto flex items-center lg:hidden">
            <MobileIcon active={searchOpen} label={searchOpen ? "Close gift search" : "Search gifts"} onClick={() => setSearchOpen((open) => !open)}>
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </MobileIcon>
            <Link aria-label={`Shopping bag with ${cartCount} items`} className={`nav-icon relative grid size-11 place-items-center rounded-xl text-[var(--brand)] ${path === "/cart" ? "is-active" : ""}`} href="/cart">
              <ShoppingBag size={20} />
              {cartCount ? <motion.span animate={{ scale: 1 }} className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-[var(--brand)] text-[10px] font-semibold text-white" initial={{ scale: 0 }}>{Math.min(cartCount, 9)}</motion.span> : null}
            </Link>
            <MobileIcon active={menuOpen} controls="storefront-mobile-menu" expanded={menuOpen} label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </MobileIcon>
          </div>
        </div>

        <AnimatePresence>{searchOpen ? <StorefrontSearchPopover /> : null}</AnimatePresence>
        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.nav
              animate={{ height: "auto", opacity: 1 }}
              className="glass-panel shell grid max-h-[calc(100svh-64px)] gap-1 overflow-y-auto rounded-b-2xl px-3 py-3 lg:hidden"
              exit={{ height: 0, opacity: 0 }}
              id="storefront-mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              transition={{ damping: 25, stiffness: 260, type: "spring" }}
            >
              <MobileNavLinks cartCount={cartCount} close={() => setMenuOpen(false)} />
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}

function HeaderAction({ active, children, href, label }: { active: boolean; children: ReactNode; href: string; label: string }) {
  return <Link aria-current={active ? "page" : undefined} aria-label={label} className={`nav-icon glass-soft grid size-11 place-items-center rounded-xl ${active ? "is-active" : ""}`} href={href}>{children}</Link>;
}

function MobileIcon(props: { active: boolean; children: ReactNode; controls?: string; expanded?: boolean; label: string; onClick: () => void }) {
  return <button aria-controls={props.controls} aria-expanded={props.expanded ?? props.active} aria-label={props.label} className={`nav-icon grid size-11 place-items-center rounded-xl text-[var(--brand)] ${props.active ? "is-active" : ""}`} onClick={props.onClick} type="button">{props.children}</button>;
}

function PausedBanner() {
  return <div className="bg-[#252a26]/95 px-4 py-2 text-center text-[11px] font-medium text-white backdrop-blur">Ordering is temporarily paused. You can still browse the collection.</div>;
}
