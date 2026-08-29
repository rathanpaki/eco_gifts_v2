"use client";

export interface AddressFormValues {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
  phone: string;
}
export type AddressErrors = Partial<Record<keyof AddressFormValues, string>>;

export function CheckoutAddressForm(props: {
  value: AddressFormValues;
  errors: AddressErrors;
  onChange: (value: AddressFormValues) => void;
}) {
  const update = (field: keyof AddressFormValues, next: string) =>
    props.onChange({ ...props.value, [field]: next });
  return (
    <section aria-labelledby="recipient-details-title">
      <h3 id="recipient-details-title" className="mb-[18px] text-[13px] font-semibold text-[var(--muted)]">Recipient details</h3>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field autoComplete="name" error={props.errors.fullName} label="Full name" value={props.value.fullName} onChange={(value) => update("fullName", value)} />
        <Field autoComplete="tel" error={props.errors.phone} label="Phone number" placeholder="+44 7700 900000" value={props.value.phone} onChange={(value) => update("phone", value)} />
        <Field autoComplete="address-line1" error={props.errors.addressLine1} label="Address" value={props.value.addressLine1} onChange={(value) => update("addressLine1", value)} wide />
        <Field autoComplete="address-level2" error={props.errors.city} label="City" value={props.value.city} onChange={(value) => update("city", value)} />
        <Field autoComplete="address-level1" error={props.errors.region} label="State / region (optional)" value={props.value.region} onChange={(value) => update("region", value)} />
        <Field autoComplete="postal-code" error={props.errors.postalCode} label="Postcode" value={props.value.postalCode} onChange={(value) => update("postalCode", value)} />
        <Field autoComplete="country" error={props.errors.countryCode} helper="Use the two-letter country code." label="Country code" maxLength={2} placeholder="GB" value={props.value.countryCode} onChange={(value) => update("countryCode", value.toUpperCase())} />
        <Field autoComplete="address-line2" error={props.errors.addressLine2} helper="Shared only with the delivery partner." label="Delivery note (optional)" placeholder="Access instructions or safe-place note" value={props.value.addressLine2} onChange={(value) => update("addressLine2", value)} wide />
      </div>
    </section>
  );
}

function Field(props: {
  label: string;
  value: string;
  error?: string;
  helper?: string;
  placeholder?: string;
  autoComplete: string;
  maxLength?: number;
  wide?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`flex h-[120px] flex-col gap-2 ${props.wide ? "sm:col-span-2" : ""}`}>
      <span className="text-[13px] font-semibold">{props.label}</span>
      <input aria-invalid={Boolean(props.error)} autoComplete={props.autoComplete} maxLength={props.maxLength ?? 120} onChange={(event) => props.onChange(event.target.value)} placeholder={props.placeholder} value={props.value} className="h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-[15px] outline-none placeholder:text-[var(--muted)] focus:border-[var(--brand)]" />
      <span className={`h-[18px] text-xs ${props.error ? "text-red-700" : "text-[var(--muted)]"}`}>{props.error ?? props.helper ?? " "}</span>
    </label>
  );
}