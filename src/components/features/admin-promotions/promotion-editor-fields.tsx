import type { PromotionDraft } from "./promotion-editor.types";

export function PromotionEditorFields(props: {
  set: <K extends keyof PromotionDraft>(
    key: K,
    value: PromotionDraft[K],
  ) => void;
  values: PromotionDraft;
}) {
  const { set, values } = props;
  return (
    <div className="rounded-[20px] border border-[var(--line)] bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Offer basics</h2>
        <span className="text-[11px] text-[#8a918a]">1 of 3</span>
      </div>
      <Field
        label="Promotion name"
        helper="Internal name only"
        value={values.name}
        onChange={(value) => set("name", value)}
      />

      <fieldset className="mt-4">
        <legend className="text-[11px] font-semibold text-[var(--muted)]">
          Discount type
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            ["percentage", "Percentage"],
            ["fixed", "Fixed amount"],
            ["free_delivery", "Free delivery"],
          ].map(([value, label]) => (
            <Choice
              key={value}
              label={label}
              active={values.discountType === value}
              onClick={() =>
                set("discountType", value as PromotionDraft["discountType"])
              }
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Field
          label="Discount value"
          helper={
            values.discountType === "fixed"
              ? "Amount in dollars"
              : "Approval required above 15%"
          }
          value={values.discountValue}
          onChange={(value) => set("discountValue", value)}
          type="number"
          disabled={values.discountType === "free_delivery"}
        />
        <Field
          label="Customer-facing code"
          helper="Shown at checkout"
          value={values.code}
          onChange={(value) => set("code", value.toUpperCase())}
        />
        <Field
          label="Minimum basket"
          helper="Before delivery"
          value={values.minimumBasket}
          onChange={(value) => set("minimumBasket", value)}
          type="number"
        />
      </div>

      <div className="my-5 h-px bg-[var(--line)]" />
      <h2 className="text-lg font-semibold">Eligibility</h2>
      <fieldset className="mt-3">
        <legend className="text-[11px] font-semibold text-[var(--muted)]">
          Applies to
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            ["all", "All gifts"],
            ["collections", "Collections"],
            ["products", "Specific items"],
          ].map(([value, label]) => (
            <Choice
              key={value}
              label={label}
              active={values.appliesTo === value}
              onClick={() =>
                set("appliesTo", value as PromotionDraft["appliesTo"])
              }
            />
          ))}
        </div>
      </fieldset>
      {values.appliesTo !== "all" && (
        <Field
          label={
            values.appliesTo === "collections"
              ? "Included collections"
              : "Included product IDs"
          }
          helper="Separate multiple values with commas"
          value={values.eligibleIds}
          onChange={(value) => set("eligibleIds", value)}
        />
      )}

      <div className="my-5 h-px bg-[var(--line)]" />
      <h2 className="text-lg font-semibold">Schedule</h2>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <Field
          label="Starts"
          value={values.startsAt}
          onChange={(value) => set("startsAt", value)}
          type="datetime-local"
        />
        <Field
          label="Ends"
          value={values.endsAt}
          onChange={(value) => set("endsAt", value)}
          type="datetime-local"
        />
      </div>
    </div>
  );
}

function Field(props: {
  disabled?: boolean;
  helper?: string;
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label className="mt-3 block text-[11px] font-semibold text-[var(--muted)]">
      {props.label}
      <input
        required
        disabled={props.disabled}
        type={props.type ?? "text"}
        value={props.disabled ? "0" : props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-3 text-[13px] font-normal text-[var(--ink)] outline-none focus:border-[var(--brand)] disabled:opacity-50"
      />
      {props.helper && (
        <span className="mt-1.5 block text-[10px] font-normal text-[#8a918a]">
          {props.helper}
        </span>
      )}
    </label>
  );
}

function Choice(props: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      aria-pressed={props.active}
      className={`h-9 rounded-full border px-4 text-xs ${
        props.active
          ? "border-[#b5c9b6] bg-[#eef4ee] font-semibold text-[var(--brand)]"
          : "border-[var(--line)] text-[var(--muted)]"
      }`}
    >
      {props.label}
    </button>
  );
}
