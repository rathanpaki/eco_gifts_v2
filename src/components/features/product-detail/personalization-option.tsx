"use client";

import { Image as ImageIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SavedCustomization } from "@/types/customizer.types";

interface PersonalizationOptionProps {
  productSlug: string;
  signedIn: boolean;
  saved: SavedCustomization | null;
  onPersonalize: () => void;
}

export function PersonalizationOption({
  productSlug,
  signedIn,
  saved,
  onPersonalize,
}: PersonalizationOptionProps) {
  if (!signedIn) {
    const next = `/shop/${encodeURIComponent(productSlug)}`;
    return (
      <Link
        href={`/sign-in?next=${encodeURIComponent(next)}`}
        className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--brand)] px-4 text-sm font-semibold text-[var(--brand)]"
      >
        <Sparkles size={16} /> Sign in to personalize
      </Link>
    );
  }

  if (!saved) {
    return (
      <button
        type="button"
        onClick={onPersonalize}
        className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--brand)] px-4 text-sm font-semibold text-[var(--brand)]"
      >
        <Sparkles size={16} /> Personalize this gift
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white p-3">
      <Image
        unoptimized
        src={saved.previewUrl}
        alt="Saved personalization preview"
        width={96}
        height={72}
        className="h-[72px] w-24 rounded-lg border border-[var(--line)] object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-[var(--brand)]">
          <ImageIcon size={14} /> Design saved securely
        </p>
        <button
          type="button"
          onClick={onPersonalize}
          className="mt-2 text-xs font-semibold underline underline-offset-2"
        >
          Replace design
        </button>
      </div>
    </div>
  );
}
