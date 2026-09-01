import { Gift, ImagePlus, Leaf, PackageCheck, Sprout } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LandingStep } from "./landing-step";

const steps = [
  [Gift, "Choose a sustainable gift", "Browse eco-certified products."],
  [ImagePlus, "Personalise text & images", "Add names, dates, and photos."],
  [PackageCheck, "Select eco packaging", "Recycled, seed, or cloth wraps."],
  [Sprout, "Add a contribution", "Support trees or conservation."],
  [Leaf, "Earn eco rewards", "Redeem EcoPoints your way."],
] as const;

export function Process() {
  return (
    <section className="bg-[var(--subtle)] py-12 md:py-20">
      <div className="shell text-left md:text-center">
        <ScrollReveal preset="blur-in">
          <p className="eyebrow">Simple process</p>
          <h2 className="section-title mt-3">How EcoGifts works</h2>
        </ScrollReveal>
        <ol className="landing-process-list mt-8 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
          {steps.map(([Icon, title, text], index) => (
            <LandingStep delay={0.08 + index * 0.11} key={title}>
              <span className="landing-process-icon grid size-12 shrink-0 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--brand)] md:size-14">
                <Icon size={22} />
              </span>
              <span className="min-w-0 md:contents">
                <span className="text-[11px] font-semibold text-[var(--brand)] md:mt-3">
                  0{index + 1}
                </span>
                <h3 className="mt-1 text-sm font-semibold md:mt-3">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)] md:mt-2">
                  {text}
                </p>
              </span>
            </LandingStep>
          ))}
        </ol>
      </div>
    </section>
  );
}
