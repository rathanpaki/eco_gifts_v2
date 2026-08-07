import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[650px] bg-[url('/images/landing-hero.jpg')] bg-cover bg-center" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-black/5" />
      <div className="shell relative flex min-h-[650px] items-center justify-center py-16">
        <div className="w-full max-w-[820px] rounded-[28px] bg-[rgba(250,248,243,.91)] px-8 py-12 text-center shadow-xl backdrop-blur-md sm:px-16">
          <h1 id="hero-title" className="serif text-4xl leading-tight sm:text-6xl">The Art of Intentional Giving</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[var(--muted)]">Curated, eco-friendly collections that celebrate life&apos;s moments while honoring the planet. Crafted with care, delivered with purpose.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/#shop" className="rounded-full bg-[var(--brand)] px-7 py-3 text-sm font-semibold text-white">Explore Collections</Link>
            <Link href="/#impact" className="rounded-full border border-[var(--brand)] px-7 py-3 text-sm font-semibold text-[var(--brand)]">Our Impact</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
