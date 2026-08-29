"use client";

import { useCallback, useEffect, useState } from "react";
import {
  imageUploadError,
  PRODUCT_IMAGE_MAX_MB,
} from "@/lib/image-upload";

export function useProductImageSelection() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(
    () => () => previewUrls.forEach((url) => URL.revokeObjectURL(url)),
    [previewUrls],
  );

  const selectFiles = useCallback((nextFiles: File[]) => {
    const invalid = nextFiles
      .map((file) => imageUploadError(file, PRODUCT_IMAGE_MAX_MB, "product image"))
      .find(Boolean);
    setImageError(invalid ?? null);
    if (invalid) {
      setFiles([]);
      setPreviewUrls([]);
      return;
    }
    setFiles(nextFiles);
    setPreviewUrls(nextFiles.map((file) => URL.createObjectURL(file)));
  }, []);

  const clearFiles = useCallback(() => selectFiles([]), [selectFiles]);

  return { clearFiles, files, imageError, previewUrls, selectFiles };
}
