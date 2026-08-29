import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative isolate h-[520px] overflow-hidden sm:h-[620px] lg:h-[650px]"
      aria-labelledby="hero-title"
    >
      <Image
        alt="A thoughtfully arranged collection of sustainable gifts"
        fill
        priority
          src="/images/landing-hero.webp?v=20260829-hero"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="shell relative flex h-full items-center">
        <div className="mx-auto w-full max-w-[650px] rounded-[20px] bg-[rgba(250,248,243,.88)] px-[22px] py-7 text-center shadow-xl backdrop-blur-md sm:mx-0 sm:rounded-[24px] sm:px-12 sm:py-12 sm:text-left">
          <h1
            id="hero-title"
            className="serif text-[38px] leading-[1.12] sm:text-[clamp(48px,6vw,68px)] sm:leading-[1.02]"
          >
            The Art of Intentional Giving
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-[1.45] text-[var(--ink)] sm:mx-0 sm:mt-5 sm:text-[15px] sm:leading-7 sm:text-[var(--muted)]">
            Curated eco-friendly gifts for life&apos;s meaningful moments,
            crafted with care and delivered with purpose.
          </p>
          <div className="mt-6 grid gap-2 sm:mt-7 sm:flex sm:flex-wrap sm:justify-start sm:gap-3">
            <Link
              href="/#shop"
              className="flex min-h-11 items-center justify-center rounded-full bg-[var(--brand)] px-7 py-3 text-sm font-semibold text-white"
            >
              Explore Collections
            </Link>
            <Link
              href="/#impact"
              className="flex min-h-11 items-center justify-center rounded-full border border-[var(--brand)] bg-white/55 px-7 py-3 text-sm font-semibold text-[var(--brand)]"
            >
              Our Impact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
