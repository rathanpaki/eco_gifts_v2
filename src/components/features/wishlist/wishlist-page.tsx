"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import type { PublicProduct } from "@/types/catalog";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { WishlistCard } from "./wishlist-card";

type SortChoice = "saved" | "price-low" | "price-high" | "name";

export function WishlistPage() {
  const wishlist = useWishlist();
  const [sort, setSort] = useState<SortChoice>("saved");
  const products = useMemo(
    () => sortProducts(wishlist.data ?? [], sort),
    [sort, wishlist.data],
  );

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--page)] px-5 pb-20 pt-8 sm:px-8 lg:px-[80px] lg:pt-[54px]">
      <div className="mx-auto max-w-[1280px]">
        <nav className="text-xs text-[var(--muted)]" aria-label="Breadcrumb">
          <Link href="/account" className="hover:text-[var(--brand)]">
            Account
          </Link>
          <span className="px-2" aria-hidden="true">
            /
          </span>
          <span aria-current="page">Wishlist</span>
        </nav>

        <h1 className="serif mt-8 text-[clamp(38px,5vw,52px)] leading-none">
          Saved for later
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
          Keep thoughtful, lower-impact gifts close until the moment is right.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
          <p className="text-xs font-semibold">
            {products.length} {products.length === 1 ? "gift" : "gifts"} saved
          </p>
          <label className="flex items-center gap-3 text-xs text-[var(--muted)]">
            Sort by
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortChoice)}
              className="h-10 rounded-xl border border-[var(--line)] bg-white px-3 text-xs font-medium text-[var(--ink)] outline-none focus:border-[var(--brand)]"
            >
              <option value="saved">Recently saved</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>

        {wishlist.isPending ? (
          <WishlistLoading />
        ) : wishlist.error ? (
          <WishlistError
            message={wishlist.error.message}
            retry={() => wishlist.refetch()}
          />
        ) : products.length ? (
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <WishlistCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <WishlistEmpty />
        )}
      </div>
    </main>
  );
}

function WishlistEmpty() {
  return (
    <section className="mx-auto grid max-w-[520px] justify-items-center py-24 text-center">
      <span className="grid size-[72px] place-items-center rounded-full bg-[#eef4ee] text-[var(--brand)]">
        <Heart aria-hidden="true" size={28} />
      </span>
      <h2 className="serif mt-6 text-3xl">Your wishlist is ready</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        Save gifts you love and they will appear here for easy comparison.
      </p>
      <Link
        href="/shop"
        className="mt-7 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white"
      >
        Browse sustainable gifts
      </Link>
    </section>
  );
}

function WishlistLoading() {
  return <LogoDrawLoader className="mt-8" label="Loading your wishlist" />;
}

function WishlistError(props: { message: string; retry: () => void }) {
  return (
    <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
      <h2 className="font-semibold text-red-900">Wishlist unavailable</h2>
      <p className="mt-1 text-sm text-red-800">{props.message}</p>
      <button
        type="button"
        onClick={props.retry}
        className="mt-4 text-sm font-semibold text-red-900 underline"
      >
        Try again
      </button>
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
