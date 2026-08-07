import Link from "next/link";

export function CatalogEmpty({ filtered }: { filtered: boolean }) {
  return (
    <section className="card px-6 py-16 text-center" role="status">
      <h2 className="serif text-3xl">
        {filtered ? "No gifts match those filters" : "Our next collection is being curated"}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
        {filtered
          ? "Try a broader search or clear the selected filters to see the full collection."
          : "Published gifts will appear here as soon as the EcoGifts team makes them available."}
      </p>
      {filtered ? <Link href="/shop" className="mt-6 inline-flex rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white">Clear filters</Link> : null}
    </section>
  );
}

export function CatalogUnavailable() {
  return (
    <section className="card px-6 py-16 text-center" role="alert">
      <h2 className="serif text-3xl">The collection could not be loaded</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
        The catalog service is temporarily unavailable. Please try again in a moment.
      </p>
      <Link href="/shop" className="mt-6 inline-flex rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white">Try again</Link>
    </section>
  );
}
