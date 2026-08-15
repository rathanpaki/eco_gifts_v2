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

interface CheckoutAddressFormProps {
  value: AddressFormValues;
  errors: AddressErrors;
  onChange: (value: AddressFormValues) => void;
}

export function CheckoutAddressForm({ value, errors, onChange }: CheckoutAddressFormProps) {
  const update = (field: keyof AddressFormValues, next: string) => {
    onChange({ ...value, [field]: next });
  };
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs" aria-labelledby="delivery-address-title">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900" id="delivery-address-title">Delivery address</h2>
        <p className="mt-1 text-xs text-slate-500">Used only to fulfil and support this order.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field autoComplete="name" error={errors.fullName} label="Full name" value={value.fullName} onChange={(next) => update("fullName", next)} wide />
        <Field autoComplete="address-line1" error={errors.addressLine1} label="Address line 1" value={value.addressLine1} onChange={(next) => update("addressLine1", next)} wide />
        <Field autoComplete="address-line2" error={errors.addressLine2} label="Address line 2 (optional)" value={value.addressLine2} onChange={(next) => update("addressLine2", next)} wide />
        <Field autoComplete="address-level2" error={errors.city} label="City" value={value.city} onChange={(next) => update("city", next)} />
        <Field autoComplete="address-level1" error={errors.region} label="County / region (optional)" value={value.region} onChange={(next) => update("region", next)} />
        <Field autoComplete="postal-code" error={errors.postalCode} label="Postal code" value={value.postalCode} onChange={(next) => update("postalCode", next)} />
        <Field autoComplete="country" error={errors.countryCode} label="Country code" maxLength={2} value={value.countryCode} onChange={(next) => update("countryCode", next.toUpperCase())} />
        <Field autoComplete="tel" error={errors.phone} label="Phone (optional)" value={value.phone} onChange={(next) => update("phone", next)} wide />
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  error?: string;
  autoComplete: string;
  maxLength?: number;
  wide?: boolean;
  onChange: (value: string) => void;
}

function Field({ label, value, error, autoComplete, maxLength, wide, onChange }: FieldProps) {
  return (
    <label className={wide ? "sm:col-span-2" : undefined}>
      <span className="mb-1 block text-xs font-bold text-slate-700">{label}</span>
      <input
        autoComplete={autoComplete}
        maxLength={maxLength ?? 120}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
      />
      {error ? <span className="mt-1 block text-[11px] text-red-700">{error}</span> : null}
    </label>
  );
}
