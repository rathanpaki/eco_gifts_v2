import Link from "next/link";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

export default function ProductNotFound() {
  return (
    <>
      <StorefrontHeader />
      <main className="shell grid min-h-[60vh] place-items-center py-16 text-center">
        <div className="max-w-md">
          <p className="eyebrow">Product unavailable</p>
          <h1 className="serif mt-3 text-4xl">This gift could not be found</h1>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            It may have been removed or is no longer part of the active collection.
          </p>
          <Link href="/shop" className="mt-7 inline-flex min-h-11 items-center rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white">
            Browse available gifts
          </Link>
        </div>
      </main>
    </>
  );
}
