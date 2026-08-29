import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";

export function EmptyOrderHistory() {
  return (
    <section className="grid place-items-center rounded-2xl border border-[var(--line)] bg-white px-4 py-12 text-center sm:px-6 sm:py-16">
      <span className="grid size-14 place-items-center rounded-full bg-[var(--subtle)] text-[var(--brand)]">
        <PackageOpen aria-hidden="true" />
      </span>
      <h2 className="serif mt-5 text-[28px] sm:text-3xl">No orders yet</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
        Your confirmed EcoGifts orders will appear here after checkout.
      </p>
      <Link href="/shop" className="mt-6 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white">
        Explore gifts
      </Link>
    </section>
  );
}

export function OrderHistoryError({ retry }: { retry: () => void }) {
  return (
    <section className="rounded-2xl border border-red-200 bg-white px-4 py-10 text-center sm:px-6 sm:py-12" role="alert">
      <h2 className="serif text-[28px] sm:text-3xl">Orders could not be loaded</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">Your order records have not been changed.</p>
      <button type="button" onClick={retry} className="mt-5 rounded-xl border border-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand)]">
        Try again
      </button>
    </section>
  );
}

export function OrderHistorySkeleton() {
  return <LogoDrawLoader label="Loading your orders" />;
}
