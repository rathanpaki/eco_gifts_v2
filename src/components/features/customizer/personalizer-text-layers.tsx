"use client";

import { Plus, Trash2 } from "lucide-react";
import type { TextLayer } from "@/types/customizer.types";
import { personalizerColors, personalizerStyles } from "./personalizer-options";

export function PersonalizerTextLayers(props: {
  layers: TextLayer[];
  activeId: string | null;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TextLayer>) => void;
}) {
  const active = props.layers.find((layer) => layer.id === props.activeId) ?? props.layers[0];
  return (
    <section className="rounded-[18px] border border-[var(--line)] bg-[var(--page)] p-5">
      <div className="flex items-center justify-between gap-3"><div><h2 className="serif text-xl">Add your text</h2><p className="mt-1 text-xs text-[var(--muted)]">Add as many separate text boxes as your design needs.</p></div><button type="button" onClick={props.onAdd} className="flex h-10 items-center gap-2 rounded-[10px] bg-[#eef4ee] px-4 text-xs font-semibold text-[var(--brand)]"><Plus size={14} /> Add text</button></div>
      <div className="mt-4 space-y-3">
        {props.layers.map((layer, index) => <div key={layer.id} className={`rounded-xl border p-3 ${active?.id === layer.id ? "border-[var(--brand)] bg-[#eef4ee]/50" : "border-[var(--line)]"}`}>
          <div className="flex items-start gap-2"><label className="min-w-0 flex-1 text-xs font-semibold">Text {index + 1}<textarea maxLength={120} rows={2} value={layer.text} onFocus={() => props.onSelect(layer.id)} onChange={(event) => props.onUpdate(layer.id, { text: event.target.value })} placeholder="Type anything you would like to add" className="mt-2 w-full resize-none rounded-[10px] border border-[var(--line)] bg-[var(--page)] px-3 py-2 text-sm font-normal outline-none focus:border-[var(--brand)]" /></label><button type="button" aria-label={`Remove text ${index + 1}`} onClick={() => props.onRemove(layer.id)} className="mt-6 grid size-9 place-items-center rounded-lg text-red-700 hover:bg-red-50"><Trash2 size={15} /></button></div>
        </div>)}
        {!props.layers.length ? <button type="button" onClick={props.onAdd} className="w-full rounded-xl border border-dashed border-[var(--line)] p-5 text-sm text-[var(--muted)]">Add your first text box</button> : null}
      </div>
      {active ? <TextAppearance layer={active} onUpdate={(updates) => props.onUpdate(active.id, updates)} /> : null}
    </section>
  );
}
function TextAppearance(props: { layer: TextLayer; onUpdate: (updates: Partial<TextLayer>) => void }) {
  return <div className="mt-5 border-t border-[var(--line)] pt-5"><p className="text-xs font-semibold">Font style</p><div className="mt-3 grid grid-cols-4 gap-2">{personalizerStyles.map((style) => <button key={style.id} type="button" aria-pressed={props.layer.fontFamily === style.fontFamily} onClick={() => props.onUpdate({ fontFamily: style.fontFamily })} className={`rounded-[10px] border p-2 text-center ${props.layer.fontFamily === style.fontFamily ? "border-[var(--brand)] bg-[#eef4ee]" : "border-[var(--line)]"}`}><span className={`block text-lg ${style.className}`}>{style.sample}</span><span className="mt-1 block text-[10px]">{style.label}</span></button>)}</div><p className="mt-5 text-xs font-semibold">Colour</p><div className="mt-3 flex flex-wrap gap-3">{personalizerColors.map((color) => <button key={color.id} type="button" title={color.label} aria-label={color.label} aria-pressed={props.layer.color === color.value} onClick={() => props.onUpdate({ color: color.value })} style={{ backgroundColor: color.value }} className={`size-8 rounded-full border border-black/10 ${props.layer.color === color.value ? "ring-2 ring-[var(--brand)] ring-offset-2" : ""}`} />)}</div><label className="mt-5 block text-xs font-semibold">Text size · {props.layer.fontSize}px<input type="range" min={12} max={48} value={props.layer.fontSize} onChange={(event) => props.onUpdate({ fontSize: Number(event.target.value) })} className="mt-2 w-full accent-[var(--brand)]" /></label></div>;
}