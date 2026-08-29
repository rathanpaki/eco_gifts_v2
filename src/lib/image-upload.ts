const MEGABYTE = 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export const PRODUCT_IMAGE_MAX_MB = 12;
export const PROFILE_PHOTO_MAX_MB = 2;
export const CUSTOMIZATION_IMAGE_MAX_MB = 5;

export function imageUploadError(
  file: File,
  maximumMb: number,
  label = "image",
): string | null {
  if (!allowedTypes.has(file.type)) {
    return `Upload a JPEG, PNG, or WebP ${label}.`;
  }
  if (file.size < 1) return `The selected ${label} is empty.`;
  if (file.size > maximumMb * MEGABYTE) {
    return `The selected ${label} must be no larger than ${maximumMb} MB.`;
  }
  return null;
}
