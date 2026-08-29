"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchPublicProducts } from "@/services/catalog-search.service";
import type { PublicProduct } from "@/types/catalog";

export function StorefrontSearchPopover() {
  const [term, setTerm] = useState("");
  const [items, setItems] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const clean = term.trim();

  useEffect(() => {
    if (clean.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      searchPublicProducts(clean, controller.signal)
        .then(setItems)
        .catch((error: unknown) => {
          if (error instanceof Error && error.name !== "AbortError") setItems([]);
        })
        .finally(() => setLoading(false));
    }, 220);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [clean]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-full px-5">
      <form
        action="/shop"
        role="search"
        className="pointer-events-auto relative mx-auto flex h-[52px] w-full max-w-[460px] items-center gap-3 rounded-[14px] border border-[var(--line)] bg-white px-4 shadow-lg md:mr-[max(20px,calc((100%_-_1280px)/2))]"
      >
        <Search aria-hidden="true" size={18} />
        <label htmlFor="header-gift-search" className="sr-only">
          Search gifts
        </label>
        <input
          id="header-gift-search"
          name="search"
          value={term}
          onChange={(event) => {
            const value = event.target.value;
            setTerm(value);
            setLoading(value.trim().length >= 2);
            if (value.trim().length < 2) setItems([]);
          }}
          autoFocus
          maxLength={80}
          placeholder="Search gifts"
          className="min-w-0 flex-1 bg-transparent text-[15px] outline-none"
        />
        <input type="hidden" name="sort" value="newest" />
        <button className="text-xs font-semibold text-[var(--brand)]">
          Search
        </button>
        {clean.length >= 2 ? (
          <div className="absolute inset-x-0 top-[58px] overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-2 shadow-xl">
            {loading ? (
              <p className="px-3 py-4 text-sm text-[var(--muted)]">Searching…</p>
            ) : items.length ? (
              <>
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/shop/${item.slug}`}
                    className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 hover:bg-[var(--subtle)]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{item.name}</span>
                      <span className="text-xs text-[var(--muted)]">{item.category}</span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-[var(--brand)]">
                      {formatPrice(item)}
                    </span>
                  </Link>
                ))}
                <Link
                  href={`/shop?search=${encodeURIComponent(clean)}&sort=newest`}
                  className="mt-1 block rounded-xl bg-[var(--brand)] px-3 py-3 text-center text-xs font-semibold text-white"
                >
                  View all search results
                </Link>
              </>
            ) : (
              <p className="px-3 py-4 text-sm text-[var(--muted)]">No matching gifts yet.</p>
            )}
          </div>
        ) : null}
      </form>
    </div>
  );
}

function formatPrice(product: PublicProduct) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);
}
