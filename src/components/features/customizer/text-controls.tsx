"use client";

import { Plus, Trash2, Type } from "lucide-react";
import type { TextLayer } from "@/types/customizer.types";

interface TextControlsProps {
  activeTextLayer: TextLayer | null;
  canAddText: boolean;
  onAddText: () => void;
  onUpdateText: (updates: Partial<TextLayer>) => void;
  onRemoveText: () => void;
}

const FONTS = [
  { label: "Inter", value: "Inter" },
  { label: "DM Serif Display", value: "DM Serif Display" },
  { label: "Playfair Display", value: "Playfair Display" },
  { label: "Script", value: "cursive" },
];

const COLORS = ["#1E4D2B", "#D4AF37", "#C85A32", "#1B2A4A", "#222222"];

export function TextControls({
  activeTextLayer,
  canAddText,
  onAddText,
  onUpdateText,
  onRemoveText,
}: TextControlsProps) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[var(--line)] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-sm font-semibold">
          <Type size={16} className="text-[var(--brand)]" /> Text
        </h4>
        <button
          type="button"
          disabled={!canAddText}
          onClick={() => onAddText()}
          className="flex items-center gap-1 text-xs font-semibold text-[var(--brand)] disabled:opacity-40"
        >
          <Plus size={14} /> Add text
        </button>
      </div>

      {activeTextLayer ? (
        <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-3">
          <label className="text-xs font-medium text-[var(--muted)]">
            Message
            <input
              autoFocus
              type="text"
              maxLength={120}
              value={activeTextLayer.text}
              onChange={(event) => onUpdateText({ text: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
              placeholder="Enter your message"
            />
            <span className="mt-1 block text-right">
              {activeTextLayer.text.length}/120
            </span>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-medium text-[var(--muted)]">
              Font
              <select
                value={activeTextLayer.fontFamily}
                onChange={(event) =>
                  onUpdateText({ fontFamily: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-[var(--line)] bg-white px-2 py-2 text-xs"
              >
                {FONTS.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-medium text-[var(--muted)]">
              Size ({activeTextLayer.fontSize}px)
              <input
                type="range"
                min={12}
                max={48}
                value={activeTextLayer.fontSize}
                onChange={(event) =>
                  onUpdateText({ fontSize: Number(event.target.value) })
                }
                className="mt-2 w-full accent-[var(--brand)]"
              />
            </label>
          </div>

          <div>
            <p className="text-xs font-medium text-[var(--muted)]">Color</p>
            <div className="mt-2 flex gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Use ${color}`}
                  onClick={() => onUpdateText({ color })}
                  style={{ backgroundColor: color }}
                  className={`h-7 w-7 rounded-full border border-black/10 ${activeTextLayer.color === color ? "ring-2 ring-[var(--brand)] ring-offset-2" : ""}`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onRemoveText}
            className="flex items-center justify-center gap-1 rounded-lg py-1 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            <Trash2 size={13} /> Remove selected text
          </button>
        </div>
      ) : (
        <p className="text-xs text-[var(--muted)]">
          Add a message, then drag it into position on the canvas.
        </p>
      )}
    </section>
  );
}
