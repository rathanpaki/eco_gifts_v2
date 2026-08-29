"use client";

import { ImageIcon, RotateCw, Trash2, Upload, ZoomIn } from "lucide-react";
import { useRef } from "react";
import type { ImageLayer } from "@/types/customizer.types";

export function PersonalizerImageLayers(props: {
  layers: ImageLayer[];
  activeId: string | null;
  error?: string;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ImageLayer>) => void;
  onUpload: (file: File) => void;
}) {
  const input = useRef<HTMLInputElement | null>(null);
  const active = props.layers.find((layer) => layer.id === props.activeId) ?? props.layers[0];
  return (
    <section className="mt-4 rounded-[18px] border border-[var(--line)] bg-[var(--page)] p-5">
      <div className="flex items-center justify-between"><div><h2 className="serif flex items-center gap-2 text-xl"><ImageIcon size={18} /> Add images</h2><p className="mt-1 text-xs text-[var(--muted)]">PNG, JPEG or WebP · up to 5 MB each</p></div><button type="button" onClick={() => input.current?.click()} className="flex h-10 items-center gap-2 rounded-[10px] bg-[#eef4ee] px-4 text-xs font-semibold text-[var(--brand)]"><Upload size={14} /> Insert images</button></div>
      <input ref={input} className="hidden" type="file" multiple accept="image/png,image/jpeg,image/webp" onChange={(event) => { Array.from(event.target.files ?? []).forEach(props.onUpload); event.currentTarget.value = ""; }} />
      {props.layers.length ? <div className="mt-4 flex flex-wrap gap-2">{props.layers.map((layer, index) => <button type="button" key={layer.id} onClick={() => props.onSelect(layer.id)} className={`rounded-[10px] border px-3 py-2 text-xs font-semibold ${active?.id === layer.id ? "border-[var(--brand)] bg-[#eef4ee]" : "border-[var(--line)]"}`}>Image {index + 1}</button>)}</div> : <p className="mt-4 rounded-xl border border-dashed border-[var(--line)] p-4 text-xs text-[var(--muted)]">Insert one or more images, then drag them into place in the preview.</p>}
      {active ? <div className="mt-4 grid gap-4 border-t border-[var(--line)] pt-4 sm:grid-cols-2"><Range icon={<ZoomIn size={13} />} label="Scale" value={active.scale} min={0.25} max={2} step={0.05} display={`${Math.round(active.scale * 100)}%`} onChange={(scale) => props.onUpdate(active.id, { scale })} /><Range icon={<RotateCw size={13} />} label="Rotation" value={active.rotation} min={-180} max={180} step={5} display={`${active.rotation}°`} onChange={(rotation) => props.onUpdate(active.id, { rotation })} /><button type="button" onClick={() => props.onRemove(active.id)} className="flex items-center justify-center gap-2 text-xs font-semibold text-red-700 sm:col-span-2"><Trash2 size={14} /> Remove selected image</button></div> : null}
      {props.error ? <p className="mt-3 text-xs text-red-700" role="alert">{props.error}</p> : null}
    </section>
  );
}
function Range(props: { icon: React.ReactNode; label: string; value: number; min: number; max: number; step: number; display: string; onChange: (value: number) => void }) { return <label className="text-xs font-semibold"><span className="flex items-center justify-between"><span className="flex items-center gap-1">{props.icon}{props.label}</span><span>{props.display}</span></span><input type="range" min={props.min} max={props.max} step={props.step} value={props.value} onChange={(event) => props.onChange(Number(event.target.value))} className="mt-2 w-full accent-[var(--brand)]" /></label>; }