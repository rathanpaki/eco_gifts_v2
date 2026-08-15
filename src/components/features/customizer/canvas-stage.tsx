"use client";

import React from "react";
import { Move, Info } from "lucide-react";

interface CanvasStageProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  surfaceLabel?: string;
}

export function CanvasStage({
  canvasRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  surfaceLabel = "Eco Surface Boundary",
}: CanvasStageProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
      <div className="flex w-full items-center justify-between text-xs text-[var(--muted)]">
        <span className="font-semibold text-[var(--brand)]">{surfaceLabel}</span>
        <span className="flex items-center gap-1">
          <Move size={13} /> Interactive Canvas (400 x 300)
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--page)] shadow-inner">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="cursor-move touch-none"
          aria-label="Personalization Canvas"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
          <div className="h-full w-px bg-[var(--brand)]" />
          <div className="absolute h-px w-full bg-[var(--brand)]" />
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
        <Info size={14} className="text-[var(--brand-soft)]" />
        Drag elements to position. Boundary dotted lines indicate safe print zone.
      </p>
    </div>
  );
}
