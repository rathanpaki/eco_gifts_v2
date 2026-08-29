import Link from "next/link";
import { Leaf, LockKeyhole } from "lucide-react";

export function CheckoutHeader() {
  return (
    <header className="h-16 border-b border-[var(--line)] bg-white sm:h-[76px]">
      <div className="mx-auto flex h-full max-w-[1200px] items-center gap-5 px-4 sm:px-6">
        <Link
          href="/"
          className="serif flex items-center gap-2 text-2xl text-[var(--brand)] sm:font-sans sm:text-xl sm:font-semibold"
          aria-label="EcoGifts home"
        >
          <Leaf className="hidden sm:block" size={22} aria-hidden="true" />
          EcoGifts
        </Link>
        <div className="flex-1" />
        <span className="hidden items-center gap-2 text-[13px] font-semibold text-[var(--brand)] sm:flex">
          <LockKeyhole size={15} aria-hidden="true" />
          Secure checkout
        </span>
        <Link
          href="/cart"
          className="text-[13px] font-medium text-[var(--muted)]"
        >
          Return to cart
        </Link>
      </div>
    </header>
  );
}
