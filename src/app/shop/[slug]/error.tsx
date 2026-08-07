"use client";

import { useEffect } from "react";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

type ProductDetailErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductDetailError({ error, reset }: ProductDetailErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <StorefrontHeader />
      <main className="shell grid min-h-[60vh] place-items-center py-16 text-center">
        <div className="max-w-md">
          <p className="eyebrow">Connection issue</p>
          <h1 className="serif mt-3 text-4xl">We could not load this gift</h1>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Please retry the request. Your account and order data have not been changed.
          </p>
          <button type="button" onClick={reset} className="mt-7 min-h-11 rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white">
            Try again
          </button>
        </div>
      </main>
    </>
  );
}
