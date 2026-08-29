import styles from "@/components/features/admin-products/product-fields.module.css";

export function Field({
  label,
  helper,
  value,
  onChange,
  inputMode,
}: {
  label: string;
  helper?: string;
  value: string;
  onChange: (value: string) => void;
  inputMode?: "numeric" | "decimal";
}) {
  return (
    <label className={styles.field}>
      <strong>{label}</strong>
      <input
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        required
        value={value}
      />
      {helper && <small>{helper}</small>}
    </label>
  );
}

export function CategoryField({
  categories,
  label,
  onChange,
  value,
}: {
  categories: string[];
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const options = Array.from(new Set([...categories, value].filter(Boolean)));
  return (
    <label className={styles.field}>
      <strong>{label}</strong>
      <input
        autoComplete="off"
        list="existing-product-categories"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search or enter a category"
        required
        value={value}
      />
      <datalist id="existing-product-categories">
        {options.map((category) => (
          <option key={category.toLowerCase()} value={category} />
        ))}
      </datalist>
      <small>Choose an existing category or type a new one.</small>
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <strong>{label}</strong>
      <textarea
        onChange={(event) => onChange(event.target.value)}
        required
        rows={4}
        value={value}
      />
    </label>
  );
}

export function Check({
  checked,
  label,
  description,
  onChange,
}: {
  checked: boolean;
  label: string;
  description?: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className={styles.check}>
      <input
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span>
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </span>
    </label>
  );
}
