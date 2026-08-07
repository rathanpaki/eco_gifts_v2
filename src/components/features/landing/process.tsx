import { Gift, ImagePlus, Leaf, PackageCheck, Sprout } from "lucide-react";

const steps = [
  [Gift, "Choose a sustainable gift", "Browse eco-certified products."],
  [ImagePlus, "Personalise text & images", "Add names, dates, and photos."],
  [PackageCheck, "Select eco packaging", "Recycled, seed, or cloth wraps."],
  [Sprout, "Add a contribution", "Support trees or conservation."],
  [Leaf, "Earn eco rewards", "Redeem EcoPoints your way."],
] as const;

export function Process() {
  return (
    <section className="bg-[var(--subtle)] py-20">
      <div className="shell text-center"><p className="eyebrow">Simple process</p><h2 className="section-title mt-3">How EcoGifts works</h2><ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">{steps.map(([Icon, title, text], index) => <li key={title} className="flex flex-col items-center"><span className="grid size-14 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--brand)]"><Icon size={22} /></span><span className="mt-3 text-[11px] text-[var(--muted)]">0{index + 1}</span><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[var(--muted)]">{text}</p></li>)}</ol></div>
    </section>
  );
}
