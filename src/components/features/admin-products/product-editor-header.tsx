import type { AdminProduct } from "@/types/admin-product";
import type { EditorTab } from "./product-editor-fields";
import styles from "@/components/features/admin-products/product-editor.module.css";

type Props = {
  product?: AdminProduct;
  name: string;
  pending: boolean;
  tab: EditorTab;
  error: string | null;
  message: string | null;
  onArchive: () => void;
  onTab: (tab: EditorTab) => void;
};

export function ProductEditorHeader({
  product,
  name,
  pending,
  tab,
  error,
  message,
  onArchive,
  onTab,
}: Props) {
  return (
    <>
      <header className={styles.header}>
        <div>
          <p>Edit product</p>
          <h1>{name || "New product"}</h1>
        </div>
        <div className={styles.actions}>
          <span
            className={
              product?.status === "active" ? styles.published : styles.draft
            }
          >
            {product?.status === "active"
              ? "Published"
              : product?.status === "archived"
                ? "Archived"
                : "Draft"}
          </span>
          {product && (
            <button
              className={styles.danger}
              disabled={pending}
              onClick={onArchive}
              type="button"
            >
              Archive
            </button>
          )}
          <button disabled={pending} value="draft">
            Save draft
          </button>
          <button className={styles.primary} disabled={pending} value="active">
            {pending ? "Saving…" : "Publish changes"}
          </button>
        </div>
      </header>
      <nav className={styles.tabs} aria-label="Product editor sections">
        {tabs.map((item) => (
          <button
            aria-current={tab === item.value ? "page" : undefined}
            className={tab === item.value ? styles.tabActive : styles.tab}
            key={item.value}
            onClick={() => onTab(item.value)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className={styles.success} role="status">
          {message}
        </p>
      )}
    </>
  );
}

const tabs: Array<{ label: string; value: EditorTab }> = [
  { label: "General", value: "general" },
  { label: "Media", value: "media" },
  { label: "Pricing", value: "pricing" },
  { label: "Personalization", value: "personalization" },
  { label: "Eco evidence", value: "eco" },
];
