"use client";

import { Image as ImageIcon, RotateCw, Trash2, Upload, ZoomIn } from "lucide-react";
import { useRef } from "react";
import type { ImageLayer } from "@/types/customizer.types";

interface ImageControlsProps {
  imageLayer: ImageLayer | null;
  imageError?: string;
  onUploadImage: (file: File) => void;
  onUpdateImage: (updates: Partial<ImageLayer>) => void;
  onClearImage: () => void;
}

export function ImageControls({
  imageLayer,
  imageError,
  onUploadImage,
  onUpdateImage,
  onClearImage,
}: ImageControlsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[var(--line)] bg-white p-4 shadow-sm">
      <h4 className="flex items-center gap-2 text-sm font-semibold">
        <ImageIcon size={16} className="text-[var(--brand)]" /> Image
      </h4>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onUploadImage(file);
          event.currentTarget.value = "";
        }}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--brand)] bg-[var(--page)] p-3 text-xs font-semibold text-[var(--brand)]"
      >
        <Upload size={15} /> {imageLayer ? "Replace image" : "Upload image"}
      </button>
      <p className="text-[11px] leading-4 text-[var(--muted)]">
        PNG, JPEG, or WebP up to 5 MB. Only the flattened design is stored.
      </p>
      {imageError && (
        <p className="text-xs text-red-700" role="alert">
          {imageError}
        </p>
      )}

      {imageLayer && (
        <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-3">
          <label className="text-xs font-medium text-[var(--muted)]">
            <span className="flex justify-between">
              <span className="flex items-center gap-1"><ZoomIn size={13} /> Scale</span>
              <span>{Math.round(imageLayer.scale * 100)}%</span>
            </span>
            <input
              type="range"
              min={0.25}
              max={2}
              step={0.05}
              value={imageLayer.scale}
              onChange={(event) =>
                onUpdateImage({ scale: Number(event.target.value) })
              }
              className="mt-2 w-full accent-[var(--brand)]"
            />
          </label>
          <label className="text-xs font-medium text-[var(--muted)]">
            <span className="flex justify-between">
              <span className="flex items-center gap-1"><RotateCw size={13} /> Rotation</span>
              <span>{imageLayer.rotation} degrees</span>
            </span>
            <input
              type="range"
              min={-180}
              max={180}
              step={5}
              value={imageLayer.rotation}
              onChange={(event) =>
                onUpdateImage({ rotation: Number(event.target.value) })
              }
              className="mt-2 w-full accent-[var(--brand)]"
            />
          </label>
          <button
            type="button"
            onClick={onClearImage}
            className="flex items-center justify-center gap-1 rounded-lg py-1 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            <Trash2 size={13} /> Remove image
          </button>
        </div>
      )}
    </section>
  );
}
