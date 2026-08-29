import Image from "next/image";
import { adminCustomizationPreviewUrl } from "@/services/admin-orders.service";
import type { OrderItem } from "@/types/checkout";
import styles from "./admin-orders.module.css";

type Personalization = NonNullable<OrderItem["customization"]>;

export function AdminPersonalizationPreview({
  customization,
  orderId,
}: {
  customization: Personalization;
  orderId: string;
}) {
  const preview = adminCustomizationPreviewUrl(orderId, customization.id);
  return (
    <section className={styles.personalization}>
      <div className={styles.personalizationImage}>
        <Image
          alt="Customer personalization preview"
          fill
          sizes="144px"
          src={preview}
          unoptimized
        />
      </div>
      <div className={styles.personalizationCopy}>
        <strong>Customer personalization</strong>
        <span>
          {customization.text?.trim() ||
            "Image or layout customization supplied by the customer."}
        </span>
        <a href={preview} rel="noreferrer" target="_blank">
          Open full preview
        </a>
      </div>
    </section>
  );
}
