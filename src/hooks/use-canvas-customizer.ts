"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { drawCustomizerCanvas } from "@/lib/customizer-canvas";
import type { ImageLayer, LayerType, TextLayer } from "@/types/customizer.types";

export function useCanvasCustomizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageUrl = useRef<string | null>(null);
  const dragStart = useRef<{ x: number; y: number; origX: number; origY: number } | null>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [imageLayer, setImageLayer] = useState<ImageLayer | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<LayerType>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState<string>();

  const draw = useCallback((exporting = false) => {
    if (canvasRef.current) {
      drawCustomizerCanvas(canvasRef.current, { textLayers, imageLayer, activeId, activeType }, exporting);
    }
  }, [textLayers, imageLayer, activeId, activeType]);

  useEffect(() => draw(), [draw]);
  useEffect(() => () => { if (imageUrl.current) URL.revokeObjectURL(imageUrl.current); }, []);

  const addTextLayer = () => {
    if (textLayers.length >= 10) return;
    const layer: TextLayer = { id: crypto.randomUUID(), text: "", x: 200, y: 150, fontSize: 22, fontFamily: "Inter", color: "#1E4D2B", rotation: 0 };
    setTextLayers((current) => [...current, layer]);
    setActiveId(layer.id);
    setActiveType("text");
  };
  const updateActiveText = (updates: Partial<TextLayer>) => {
    if (activeId && activeType === "text") setTextLayers((current) => current.map((layer) => layer.id === activeId ? { ...layer, ...updates } : layer));
  };
  const removeActiveText = () => {
    if (!activeId || activeType !== "text") return;
    setTextLayers((current) => current.filter((layer) => layer.id !== activeId));
    setActiveId(null); setActiveType(null);
  };
  const uploadImage = (file: File) => {
    setImageError(undefined);
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setImageError("Upload a PNG, JPEG or WebP image no larger than 5 MB."); return;
    }
    if (imageUrl.current) URL.revokeObjectURL(imageUrl.current);
    const url = URL.createObjectURL(file); imageUrl.current = url;
    const image = new Image();
    image.onload = () => {
      const ratio = Math.min(160 / image.width, 160 / image.height, 1);
      const layer: ImageLayer = { id: crypto.randomUUID(), src: url, x: 200, y: 120, width: image.width * ratio, height: image.height * ratio, scale: 1, rotation: 0, imageElement: image };
      setImageLayer(layer); setActiveId(layer.id); setActiveType("image");
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      imageUrl.current = null;
      setImageError("The selected image could not be decoded.");
    };
    image.src = url;
  };
  const updateActiveImage = (updates: Partial<ImageLayer>) => setImageLayer((current) => current ? { ...current, ...updates } : null);
  const clearImageLayer = () => {
    if (imageUrl.current) URL.revokeObjectURL(imageUrl.current);
    imageUrl.current = null; setImageLayer(null);
    if (activeType === "image") { setActiveId(null); setActiveType(null); }
  };
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const point = canvasPoint(event, canvasRef.current); if (!point) return;
    const text = [...textLayers].reverse().find((layer) => Math.abs(point.x - layer.x) < 60 && Math.abs(point.y - layer.y) < 25);
    const image = imageLayer && Math.abs(point.x - imageLayer.x) <= imageLayer.width * imageLayer.scale / 2 + 10 && Math.abs(point.y - imageLayer.y) <= imageLayer.height * imageLayer.scale / 2 + 10 ? imageLayer : null;
    const layer = text ?? image; const type: LayerType = text ? "text" : image ? "image" : null;
    setActiveId(layer?.id ?? null); setActiveType(type);
    if (layer) { setIsDragging(true); dragStart.current = { x: point.x, y: point.y, origX: layer.x, origY: layer.y }; }
  };
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragStart.current) return;
    const point = canvasPoint(event, canvasRef.current); if (!point) return;
    const x = clamp(dragStart.current.origX + point.x - dragStart.current.x, 0, 400);
    const y = clamp(dragStart.current.origY + point.y - dragStart.current.y, 0, 300);
    if (activeType === "text") updateActiveText({ x, y });
    if (activeType === "image") updateActiveImage({ x, y });
  };
  const exportPNG = async (): Promise<Blob> => {
    const canvas = canvasRef.current; if (!canvas) throw new Error("Customization canvas is unavailable.");
    draw(true);
    try { return await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Customization preview could not be created.")), "image/png")); }
    finally { draw(false); }
  };
  return { canvasRef, textLayers, imageLayer, imageError, activeTextLayer: textLayers.find((layer) => layer.id === activeId) ?? null, addTextLayer, updateActiveText, removeActiveText, uploadImage, updateActiveImage, clearImageLayer, handleMouseDown, handleMouseMove, handleMouseUp: () => setIsDragging(false), exportPNG };
}

function canvasPoint(event: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement | null) { if (!canvas) return null; const rect = canvas.getBoundingClientRect(); return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height }; }
function clamp(value: number, minimum: number, maximum: number) { return Math.min(maximum, Math.max(minimum, value)); }
