"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { drawCustomizerCanvas } from "@/lib/customizer-canvas";
import { CUSTOMIZATION_IMAGE_MAX_MB, imageUploadError } from "@/lib/image-upload";
import type { PersonalizationDraft } from "@/lib/personalization-draft-storage";
import type { CustomizationDesign, ImageLayer, LayerType, TextLayer } from "@/types/customizer.types";

export function useCanvasCustomizer(
  initial?: CustomizationDesign,
  draft?: PersonalizationDraft | null,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageUrls = useRef(new Map<string, string>());
  const dragStart = useRef<{ x: number; y: number; origX: number; origY: number } | null>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>(() =>
    draft?.textLayers.map((layer) => ({ ...layer })) ??
    initial?.textLayers.map((layer) => ({ ...layer, id: crypto.randomUUID() })) ??
    [],
  );
  const [imageLayers, setImageLayers] = useState<ImageLayer[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<LayerType>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState<string>();
  const draw = useCallback((exporting = false) => { if (canvasRef.current) drawCustomizerCanvas(canvasRef.current, { textLayers, imageLayers, activeId, activeType }, exporting); }, [textLayers, imageLayers, activeId, activeType]);
  useEffect(() => draw(), [draw]);
  useEffect(() => {
    const layers = draft?.imageLayers ?? [];
    if (!layers.length) return;
    let cancelled = false;
    Promise.all(
      layers.map(async (layer) => {
        const image = await loadImage(layer.src);
        return { ...layer, imageElement: image } satisfies ImageLayer;
      }),
    )
      .then((loaded) => { if (!cancelled) setImageLayers(loaded); })
      .catch(() => { if (!cancelled) setImageError("A saved design image could not be restored."); });
    return () => { cancelled = true; };
  }, [draft]);
  useEffect(() => () => imageUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);
  function addTextLayer() {
    const offset = (textLayers.length % 6) * 18;
    const layer: TextLayer = { id: crypto.randomUUID(), text: "", x: 200, y: 120 + offset, fontSize: 22, fontFamily: "DM Serif Display", color: "#49674E", rotation: 0 };
    setTextLayers((current) => [...current, layer]); select(layer.id, "text");
  }
  function updateTextLayer(id: string, updates: Partial<TextLayer>) { setTextLayers((current) => current.map((layer) => layer.id === id ? { ...layer, ...updates } : layer)); }
  function removeTextLayer(id: string) { setTextLayers((current) => current.filter((layer) => layer.id !== id)); if (activeId === id) select(null, null); }
  function uploadImage(file: File) {
    setImageError(undefined);
    const uploadError = imageUploadError(file, CUSTOMIZATION_IMAGE_MAX_MB, "customization image");
    if (uploadError) { setImageError(uploadError); return; }
    if (imageLayers.length >= 20) { setImageError("This design already has the maximum number of images."); return; }
    const id = crypto.randomUUID(); const url = URL.createObjectURL(file); imageUrls.current.set(id, url); const image = new Image();
    image.onload = () => { const ratio = Math.min(150 / image.width, 150 / image.height, 1); const layer: ImageLayer = { id, src: url, x: 200, y: 145, width: image.width * ratio, height: image.height * ratio, scale: 1, rotation: 0, imageElement: image }; setImageLayers((current) => [...current, layer]); select(id, "image"); };
    image.onerror = () => { URL.revokeObjectURL(url); imageUrls.current.delete(id); setImageError("The selected image could not be decoded."); }; image.src = url;
  }
  function updateImageLayer(id: string, updates: Partial<ImageLayer>) { setImageLayers((current) => current.map((layer) => layer.id === id ? { ...layer, ...updates } : layer)); }
  function removeImageLayer(id: string) { const url = imageUrls.current.get(id); if (url) URL.revokeObjectURL(url); imageUrls.current.delete(id); setImageLayers((current) => current.filter((layer) => layer.id !== id)); if (activeId === id) select(null, null); }
  function select(id: string | null, type: LayerType) { setActiveId(id); setActiveType(type); }
  function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
    const point = canvasPoint(event, canvasRef.current); if (!point) return;
    const text = [...textLayers].reverse().find((layer) => Math.abs(point.x - layer.x) < 90 && Math.abs(point.y - layer.y) < 28);
    const image = [...imageLayers].reverse().find((layer) => Math.abs(point.x - layer.x) <= layer.width * layer.scale / 2 + 10 && Math.abs(point.y - layer.y) <= layer.height * layer.scale / 2 + 10);
    const layer = text ?? image; const type: LayerType = text ? "text" : image ? "image" : null; select(layer?.id ?? null, type);
    if (layer) { setIsDragging(true); dragStart.current = { x: point.x, y: point.y, origX: layer.x, origY: layer.y }; }
  }
  function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDragging || !dragStart.current || !activeId) return; const point = canvasPoint(event, canvasRef.current); if (!point) return;
    const x = clamp(dragStart.current.origX + point.x - dragStart.current.x, 0, 400); const y = clamp(dragStart.current.origY + point.y - dragStart.current.y, 0, 300);
    if (activeType === "text") updateTextLayer(activeId, { x, y }); else if (activeType === "image") updateImageLayer(activeId, { x, y });
  }
  async function exportPNG(): Promise<Blob> { const canvas = canvasRef.current; if (!canvas) throw new Error("Customization canvas is unavailable."); draw(true); try { return await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Customization preview could not be created.")), "image/png")); } finally { draw(false); } }
  return { canvasRef, textLayers, imageLayers, imageError, activeId, activeType, activeTextLayer: textLayers.find((layer) => layer.id === activeId) ?? null, activeImageLayer: imageLayers.find((layer) => layer.id === activeId) ?? null, addTextLayer, updateTextLayer, removeTextLayer, uploadImage, updateImageLayer, removeImageLayer, select, handleMouseDown, handleMouseMove, handleMouseUp: () => setIsDragging(false), exportPNG };
}
function canvasPoint(event: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement | null) { if (!canvas) return null; const rect = canvas.getBoundingClientRect(); return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height }; }
function clamp(value: number, minimum: number, maximum: number) { return Math.min(maximum, Math.max(minimum, value)); }
function loadImage(src: string): Promise<HTMLImageElement> { return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src; }); }
