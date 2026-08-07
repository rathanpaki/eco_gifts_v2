import { StorefrontHeader } from "@/components/features/storefront/storefront-header";

export function CatalogSkeleton() {
  return (
    <>
      <StorefrontHeader />
      <main className="shell animate-pulse py-12" aria-busy="true" aria-label="Loading gifts">
        <div className="grid gap-8 lg:grid-cols-[1fr_500px]">
          <div className="space-y-4 py-6">
            <div className="h-3 w-24 rounded bg-[var(--line)]" />
            <div className="h-14 max-w-xl rounded bg-[var(--line)]" />
            <div className="h-5 max-w-lg rounded bg-[var(--line)]" />
          </div>
          <div className="h-[220px] rounded-[20px] bg-[var(--line)]" />
        </div>
        <div className="my-9 h-11 max-w-xl rounded-full bg-[var(--line)]" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => <div key={item} className="h-[330px] rounded-[20px] bg-[var(--line)]" />)}
        </div>
      </main>
    </>
  );
}
