export interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  rotation: number;
}

export interface ImageLayer {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  rotation: number;
  imageElement?: HTMLImageElement | null;
}

export interface SurfaceBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
}

export type LayerType = "text" | "image" | null;

export interface CustomizerState {
  textLayers: TextLayer[];
  imageLayers: ImageLayer[];
  activeLayerId: string | null;
  activeLayerType: LayerType;
  surfaceBounds: SurfaceBounds;
}

export interface CustomizationDesign {
  canvasWidth: 400;
  canvasHeight: 300;
  textLayers: Array<Omit<TextLayer, "id">>;
  imageLayer: Omit<ImageLayer, "id" | "src" | "imageElement"> | null;
}

export interface SavedCustomization {
  id: string;
  productId: string;
  previewPath: string;
  previewUrl: string;
  design: CustomizationDesign;
  createdAt: string;
}
