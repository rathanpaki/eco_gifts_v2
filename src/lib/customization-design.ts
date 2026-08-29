import type { CustomizationDesign, ImageLayer, TextLayer } from "@/types/customizer.types";

export function customizationDesign(textLayers: TextLayer[], imageLayers: ImageLayer[]): CustomizationDesign {
  return {
    canvasWidth: 400,
    canvasHeight: 300,
    textLayers: textLayers.filter((layer) => layer.text.trim()).map((layer) => ({ text: layer.text.trim(), x: layer.x, y: layer.y, fontSize: layer.fontSize, fontFamily: layer.fontFamily, color: layer.color.toUpperCase(), rotation: layer.rotation })),
    imageLayers: imageLayers.map((layer) => ({ x: layer.x, y: layer.y, width: layer.width, height: layer.height, scale: layer.scale, rotation: layer.rotation })),
  };
}
