import type { CustomizationDesign } from "@/types/customizer.types";

export type PersonalizerStyleId = "elegant" | "classic" | "modern" | "script";
export type PersonalizerColorId =
  "forest" | "sage" | "clay" | "sand" | "charcoal";

export const personalizerStyles = [
  {
    id: "elegant",
    label: "Elegant",
    sample: "Ag",
    fontFamily: "DM Serif Display",
    className: "serif",
  },
  {
    id: "classic",
    label: "Classic",
    sample: "Aa",
    fontFamily: "Playfair Display",
    className: "serif",
  },
  {
    id: "modern",
    label: "Modern",
    sample: "Aa",
    fontFamily: "Inter",
    className: "font-medium",
  },
  {
    id: "script",
    label: "Script",
    sample: "Aa",
    fontFamily: "cursive",
    className: "italic",
  },
] as const;

export const personalizerColors = [
  { id: "forest", label: "Forest", value: "#49674E" },
  { id: "sage", label: "Sage", value: "#7F9B84" },
  { id: "clay", label: "Clay", value: "#C98E6A" },
  { id: "sand", label: "Sand", value: "#D7C3A7" },
  { id: "charcoal", label: "Charcoal", value: "#252A26" },
] as const;

export function selectedStyle(id: PersonalizerStyleId) {
  return (
    personalizerStyles.find((option) => option.id === id) ??
    personalizerStyles[0]
  );
}

export function selectedColor(id: PersonalizerColorId) {
  return (
    personalizerColors.find((option) => option.id === id) ??
    personalizerColors[0]
  );
}

export function personalizationDesign(
  names: string,
  message: string,
  styleId: PersonalizerStyleId,
  colorId: PersonalizerColorId,
): CustomizationDesign {
  const style = selectedStyle(styleId);
  const color = selectedColor(colorId).value;
  const textLayers = [
    names.trim() && {
      text: names.trim(),
      x: 200,
      y: 142,
      fontSize: 32,
      fontFamily: style.fontFamily,
      color,
      rotation: 0,
    },
    message.trim() && {
      text: message.trim(),
      x: 200,
      y: 184,
      fontSize: 14,
      fontFamily: "Inter",
      color: "#8A918A",
      rotation: 0,
    },
  ].filter((layer): layer is Exclude<typeof layer, ""> => Boolean(layer));
  return { canvasWidth: 400, canvasHeight: 300, textLayers, imageLayers: [] };
}

export async function personalizationPreview(
  names: string,
  message: string,
  styleId: PersonalizerStyleId,
  colorId: PersonalizerColorId,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 300;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Personalization preview is unavailable.");
  const style = selectedStyle(styleId);
  const color = selectedColor(colorId).value;
  context.fillStyle = "#FAF8F3";
  context.fillRect(0, 0, 400, 300);
  context.textAlign = "center";
  context.fillStyle = "#8A918A";
  context.font = "600 11px Inter";
  context.fillText("PERSONALISED FOR", 200, 105);
  context.fillStyle = color;
  context.font = `32px "${style.fontFamily}"`;
  context.fillText(names.trim(), 200, 150, 350);
  context.fillStyle = "#8A918A";
  context.font = "14px Inter";
  context.fillText(message.trim(), 200, 188, 350);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("Personalization preview could not be created.")),
      "image/png",
    );
  });
}
