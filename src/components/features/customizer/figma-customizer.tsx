"use client";

import { useEffect, useState } from "react";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { useCanvasCustomizer } from "@/hooks/use-canvas-customizer";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useCreateCustomization, useUpdateCustomization } from "@/hooks/use-customization";
import { useAddWishlistProduct } from "@/hooks/use-wishlist";
import { customizationDesign } from "@/lib/customization-design";
import { loadPersonalizationDraft, savePersonalizationDraft } from "@/lib/personalization-draft-storage";
import type { SavedCustomization } from "@/types/customizer.types";
import { PersonalizerCanvasPreview } from "./personalizer-canvas-preview";
import { PersonalizerImageLayers } from "./personalizer-image-layers";
import { PersonalizerProgress } from "./personalizer-progress";
import { PersonalizerTextLayers } from "./personalizer-text-layers";

interface CustomizerModalProps { imageUrl?: string; initial?: SavedCustomization | null; productId: string; productName: string; onClose: () => void; onApply: (customization: SavedCustomization) => void | Promise<void> }
export function CustomizerModal(props: CustomizerModalProps) {
  const onClose = props.onClose;
  const [draft] = useState(() => props.initial ? loadPersonalizationDraft(props.initial.id) : null);
  const editor = useCanvasCustomizer(props.initial?.design, draft);
  const create = useCreateCustomization();
  const update = useUpdateCustomization();
  const wishlist = useAddWishlistProduct();
  const [destination, setDestination] = useState<"cart" | "wishlist">();
  const [localError, setLocalError] = useState<string>();
  const hasContent = editor.textLayers.some((layer) => layer.text.trim()) || editor.imageLayers.length > 0;
  useBodyScrollLock(true);
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === "Escape" && !create.isPending && !update.isPending) onClose(); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [onClose, create.isPending, update.isPending]);
  async function handleSave(target: "cart" | "wishlist") {
    setDestination(target); setLocalError(undefined);
    try {
      const preview = await editor.exportPNG();
      const input = { productId: props.productId, preview, design: customizationDesign(editor.textLayers, editor.imageLayers) };
      const saved = props.initial
        ? await update.mutateAsync({ ...input, id: props.initial.id })
        : await create.mutateAsync(input);
      await savePersonalizationDraft(saved.id, editor.textLayers, editor.imageLayers);
      if (target === "wishlist") { await wishlist.mutateAsync({ productId: props.productId, customizationId: saved.id }); props.onClose(); }
      else await props.onApply(saved);
    } catch (reason) { setLocalError(reason instanceof Error ? reason.message : "The personalization could not be saved."); }
    finally { setDestination(undefined); }
  }
  const pending = Boolean(destination) || create.isPending || update.isPending || wishlist.isPending;
  const error = localError ?? create.error?.message ?? update.error?.message ?? wishlist.error?.message;
  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--page)]" role="dialog" aria-modal="true" aria-labelledby="personalizer-title">
      <StorefrontHeader />
      <main className="px-5 pb-[52px] pt-5 sm:px-8 sm:pt-9 lg:px-[72px]"><div className="mx-auto max-w-[1296px]">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-start"><div className="min-w-0 flex-1"><p className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] lg:block">Make it yours</p><h1 id="personalizer-title" className="serif mt-2 text-[34px] leading-none sm:text-[clamp(36px,4vw,40px)]">Every gift tells your story</h1><p className="mt-3 text-sm leading-5 text-[var(--muted)]">Add any text or images you want. Your preview updates as you edit.</p></div><PersonalizerProgress /></header>
        <div className="mt-5 grid items-start gap-6 xl:mt-[30px] xl:grid-cols-[560px_600px] xl:gap-14"><div className="order-2 xl:order-1"><PersonalizerTextLayers layers={editor.textLayers} activeId={editor.activeType === "text" ? editor.activeId : null} onAdd={editor.addTextLayer} onRemove={editor.removeTextLayer} onSelect={(id) => editor.select(id, "text")} onUpdate={editor.updateTextLayer} /><PersonalizerImageLayers layers={editor.imageLayers} activeId={editor.activeType === "image" ? editor.activeId : null} error={editor.imageError} onRemove={editor.removeImageLayer} onSelect={(id) => editor.select(id, "image")} onUpdate={editor.updateImageLayer} onUpload={editor.uploadImage} />{error ? <p className="mt-3 text-xs text-red-700" role="alert">{error}</p> : null}<div className="mt-4 flex gap-3"><button type="button" disabled={!hasContent || pending} onClick={() => void handleSave("wishlist")} className="h-11 rounded-xl border border-[var(--line)] px-[18px] text-sm font-semibold disabled:opacity-50">{destination === "wishlist" ? "Saving..." : "Save for later"}</button><button type="button" disabled={!hasContent || pending} onClick={() => void handleSave("cart")} className="h-11 flex-1 rounded-xl bg-[var(--brand)] px-[22px] text-sm font-semibold text-white disabled:opacity-50">{destination === "cart" ? "Saving personalization..." : "Review personalization"}</button></div><button type="button" onClick={props.onClose} disabled={pending} className="mt-3 text-xs font-semibold text-[var(--muted)] underline underline-offset-4">Return to product without saving</button></div><div className="order-1 xl:order-2"><PersonalizerCanvasPreview canvasRef={editor.canvasRef} onMouseDown={editor.handleMouseDown} onMouseMove={editor.handleMouseMove} onMouseUp={editor.handleMouseUp} /></div></div>
      </div></main>
    </div>
  );
}
