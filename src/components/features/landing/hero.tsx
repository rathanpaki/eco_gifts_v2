import Image from "next/image";
import Link from "next/link";
import {
  FadeOnScroll,
  Parallax,
  ScrollReveal,
  TextReveal,
} from "@/components/ui/scroll-reveal";
import { HeroMotionCard } from "./hero-motion-card";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate h-[540px] overflow-hidden sm:h-[620px] lg:h-[calc(100svh-108px)] lg:min-h-[680px]"
    >
      <Parallax className="absolute inset-0" speed={0.4}>
        <Image
          alt="A thoughtfully arranged collection of sustainable gifts"
          className="landing-hero-image object-cover object-center"
          fill
          priority
          sizes="100vw"
          src="/images/landing-hero.webp?v=20260829-hero"
        />
      </Parallax>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,30,23,.12),rgba(20,30,23,.24))]" />
      <FadeOnScroll className="shell relative flex h-full items-center justify-center py-8">
        <ScrollReveal className="w-full max-w-[720px]" distance={42} preset="blur-in">
          <HeroMotionCard className="landing-hero-card relative overflow-hidden rounded-[26px] border border-white/55 bg-[rgba(250,248,243,.64)] px-6 py-9 text-center shadow-[0_24px_70px_rgba(18,35,23,.24),inset_0_1px_0_rgba(255,255,255,.72)] backdrop-blur-[22px] backdrop-saturate-150 sm:rounded-[30px] sm:px-14 sm:py-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
            />
            <ScrollReveal delay={0.12} distance={18}>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[.16em] text-[var(--brand)]">
                Thoughtful by nature
              </p>
            </ScrollReveal>
            <TextReveal
              as="h1"
              className="serif text-[40px] leading-[1.08] sm:text-[clamp(50px,6vw,68px)] sm:leading-[1.02]"
              text="The Art of Intentional Giving"
              wordDelay={0.065}
            />
            <ScrollReveal delay={0.34} distance={20}>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#415045] sm:mt-5 sm:text-[15px] sm:leading-7">
                Curated eco-friendly gifts for life&apos;s meaningful moments,
                crafted with care and delivered with purpose.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.48} distance={20}>
              <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
                <Link
                  className="premium-action flex min-h-12 items-center justify-center rounded-full bg-[var(--brand)] px-8 py-3 text-sm font-semibold text-white hover:bg-[#304633]"
                  href="/#shop"
                >
                  Explore Collections
                </Link>
                <Link
                  className="premium-action flex min-h-12 items-center justify-center rounded-full border border-white/70 bg-white/45 px-8 py-3 text-sm font-semibold text-[var(--brand)] backdrop-blur-lg hover:bg-white/70"
                  href="/#impact"
                >
                  Our Impact
                </Link>
              </div>
            </ScrollReveal>
          </HeroMotionCard>
        </ScrollReveal>
      </FadeOnScroll>
    </section>
  );
}
