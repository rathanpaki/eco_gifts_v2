"use client";

import Image from "next/image";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { AdminProduct, ProductFormValues } from "@/types/admin-product";
import styles from "@/components/features/admin-products/product-preview.module.css";

type Props = {
  product?: AdminProduct;
  values: ProductFormValues;
  previewUrls: string[];
  pending: boolean;
  onRemove: (imageId: string) => void;
  onMove: (imageId: string, offset: -1 | 1) => void;
};

export function ProductPreview({
  product,
  values,
  previewUrls,
  pending,
  onRemove,
  onMove,
}: Props) {
  const primary = previewUrls[0] ?? product?.images[0]?.url;
  return (
    <aside className={styles.preview}>
      <p className={styles.eyebrow}>Live product preview</p>
      <div className={styles.previewImage}>
        {primary ? (
          <Image
            alt={values.name || "Product preview"}
            fill
            sizes="380px"
            src={primary}
            unoptimized={shouldBypassImageOptimization(primary)}
          />
        ) : (
          <span>Add an image in the Media tab</span>
        )}
      </div>
      <h2>{values.name || "Untitled product"}</h2>
      <strong>{formatPrice(values.price, values.currency)}</strong>
      <p className={styles.eco}>Eco score {values.ecoScore || "0"} / 100</p>
      <p>
        {values.description ||
          values.shortDescription ||
          "Add a product description to complete the preview."}
      </p>
      {previewUrls.length ? (
        <section
          className={styles.uploadQueue}
          aria-label="Images ready to upload"
        >
          <strong>
            {previewUrls.length} image{previewUrls.length === 1 ? "" : "s"}{" "}
            ready to upload
          </strong>
          <div>
            {previewUrls.map((url) => (
              <Image
                alt=""
                height={56}
                key={url}
                src={url}
                unoptimized
                width={56}
              />
            ))}
          </div>
        </section>
      ) : null}
      {product?.images.length ? (
        <div className={styles.mediaList}>
          {product.images.map((image, index) => (
            <div key={image.id}>
              <Image
                alt={image.alt}
                height={56}
                src={image.url}
                unoptimized={shouldBypassImageOptimization(image.url)}
                width={56}
              />
              <small>{index === 0 ? "Primary" : `Image ${index + 1}`}</small>
              <span>
                <button
                  disabled={pending || index === 0}
                  onClick={() => onMove(image.id, -1)}
                  type="button"
                >
                  Up
                </button>
                <button
                  disabled={pending || index === product.images.length - 1}
                  onClick={() => onMove(image.id, 1)}
                  type="button"
                >
                  Down
                </button>
                <button
                  disabled={pending}
                  onClick={() => onRemove(image.id)}
                  type="button"
                >
                  Remove
                </button>
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </aside>
  );
}

function formatPrice(value: string, currency: string): string {
  const amount = Number(value);
  if (!Number.isFinite(amount) || !/^[A-Z]{3}$/.test(currency))
    return "Price not set";
  return new Intl.NumberFormat("en", { style: "currency", currency }).format(
    amount,
  );
}
