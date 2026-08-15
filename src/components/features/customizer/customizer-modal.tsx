"use client";

import { Check, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCanvasCustomizer } from "@/hooks/use-canvas-customizer";
import { useCreateCustomization } from "@/hooks/use-customization";
import { customizationDesign } from "@/lib/customization-design";
import type { SavedCustomization } from "@/types/customizer.types";
import { CanvasStage } from "./canvas-stage";
import { ImageControls } from "./image-controls";
import { TextControls } from "./text-controls";

interface CustomizerModalProps {
  productId: string;
  productName: string;
  onClose: () => void;
  onApply: (customization: SavedCustomization) => void;
}

export function CustomizerModal({
  productId,
  productName,
  onClose,
  onApply,
}: CustomizerModalProps) {
  const editor = useCanvasCustomizer();
  const save = useCreateCustomization();
  const [exportError, setExportError] = useState<string>();
  const hasContent =
    editor.textLayers.some(
      (layer) => typeof layer.text === "string" && layer.text.trim().length > 0,
    ) ||
    Boolean(editor.imageLayer);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !save.isPending) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, save.isPending]);

  const handleSave = async () => {
    setExportError(undefined);
    try {
      const preview = await editor.exportPNG();
      const saved = await save.mutateAsync({
        productId,
        preview,
        design: customizationDesign(editor.textLayers, editor.imageLayer),
      });
      onApply(saved);
    } catch (error) {
      if (!save.error) {
        setExportError(
          error instanceof Error ? error.message : "The design could not be saved.",
        );
      }
    }
  };
  const error = exportError ?? save.error?.message;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[var(--page)] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customizer-title"
      >
        <header className="flex items-center justify-between border-b border-[var(--line)] bg-white px-6 py-4">
          <div>
            <h2 id="customizer-title" className="flex items-center gap-2 text-lg font-bold">
              <Sparkles size={18} className="text-[var(--brand)]" /> Personalize your gift
            </h2>
            <p className="text-xs text-[var(--muted)]">Designing {productName}</p>
          </div>
          <button
            type="button"
            aria-label="Close personalizer"
            disabled={save.isPending}
            onClick={onClose}
            className="rounded-full p-2 text-[var(--muted)] hover:bg-[var(--subtle)] disabled:opacity-40"
          >
            <X size={20} />
          </button>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-12">
          <div className="flex flex-col justify-center md:col-span-7">
            <CanvasStage
              canvasRef={editor.canvasRef}
              onMouseDown={editor.handleMouseDown}
              onMouseMove={editor.handleMouseMove}
              onMouseUp={editor.handleMouseUp}
              surfaceLabel={`Print area - ${productName}`}
            />
          </div>
          <div className="flex flex-col gap-4 md:col-span-5">
            <TextControls
              activeTextLayer={editor.activeTextLayer}
              canAddText={editor.textLayers.length < 10}
              onAddText={editor.addTextLayer}
              onUpdateText={editor.updateActiveText}
              onRemoveText={editor.removeActiveText}
            />
            <ImageControls
              imageLayer={editor.imageLayer}
              imageError={editor.imageError}
              onUploadImage={editor.uploadImage}
              onUpdateImage={editor.updateActiveImage}
              onClearImage={editor.clearImageLayer}
            />
          </div>
        </div>

        <footer className="border-t border-[var(--line)] bg-white px-6 py-4">
          {error && <p className="mb-3 text-right text-xs text-red-700" role="alert">{error}</p>}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              disabled={save.isPending}
              onClick={onClose}
              className="rounded-xl border border-[var(--line)] px-4 py-2 text-xs font-semibold disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!hasContent || save.isPending}
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={16} /> {save.isPending ? "Saving securely..." : "Save design"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
