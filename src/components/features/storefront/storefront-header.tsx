"use client";

import Link from "next/link";
import { Leaf, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCartQuery } from "@/hooks/use-cart";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Occasions", href: "/#occasions" },
  { label: "Customize", href: "/#customize" },
  { label: "Sustainability", href: "/#impact" },
  { label: "About", href: "/" },
] as const;

export function StorefrontHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: cart } = useCartQuery();
  const cartCount = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur">
      <div className="shell flex h-[72px] items-center gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-semibold text-[var(--brand)]"
          aria-label="EcoGifts home"
        >
          <Leaf aria-hidden="true" size={22} />
          EcoGifts
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--subtle)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Link
            href="/shop#catalog-search"
            className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-white"
            aria-label="Search gifts"
          >
            <Search aria-hidden="true" size={18} />
          </Link>
          <Link
            href="/account/orders"
            className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-white"
            aria-label="Open your account"
          >
            <User aria-hidden="true" size={18} />
          </Link>
          <Link
            href="/cart"
            className={`flex h-11 min-w-11 items-center justify-center gap-1 rounded-xl border px-3 ${pathname === "/cart" ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--line)] bg-white"}`}
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag aria-hidden="true" size={18} />
            {cartCount > 0 && <span className="text-xs font-semibold">{cartCount}</span>}
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto grid size-11 place-items-center rounded-xl border border-[var(--line)] lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="storefront-mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="storefront-mobile-menu"
          className="shell grid gap-1 border-t border-[var(--line)] py-3 lg:hidden"
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
          <Link href="/account/orders" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-[var(--subtle)]">
            Account
          </Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-[var(--subtle)]">
            Cart{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </nav>
      )}
    </header>
  );
}
