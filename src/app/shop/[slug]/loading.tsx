import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

export default function ProductDetailLoading() {
  return (
    <>
      <StorefrontHeader />
      <main className="shell animate-pulse py-9" aria-busy="true" aria-label="Loading product">
        <div className="mb-8 h-3 w-64 rounded bg-[var(--line)]" />
        <div className="grid gap-10 xl:grid-cols-2 xl:gap-14">
          <div className="aspect-[8/7] rounded-3xl bg-[var(--subtle)]" />
          <div className="space-y-5 py-2">
            <div className="h-12 w-4/5 rounded bg-[var(--line)]" />
            <div className="h-5 w-2/5 rounded bg-[var(--line)]" />
            <div className="h-8 w-24 rounded bg-[var(--line)]" />
            <div className="h-24 rounded bg-[var(--subtle)]" />
            <div className="h-12 rounded-xl bg-[var(--line)]" />
          </div>
        </div>
        <span className="sr-only">Loading product details</span>
      </main>
    </>
  );
}
