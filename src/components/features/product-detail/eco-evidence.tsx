import { BadgeCheck, Box, HandHeart } from "lucide-react";
import type { PublicProduct } from "@/types/catalog";

type EcoEvidenceProps = {
  evidence: PublicProduct["ecoEvidence"];
};

export function EcoEvidence({ evidence }: EcoEvidenceProps) {
  const items = [
    evidence.materialsVerified && {
      title: "Materials verified",
      description: "Product materials reviewed by EcoGifts",
      icon: BadgeCheck,
    },
    evidence.packagingVerified && {
      title: "Packaging verified",
      description: "Packaging standards reviewed by EcoGifts",
      icon: Box,
    },
    evidence.contributionVerified && {
      title: "Contribution verified",
      description: "Environmental contribution evidence reviewed",
      icon: HandHeart,
    },
  ].filter((item): item is Exclude<typeof item, false> => Boolean(item));

  if (!items.length) return null;

  return (
    <section aria-labelledby="eco-evidence-title" className="rounded-[18px] bg-[var(--subtle)] px-7 py-6">
      <h2 id="eco-evidence-title" className="sr-only">Verified sustainability evidence</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex gap-3">
            <Icon className="mt-0.5 shrink-0 text-[var(--brand)]" size={18} aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
