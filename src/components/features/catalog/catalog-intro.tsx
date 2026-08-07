import Image from "next/image";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { PublicProduct } from "@/types/catalog";

export function CatalogIntro({ featured }: { featured?: PublicProduct }) {
  const image = featured?.images[0];

  return (
    <section className="grid items-stretch gap-8 lg:grid-cols-[1fr_500px] lg:gap-12">
      <div className="flex flex-col justify-center">
        <p className="eyebrow">Home / Shop</p>
        <h1 className="serif mt-4 max-w-[650px] text-[clamp(42px,5vw,64px)] leading-[1.02] tracking-[-0.02em]">
          Gifts chosen with<br className="hidden sm:block" /> care, not compromise.
        </h1>
        <p className="mt-4 max-w-[540px] text-base leading-6 text-[var(--muted)]">
          Explore considered gifts with transparent materials, packaging, and contribution details.
        </p>
      </div>

      {featured && image ? (
        <article className="relative min-h-[220px] overflow-hidden rounded-[20px] bg-[var(--subtle)]">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            loading="eager"
            unoptimized={shouldBypassImageOptimization(image.url)}
            className="object-cover"
            sizes="(min-width: 1024px) 500px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]">
              Featured / {featured.category}
            </p>
            <h2 className="serif mt-2 text-3xl leading-tight">{featured.name}</h2>
          </div>
        </article>
      ) : null}
    </section>
  );
}
