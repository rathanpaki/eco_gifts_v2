import type { ImageLayer, LayerType, TextLayer } from "@/types/customizer.types";

interface CanvasState { textLayers: TextLayer[]; imageLayers: ImageLayer[]; activeId: string | null; activeType: LayerType }
export function drawCustomizerCanvas(canvas: HTMLCanvasElement, state: CanvasState, exporting: boolean): void {
  const context = canvas.getContext("2d"); if (!context) return;
  context.clearRect(0, 0, canvas.width, canvas.height); context.fillStyle = "#FAF8F3"; context.fillRect(0, 0, canvas.width, canvas.height);
  if (!exporting) drawBoundary(context);
  state.imageLayers.forEach((layer) => { if (layer.imageElement) drawImage(context, layer, !exporting && state.activeType === "image" && state.activeId === layer.id); });
  state.textLayers.forEach((layer) => drawText(context, layer, !exporting && state.activeType === "text" && state.activeId === layer.id));
}
function drawBoundary(context: CanvasRenderingContext2D) { context.strokeStyle = "#718872"; context.setLineDash([6, 4]); context.lineWidth = 1.5; context.strokeRect(25, 25, 350, 250); context.setLineDash([]); }
function drawImage(context: CanvasRenderingContext2D, layer: ImageLayer, selected: boolean) {
  if (!layer.imageElement) return; const width = layer.width * layer.scale; const height = layer.height * layer.scale;
  context.save(); context.translate(layer.x, layer.y); context.rotate((layer.rotation * Math.PI) / 180); context.drawImage(layer.imageElement, -width / 2, -height / 2, width, height);
  if (selected) { context.strokeStyle = "#3D5540"; context.lineWidth = 2; context.strokeRect(-width / 2 - 4, -height / 2 - 4, width + 8, height + 8); }
  context.restore();
}
function drawText(context: CanvasRenderingContext2D, layer: TextLayer, selected: boolean) {
  context.save(); context.translate(layer.x, layer.y); context.rotate((layer.rotation * Math.PI) / 180); context.font = `${layer.fontSize}px ${layer.fontFamily}, sans-serif`; context.fillStyle = layer.color; context.textAlign = "center"; context.textBaseline = "middle"; context.fillText(layer.text, 0, 0, 350);
  if (selected) { const width = Math.min(350, Math.max(20, context.measureText(layer.text).width)); context.strokeStyle = "#3D5540"; context.lineWidth = 2; context.strokeRect(-width / 2 - 6, -layer.fontSize / 2 - 4, width + 12, layer.fontSize + 8); }
  context.restore();
}