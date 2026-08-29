"use client";

import { useState } from "react";
import {
  selectedColor,
  selectedStyle,
  type PersonalizerColorId,
  type PersonalizerStyleId,
} from "./personalizer-options";

interface PersonalizerPreviewProps {
  names: string;
  message: string;
  styleId: PersonalizerStyleId;
  colorId: PersonalizerColorId;
}

export function PersonalizerPreview(props: PersonalizerPreviewProps) {
  const [side, setSide] = useState<"front" | "back">("front");
  const style = selectedStyle(props.styleId);
  const color = selectedColor(props.colorId);

  return (
    <section
      aria-labelledby="live-preview-title"
      className="w-full max-w-[600px] rounded-3xl bg-[var(--subtle)] p-5 sm:p-8"
    >
      <div className="flex h-8 items-center justify-between">
        <h2
          id="live-preview-title"
          className="text-xs font-semibold uppercase text-[var(--muted)]"
        >
          Live preview
        </h2>
        <div className="flex h-8 w-[136px] rounded-[10px] border border-[var(--line)] bg-[var(--page)] p-1">
          {(["front", "back"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={side === option}
              onClick={() => setSide(option)}
              className={`h-6 flex-1 rounded-[7px] text-[11px] font-semibold capitalize ${
                side === option
                  ? "bg-[#eef4ee] text-[var(--brand)]"
                  : "text-[#616861]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-[18px] flex h-[420px] flex-col items-center justify-center gap-3.5 rounded-[22px] border border-[#b5c9b6] bg-[var(--page)] p-8 text-center shadow-[0_10px_28px_rgba(0,0,0,.1)]">
        {side === "front" ? (
          <>
            <p className="text-[11px] font-semibold text-[var(--muted)]">
              PERSONALISED FOR
            </p>
            <p
              className={`text-4xl ${style.className}`}
              style={{ color: color.value }}
            >
              {props.names || "Your names"}
            </p>
            <p className="max-w-[390px] text-sm text-[var(--muted)]">
              {props.message || "Your personal message"}
            </p>
          </>
        ) : (
          <>
            <p className="text-[11px] font-semibold text-[var(--muted)]">
              A GIFT CHOSEN WITH CARE
            </p>
            <p className="serif text-3xl text-[var(--brand)]">EcoGifts</p>
            <p className="text-sm text-[var(--muted)]">
              Made thoughtfully for the moments that matter.
            </p>
          </>
        )}
      </div>

      <div className="mt-[18px] flex h-[46px] items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--page)] px-3.5 text-xs">
        <span className="font-medium text-[#616861]">
          FSC-certified card · Soy-based ink
        </span>
        <span className="font-semibold text-[var(--brand)]">Proof ready</span>
      </div>
    </section>
  );
}
