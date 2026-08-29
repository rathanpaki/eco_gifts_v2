const MAX_EDGE = 480;

export async function personalizationImageBlob(src: string): Promise<Blob> {
  const image = await loadImage(src);
  const ratio = Math.min(1, MAX_EDGE / image.width, MAX_EDGE / image.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * ratio));
  canvas.height = Math.max(1, Math.round(image.height * ratio));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("The image processor is unavailable.");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvasBlob(canvas);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("A personalization image could not be decoded."));
    image.src = src;
  });
}

function canvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("The image could not be prepared.")),
      "image/webp",
      0.72,
    );
  });
}
