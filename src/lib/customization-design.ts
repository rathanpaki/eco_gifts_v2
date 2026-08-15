import type {
  CustomizationDesign,
  ImageLayer,
  TextLayer,
} from "@/types/customizer.types";

export function customizationDesign(
  textLayers: TextLayer[],
  imageLayer: ImageLayer | null,
): CustomizationDesign {
  return {
    canvasWidth: 400,
    canvasHeight: 300,
    textLayers: textLayers
      .filter(
        (layer) => typeof layer.text === "string" && layer.text.trim().length,
      )
      .map((layer) => ({
        text: layer.text.trim(),
        x: layer.x,
        y: layer.y,
        fontSize: layer.fontSize,
        fontFamily: layer.fontFamily,
        color: layer.color.toUpperCase(),
        rotation: layer.rotation,
      })),
    imageLayer: imageLayer
      ? {
          x: imageLayer.x,
          y: imageLayer.y,
          width: imageLayer.width,
          height: imageLayer.height,
          scale: imageLayer.scale,
          rotation: imageLayer.rotation,
        }
      : null,
  };
}
