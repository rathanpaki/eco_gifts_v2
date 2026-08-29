"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import type { PublicProduct } from "@/types/catalog";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { WishlistCard } from "./wishlist-card-v2";

type SortChoice = "saved" | "price-low" | "price-high" | "name";

export function WishlistPage() {
  const wishlist = useWishlist();
  const [sort, setSort] = useState<SortChoice>("saved");
  const products = useMemo(
    () => sortProducts(wishlist.data ?? [], sort),
    [sort, wishlist.data],
  );
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--page)] px-5 pb-20 pt-7 sm:min-h-[calc(100vh-72px)] sm:px-6 sm:pt-[54px]">
      <div className="mx-auto max-w-[1280px]">
        <nav
          className="text-[10px] text-[var(--muted)]"
          aria-label="Breadcrumb"
        >
          <Link href="/account">Account</Link> /{" "}
          <span aria-current="page">Wishlist</span>
        </nav>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-5 sm:mt-12">
          <div>
            <h1 className="serif text-[34px] leading-none sm:text-[40px]">Saved for later</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Keep thoughtful options together until the moment feels right.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 items-center gap-3 sm:flex sm:w-auto">
            <span className="rounded-full bg-[#eef4ee] px-4 py-3 text-[11px] font-semibold text-[var(--brand)]">
              {products.length} saved gifts
            </span>
            <label className="sr-only" htmlFor="wishlist-sort">
              Sort saved gifts
            </label>
            <select
              id="wishlist-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortChoice)}
              className="h-11 min-w-0 rounded-xl border border-[var(--line)] bg-[var(--page)] px-3 text-xs outline-none sm:px-4"
            >
              <option value="saved">Sort: Recently saved</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {wishlist.isPending ? (
          <LogoDrawLoader className="mt-7" label="Loading your wishlist" />
        ) : wishlist.error ? (
          <section className="mt-7 rounded-2xl border border-red-200 p-6">
            <p className="text-sm text-red-700">{wishlist.error.message}</p>
            <button
              type="button"
              onClick={() => void wishlist.refetch()}
              className="mt-3 text-sm font-semibold text-red-700"
            >
              Try again
            </button>
          </section>
        ) : products.length ? (
          <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <WishlistCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}

        <EmptyState compact={products.length > 0} />
      </div>
    </main>
  );
}

function EmptyState({ compact }: { compact: boolean }) {
  return (
    <section
      className={`mt-7 flex min-h-[180px] flex-col items-center gap-5 rounded-2xl bg-[var(--subtle)] px-5 py-7 sm:flex-row sm:flex-wrap sm:gap-6 sm:px-8 ${compact ? "" : "justify-center text-center"}`}
    >
      <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#eef4ee] text-[var(--brand)]">
        <Heart size={24} aria-hidden="true" />
      </span>
      <div className={compact ? "min-w-0 flex-1" : ""}>
        <h2 className="serif text-[22px]">When there’s nothing saved</h2>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Use “No saved gifts yet. Browse collections and select Save to keep
          ideas here.”
        </p>
      </div>
      <Link
        href="/shop"
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white sm:h-11 sm:w-auto sm:min-w-48"
      >
        Browse collections
      </Link>
    </section>
  );
}

function sortProducts(products: PublicProduct[], sort: SortChoice) {
  const copy = [...products];
  if (sort === "price-low")
    return copy.sort((a, b) => a.priceCents - b.priceCents);
  if (sort === "price-high")
    return copy.sort((a, b) => b.priceCents - a.priceCents);
  if (sort === "name") return copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
}
