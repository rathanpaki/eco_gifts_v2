"use client";

import Link from "next/link";
import { Leaf, Menu, Search, User, X } from "lucide-react";
import { useState } from "react";

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
            href="/sign-in"
            className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-white"
            aria-label="Sign in to your account"
          >
            <User aria-hidden="true" size={18} />
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
          <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-[var(--subtle)]">
            Sign in
          </Link>
        </nav>
      )}
    </header>
  );
}
