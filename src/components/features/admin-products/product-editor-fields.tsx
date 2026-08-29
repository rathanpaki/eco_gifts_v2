import type { ChangeEvent } from "react";
import type { ProductFormValues } from "@/types/admin-product";
import { productOccasionOptions } from "@/types/product-occasion";
import { PRODUCT_IMAGE_MAX_MB } from "@/lib/image-upload";
import styles from "@/components/features/admin-products/product-fields.module.css";
import {
  CategoryField,
  Check,
  Field,
  TextArea,
} from "./product-field-controls";

export type EditorTab =
  "general" | "media" | "pricing" | "personalization" | "eco";
type Props = {
  categories: string[];
  tab: EditorTab;
  values: ProductFormValues;
  onChange: (
    key: keyof ProductFormValues,
    value: string | boolean | ProductFormValues["occasions"],
  ) => void;
  onFiles: (files: File[]) => void;
};

export function ProductEditorFields(props: Props) {
  if (props.tab === "media") return <MediaFields onFiles={props.onFiles} />;
  if (props.tab === "pricing") return <PricingFields {...props} />;
  if (props.tab === "personalization")
    return <PersonalizationFields {...props} />;
  if (props.tab === "eco") return <EcoFields {...props} />;
  return <GeneralFields {...props} />;
}

function GeneralFields({ categories, values, onChange }: Props) {
  return (
    <div className={styles.fields}>
      <h2>Product information</h2>
      <Field
        label="Product name"
        helper="Shown on product cards and checkout"
        value={values.name}
        onChange={(v) => onChange("name", v)}
      />
      <Field
        label="Short description"
        helper="160 characters maximum"
        value={values.shortDescription}
        onChange={(v) => onChange("shortDescription", v)}
      />
      <TextArea
        label="Full description"
        value={values.description}
        onChange={(v) => onChange("description", v)}
      />
      <div className={styles.twoColumns}>
        <CategoryField
          categories={categories}
          label="Category"
          value={values.category}
          onChange={(v) => onChange("category", v)}
        />
        <Field
          label="SKU"
          value={values.sku}
          onChange={(v) => onChange("sku", v.toUpperCase())}
        />
      </div>
      <div className={styles.twoColumns}>
        <Field
          inputMode="numeric"
          label="Inventory"
          value={values.stockQuantity}
          onChange={(v) => onChange("stockQuantity", v)}
        />
        <Field
          inputMode="numeric"
          label="Low-stock threshold"
          value={values.lowStockThreshold}
          onChange={(v) => onChange("lowStockThreshold", v)}
        />
      </div>
    </div>
  );
}

function MediaFields({ onFiles }: Pick<Props, "onFiles">) {
  const change = (event: ChangeEvent<HTMLInputElement>) => {
    onFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };
  return (
    <div className={styles.fields}>
      <h2>Product media</h2>
      <label className={styles.upload}>
        <strong>Upload product images</strong>
        <span>
          Select any number of JPEG, PNG, or WebP files · {PRODUCT_IMAGE_MAX_MB} MB each
        </span>
        <input
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={change}
          type="file"
        />
      </label>
    </div>
  );
}

function PricingFields({ values, onChange }: Props) {
  return (
    <div className={styles.fields}>
      <h2>Pricing</h2>
      <div className={styles.twoColumns}>
        <Field
          inputMode="decimal"
          label="Price"
          value={values.price}
          onChange={(v) => onChange("price", v)}
        />
        <Field
          label="Currency"
          value={values.currency}
          onChange={(v) => onChange("currency", v.toUpperCase())}
        />
      </div>
    </div>
  );
}

function PersonalizationFields({ values, onChange }: Props) {
  const changeOccasion = (value: ProductFormValues["occasions"][number]) => {
    const occasions = values.occasions.includes(value)
      ? values.occasions.filter((item) => item !== value)
      : [...values.occasions, value];
    onChange("occasions", occasions);
  };

  return (
    <div className={styles.fields}>
      <h2>Personalization & occasions</h2>
      <Check
        checked={values.personalizationAvailable}
        description="Allow customers to add names, dates, or a gift message to this product."
        label="Personalization available"
        onChange={(value) => onChange("personalizationAvailable", value)}
      />
      <fieldset className="mt-7 grid gap-3 border-t border-[var(--line)] pt-5">
        <legend className="font-semibold">Gift occasions</legend>
        <p className="text-sm text-[var(--muted)]">
          Choose every collection where this product should appear.
        </p>
        {productOccasionOptions.map((item) => (
          <Check
            checked={values.occasions.includes(item.value)}
            key={item.value}
            label={item.label}
            onChange={() => changeOccasion(item.value)}
          />
        ))}
      </fieldset>
    </div>
  );
}

function EcoFields({ values, onChange }: Props) {
  return (
    <div className={styles.fields}>
      <h2>Eco evidence</h2>
      <Field
        inputMode="numeric"
        label="Eco score (0–100)"
        value={values.ecoScore}
        onChange={(v) => onChange("ecoScore", v)}
      />
      <Check
        checked={values.materialsVerified}
        label="Materials verified"
        onChange={(v) => onChange("materialsVerified", v)}
      />
      <Check
        checked={values.packagingVerified}
        label="Packaging verified"
        onChange={(v) => onChange("packagingVerified", v)}
      />
      <Check
        checked={values.contributionVerified}
        label="Contribution verified"
        onChange={(v) => onChange("contributionVerified", v)}
      />
    </div>
  );
}
