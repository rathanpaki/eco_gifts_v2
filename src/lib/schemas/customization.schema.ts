import { z } from "zod";

const textLayerSchema = z.object({
  text: z.string().trim().min(1).max(120),
  x: z.number().min(0).max(400),
  y: z.number().min(0).max(300),
  fontSize: z.number().int().min(12).max(48),
  fontFamily: z.enum([
    "Inter",
    "DM Serif Display",
    "Playfair Display",
    "cursive",
  ]),
  color: z.string().regex(/^#[0-9A-F]{6}$/),
  rotation: z.number().min(-180).max(180),
});

const imageLayerSchema = z.object({
  x: z.number().min(0).max(400),
  y: z.number().min(0).max(300),
  width: z.number().positive().max(400),
  height: z.number().positive().max(300),
  scale: z.number().min(0.25).max(2),
  rotation: z.number().min(-180).max(180),
});

export const customizationSchema = z.object({
  id: z.string().min(1).max(128),
  productId: z.string().min(1).max(128),
  previewPath: z
    .string()
    .regex(/^\/api\/customizations\/[A-Za-z0-9_-]+\/preview$/),
  design: z.object({
    canvasWidth: z.literal(400),
    canvasHeight: z.literal(300),
    textLayers: z.array(textLayerSchema).max(10),
    imageLayer: imageLayerSchema.nullable(),
  }),
  createdAt: z.string().datetime(),
});
