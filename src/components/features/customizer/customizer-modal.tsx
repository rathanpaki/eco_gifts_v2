"use client";

import { CustomizerModal as FigmaCustomizer } from "./figma-customizer";
import type { SavedCustomization } from "@/types/customizer.types";

export function CustomizerModal(props: { initial?: SavedCustomization | null; productId: string; productName: string; onClose: () => void; onApply: (customization: SavedCustomization) => void | Promise<void> }) {
  return <FigmaCustomizer {...props} />;
}
