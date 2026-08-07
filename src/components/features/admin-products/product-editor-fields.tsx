import type { ChangeEvent } from "react";
import type { ProductFormValues } from "@/types/admin-product";
import styles from "@/components/features/admin-products/product-editor.module.css";

export type EditorTab = "general" | "media" | "pricing" | "personalization" | "eco";
type Props = {
  tab: EditorTab;
  values: ProductFormValues;
  onChange: (key: keyof ProductFormValues, value: string | boolean) => void;
  onFile: (file: File | null) => void;
};

export function ProductEditorFields(props: Props) {
  if (props.tab === "media") return <MediaFields onFile={props.onFile} />;
  if (props.tab === "pricing") return <PricingFields {...props} />;
  if (props.tab === "personalization") return <PersonalizationFields {...props} />;
  if (props.tab === "eco") return <EcoFields {...props} />;
  return <GeneralFields {...props} />;
}

function GeneralFields({ values, onChange }: Props) {
  return <div className={styles.fields}>
    <h2>Product information</h2>
    <Field label="Product name" helper="Shown on product cards and checkout" value={values.name} onChange={(v) => onChange("name", v)} />
    <Field label="Short description" helper="160 characters maximum" value={values.shortDescription} onChange={(v) => onChange("shortDescription", v)} />
    <TextArea label="Full description" value={values.description} onChange={(v) => onChange("description", v)} />
    <div className={styles.twoColumns}>
      <Field label="Category" value={values.category} onChange={(v) => onChange("category", v)} />
      <Field label="SKU" value={values.sku} onChange={(v) => onChange("sku", v.toUpperCase())} />
    </div>
    <div className={styles.twoColumns}>
      <Field inputMode="numeric" label="Inventory" value={values.stockQuantity} onChange={(v) => onChange("stockQuantity", v)} />
      <Field inputMode="numeric" label="Low-stock threshold" value={values.lowStockThreshold} onChange={(v) => onChange("lowStockThreshold", v)} />
    </div>
  </div>;
}

function MediaFields({ onFile }: Pick<Props, "onFile">) {
  const change = (event: ChangeEvent<HTMLInputElement>) => onFile(event.target.files?.[0] ?? null);
  return <div className={styles.fields}><h2>Product media</h2><label className={styles.upload}>
    <strong>Upload product image</strong><span>JPEG, PNG, or WebP · maximum 5 MB</span>
    <input accept="image/jpeg,image/png,image/webp" onChange={change} type="file" />
  </label></div>;
}

function PricingFields({ values, onChange }: Props) {
  return <div className={styles.fields}><h2>Pricing</h2><div className={styles.twoColumns}>
    <Field inputMode="decimal" label="Price" value={values.price} onChange={(v) => onChange("price", v)} />
    <Field label="Currency" value={values.currency} onChange={(v) => onChange("currency", v.toUpperCase())} />
  </div></div>;
}

function PersonalizationFields({ values, onChange }: Props) {
  return <div className={styles.fields}><h2>Personalization</h2><Check
    checked={values.personalizationAvailable}
    description="Allow customers to add names, dates, or a gift message to this product."
    label="Personalization available"
    onChange={(value) => onChange("personalizationAvailable", value)}
  /></div>;
}

function EcoFields({ values, onChange }: Props) {
  return <div className={styles.fields}><h2>Eco evidence</h2>
    <Field inputMode="numeric" label="Eco score (0–100)" value={values.ecoScore} onChange={(v) => onChange("ecoScore", v)} />
    <Check checked={values.materialsVerified} label="Materials verified" onChange={(v) => onChange("materialsVerified", v)} />
    <Check checked={values.packagingVerified} label="Packaging verified" onChange={(v) => onChange("packagingVerified", v)} />
    <Check checked={values.contributionVerified} label="Contribution verified" onChange={(v) => onChange("contributionVerified", v)} />
  </div>;
}

function Field({ label, helper, value, onChange, inputMode }: { label: string; helper?: string; value: string; onChange: (value: string) => void; inputMode?: "numeric" | "decimal" }) {
  return <label className={styles.field}><strong>{label}</strong><input inputMode={inputMode} onChange={(e) => onChange(e.target.value)} required value={value} />{helper && <small>{helper}</small>}</label>;
}
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className={styles.field}><strong>{label}</strong><textarea onChange={(e) => onChange(e.target.value)} required rows={4} value={value} /></label>; }
function Check({ checked, label, description, onChange }: { checked: boolean; label: string; description?: string; onChange: (value: boolean) => void }) { return <label className={styles.check}><input checked={checked} onChange={(e) => onChange(e.target.checked)} type="checkbox" /><span><strong>{label}</strong>{description && <small>{description}</small>}</span></label>; }
