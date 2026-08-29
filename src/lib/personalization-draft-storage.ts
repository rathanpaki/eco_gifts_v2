import { personalizationImageBlob } from "@/lib/personalization-image-blob";
import type { ImageLayer, TextLayer } from "@/types/customizer.types";
import { z } from "zod";

const PREFIX = "ecogifts:personalization:";
const INDEX_KEY = `${PREFIX}index`;
const MAX_DRAFTS = 8;

export interface PersonalizationDraft {
  textLayers: TextLayer[];
  imageLayers: Array<Omit<ImageLayer, "imageElement">>;
  savedAt: string;
}

const number = z.number().finite();
const textLayer = z.object({
  id: z.string().min(1).max(128),
  text: z.string().max(120),
  x: number,
  y: number,
  fontSize: number,
  fontFamily: z.string().min(1).max(80),
  color: z.string().regex(/^#[0-9a-f]{6}$/i),
  rotation: number,
});
const imageLayer = z.object({
  id: z.string().min(1).max(128),
  src: z.string().max(1_000_000).regex(/^data:image\/(?:webp|png|jpeg);base64,/),
  x: number,
  y: number,
  width: number.positive(),
  height: number.positive(),
  scale: number.positive(),
  rotation: number,
});
const draftSchema = z.object({
  textLayers: z.array(textLayer).max(100),
  imageLayers: z.array(imageLayer).max(20),
  savedAt: z.string().datetime(),
});

export async function savePersonalizationDraft(
  id: string,
  textLayers: TextLayer[],
  imageLayers: ImageLayer[],
): Promise<PersonalizationDraft> {
  const serialized = await Promise.all(
    imageLayers.map(async (layer) => ({
      id: layer.id,
      x: layer.x,
      y: layer.y,
      width: layer.width,
      height: layer.height,
      scale: layer.scale,
      rotation: layer.rotation,
      src: await blobDataUrl(await personalizationImageBlob(layer.src)),
    })),
  );
  const draft: PersonalizationDraft = {
    textLayers: structuredClone(textLayers),
    imageLayers: serialized,
    savedAt: new Date().toISOString(),
  };
  writeWithEviction(id, JSON.stringify(draft));
  return draft;
}

export function loadPersonalizationDraft(
  id: string,
): PersonalizationDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(PREFIX + id);
    if (!value) return null;
    const parsed = draftSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

function writeWithEviction(id: string, value: string) {
  const index = readIndex().filter((entry) => entry.id !== id);
  while (index.length >= MAX_DRAFTS) removeOldest(index);
  for (;;) {
    try {
      localStorage.setItem(PREFIX + id, value);
      localStorage.setItem(
        INDEX_KEY,
        JSON.stringify([...index, { id, savedAt: Date.now() }]),
      );
      return;
    } catch (error) {
      if (!index.length) throw new Error("Browser storage is full. Remove an older saved design and try again.", { cause: error });
      removeOldest(index);
    }
  }
}

function readIndex(): Array<{ id: string; savedAt: number }> {
  try {
    return JSON.parse(localStorage.getItem(INDEX_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function removeOldest(index: Array<{ id: string; savedAt: number }>) {
  index.sort((a, b) => a.savedAt - b.savedAt);
  const oldest = index.shift();
  if (oldest) localStorage.removeItem(PREFIX + oldest.id);
}

function blobDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("The design image could not be stored locally."));
    reader.readAsDataURL(blob);
  });
}
