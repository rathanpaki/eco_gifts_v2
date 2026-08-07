"use client";

import Image from "next/image";
import { useState } from "react";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { PublicProduct } from "@/types/catalog";

type ProductGalleryProps = {
  images: PublicProduct["images"];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const orderedImages = images;
  const [selectedId, setSelectedId] = useState(orderedImages[0]?.id ?? "");
  const selected = orderedImages.find((image) => image.id === selectedId) ?? orderedImages[0];

  if (!selected) {
    return (
      <div className="grid aspect-[8/7] place-items-center rounded-3xl border border-[var(--line)] bg-[var(--subtle)] px-6 text-center text-sm text-[var(--muted)]">
        Product photography is currently unavailable.
      </div>
    );
  }

  return (
    <section aria-label={`${productName} image gallery`}>
      <div className="relative aspect-[8/7] overflow-hidden rounded-3xl bg-[var(--subtle)]">
        <Image
          key={selected.id}
          src={selected.url}
          alt={selected.alt}
          fill
          loading="eager"
          unoptimized={shouldBypassImageOptimization(selected.url)}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {orderedImages.length > 1 && (
        <ul className="mt-4 flex gap-3 overflow-x-auto pb-1" aria-label="Choose product image">
          {orderedImages.map((image, index) => {
            const active = image.id === selected.id;
            return (
              <li key={image.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(image.id)}
                  aria-label={`View image ${index + 1} of ${orderedImages.length}`}
                  aria-pressed={active}
                  className={`relative block h-[72px] w-[88px] shrink-0 overflow-hidden rounded-[10px] border-2 bg-[var(--subtle)] ${
                    active ? "border-[var(--brand)]" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="88px"
                    unoptimized={shouldBypassImageOptimization(image.url)}
                    className="object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
