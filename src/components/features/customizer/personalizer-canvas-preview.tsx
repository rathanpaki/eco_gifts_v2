"use client";

import { useState, type MouseEvent, type RefObject } from "react";

interface PreviewProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onMouseDown: (event: MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (event: MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
}
export function PersonalizerCanvasPreview({ canvasRef, onMouseDown, onMouseMove, onMouseUp }: PreviewProps) {
  const [side, setSide] = useState<"front" | "back">("front");
  return (
    <section aria-labelledby="live-preview-title" className="w-full max-w-[600px] rounded-3xl bg-[var(--subtle)] p-5 sm:p-8">
      <div className="flex h-8 items-center justify-between">
        <h2 id="live-preview-title" className="text-xs font-semibold uppercase text-[var(--muted)]">Live preview</h2>
        <div className="flex h-8 w-[136px] rounded-[10px] border border-[var(--line)] bg-[var(--page)] p-1">
          {(["front", "back"] as const).map((option) => <button key={option} type="button" aria-pressed={side === option} onClick={() => setSide(option)} className={`h-6 flex-1 rounded-[7px] text-[11px] font-semibold capitalize ${side === option ? "bg-[#eef4ee] text-[var(--brand)]" : "text-[#616861]"}`}>{option}</button>)}
        </div>
      </div>
      <div className="mt-[18px] flex min-h-[420px] items-center justify-center rounded-[22px] border border-[#b5c9b6] bg-[var(--page)] p-4 shadow-[0_10px_28px_rgba(0,0,0,.1)]">
        <div className={side === "front" ? "block" : "hidden"}>
          <p className="mb-3 text-center text-[11px] font-semibold text-[var(--muted)]">DRAG ELEMENTS TO POSITION THEM</p>
          <canvas ref={canvasRef} width={400} height={300} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} className="h-auto max-w-full cursor-move rounded-xl border border-[var(--line)] touch-none" aria-label="Interactive personalization preview" />
        </div>
        {side === "back" ? <div className="text-center"><p className="text-[11px] font-semibold text-[var(--muted)]">A GIFT CHOSEN WITH CARE</p><p className="serif mt-3 text-3xl text-[var(--brand)]">EcoGifts</p><p className="mt-3 text-sm text-[var(--muted)]">Made thoughtfully for the moments that matter.</p></div> : null}
      </div>
      <div className="mt-[18px] flex h-[46px] items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--page)] px-3.5 text-xs"><span className="font-medium text-[#616861]">FSC-certified card · Soy-based ink</span><span className="font-semibold text-[var(--brand)]">Proof ready</span></div>
    </section>
  );
}