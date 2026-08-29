import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";

export function EmptyCart() {
  return (
    <section className="mx-auto grid max-w-xl place-items-center px-5 py-24 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-[#eef4ee] text-[var(--brand)]"><ShoppingBag aria-hidden="true" /></span>
      <h1 className="serif mt-5 text-4xl">Your bag is ready for something thoughtful</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Browse the live collection and add a gift when you find the right one.</p>
      <Link href="/shop" className="mt-6 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white">Explore gifts</Link>
    </section>
  );
}

export function CartUnavailable({ retry }: { retry: () => void }) {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center" role="alert">
      <h1 className="serif text-4xl">Your bag could not be loaded</h1>
      <p className="mt-3 text-sm text-[var(--muted)]">The cart service is temporarily unavailable. Your saved cart has not been changed.</p>
      <button type="button" onClick={retry} className="mt-6 rounded-xl border border-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand)]">Try again</button>
    </section>
  );
}

export function CartSkeleton() {
  return <LogoDrawLoader label="Loading your bag" size="page" />;
}
