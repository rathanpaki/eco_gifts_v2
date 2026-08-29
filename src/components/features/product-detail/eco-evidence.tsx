import type { PublicProduct } from "@/types/catalog";

type EcoEvidenceProps = {
  evidence: PublicProduct["ecoEvidence"];
  ecoScore: number;
  compact?: boolean;
};

export function EcoEvidence({ evidence, ecoScore, compact = false }: EcoEvidenceProps) {
  const items = [
    {
      title: evidence.materialsVerified
        ? "Materials verified"
        : "Material details",
      description: evidence.materialsVerified
        ? "Materials reviewed by EcoGifts"
        : "See the product description",
    },
    {
      title: "Reusable by design",
      description: "Made for a longer useful life",
    },
    {
      title: evidence.packagingVerified
        ? "Plastic-free pack"
        : "Considered packaging",
      description: evidence.packagingVerified
        ? "Packaging standards verified"
        : "Packed with material care",
    },
    {
      title: evidence.contributionVerified
        ? "Contribution verified"
        : `Eco score ${ecoScore} / 100`,
      description: evidence.contributionVerified
        ? "Supports environmental action"
        : "EcoGifts product assessment",
    },
  ];

  const visibleItems = compact ? items.slice(0, 3) : items;
  return (
    <section
      aria-labelledby="eco-evidence-title"
      className={compact ? "rounded-[14px] bg-[#eef4ee] px-[14px] py-3" : "rounded-[18px] bg-[var(--subtle)] px-7 py-6"}
    >
      <h2 id="eco-evidence-title" className={compact ? "text-[13px] font-semibold text-[var(--brand)]" : "sr-only"}>
        {compact ? "Why it’s a lighter choice" : "Verified sustainability evidence"}
      </h2>
      <div className={compact ? "mt-2 grid gap-2" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"}>
        {visibleItems.map(({ title, description }) => (
          <div key={title} className={compact ? "flex items-center gap-2" : undefined}>
            {compact ? <span aria-hidden="true" className="grid size-4 place-items-center rounded-full bg-white text-[10px] text-[var(--brand)]">✓</span> : null}
            <h3 className={compact ? "text-xs text-[var(--muted)]" : "text-sm font-semibold"}>{title}</h3>
            <p className={compact ? "sr-only" : "mt-1 text-xs leading-5 text-[var(--muted)]"}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
