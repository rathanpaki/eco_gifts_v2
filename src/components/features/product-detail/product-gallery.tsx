"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { PublicProduct } from "@/types/catalog";

import { WishlistButton } from "./wishlist-button";

type ProductGalleryProps = {
  images: PublicProduct["images"];
  productId: string;
  productName: string;
  productSlug: string;
  signedIn: boolean;
};

export function ProductGallery({
  images,
  productId,
  productName,
  productSlug,
  signedIn,
}: ProductGalleryProps) {
  const orderedImages = images;
  const [selectedId, setSelectedId] = useState(orderedImages[0]?.id ?? "");
  const selected =
    orderedImages.find((image) => image.id === selectedId) ?? orderedImages[0];
  const selectedIndex = Math.max(
    0,
    orderedImages.findIndex((image) => image.id === selected?.id),
  );
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number, focus = false) => {
    const next = orderedImages[index];
    if (!next) return;
    setSelectedId(next.id);
    thumbnailRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    if (focus) thumbnailRefs.current[index]?.focus();
  };

  if (!selected) {
    return (
      <div className="grid aspect-[8/7] place-items-center rounded-3xl border border-[var(--line)] bg-[var(--subtle)] px-6 text-center text-sm text-[var(--muted)]">
        Product photography is currently unavailable.
      </div>
    );
  }

  return (
    <section aria-label={`${productName} image gallery`}>
      <div className="relative h-[260px] overflow-hidden rounded-[18px] bg-[var(--subtle)] sm:h-auto sm:aspect-[8/7] sm:rounded-3xl">
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
        <WishlistButton
          productId={productId}
          productName={productName}
          productSlug={productSlug}
          signedIn={signedIn}
        />
      </div>
      {orderedImages.length > 1 && (
        <div className="mt-3 flex items-center gap-2.5">
          <ul
            className="flex min-w-0 flex-1 snap-x gap-3 overflow-x-auto scroll-smooth pb-1"
            aria-label="Choose product image"
          >
            {orderedImages.map((image, index) => {
              const active = image.id === selected.id;
              return (
                <li className="shrink-0 snap-start" key={image.id}>
                  <button
                    aria-label={`View image ${index + 1} of ${orderedImages.length}`}
                    aria-pressed={active}
                    className={`relative block h-[72px] w-[88px] overflow-hidden rounded-[10px] border-2 bg-[var(--subtle)] ${active ? "border-[var(--brand)]" : "border-transparent"}`}
                    onClick={() => select(index)}
                    onKeyDown={(event) => {
                      if (
                        event.key !== "ArrowLeft" &&
                        event.key !== "ArrowRight"
                      )
                        return;
                      event.preventDefault();
                      select(
                        index + (event.key === "ArrowRight" ? 1 : -1),
                        true,
                      );
                    }}
                    ref={(node) => {
                      thumbnailRefs.current[index] = node;
                    }}
                    type="button"
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
          {orderedImages.length > 5 && (
            <div className="flex shrink-0 items-center gap-1 rounded-xl border border-[var(--line)] bg-[var(--page)] p-1">
              <button
                aria-label="Previous product image"
                className="grid size-9 place-items-center rounded-lg disabled:opacity-35"
                disabled={selectedIndex === 0}
                onClick={() => select(selectedIndex - 1)}
                type="button"
              >
                <ChevronLeft aria-hidden="true" size={18} />
              </button>
              <span className="min-w-10 text-center text-[11px] font-semibold text-[var(--muted)]">
                {selectedIndex + 1}/{orderedImages.length}
              </span>
              <button
                aria-label="Next product image"
                className="grid size-9 place-items-center rounded-lg disabled:opacity-35"
                disabled={selectedIndex === orderedImages.length - 1}
                onClick={() => select(selectedIndex + 1)}
                type="button"
              >
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
