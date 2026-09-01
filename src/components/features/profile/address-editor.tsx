"use client";

import { FormEvent, useState } from "react";
import type { AccountAddress, AddressValues } from "@/types/account-profile";

const emptyAddress: AddressValues = {
  label: "Home",
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "United Kingdom",
  countryCode: "GB",
  phone: "",
  primary: false,
};

type Props = {
  address?: AccountAddress;
  error?: string;
  onCancel: () => void;
  onSave: (values: AddressValues) => void;
  pending: boolean;
};

export function AddressEditor(props: Props) {
  const [values, setValues] = useState<AddressValues>(
    props.address ? fromAddress(props.address) : emptyAddress,
  );
  const set = (key: keyof AddressValues, value: string | boolean) =>
    setValues((current) => ({ ...current, [key]: value }));
  const valid =
    values.label.trim().length >= 2 &&
    values.fullName.trim().length >= 2 &&
    values.line1.trim().length >= 2 &&
    values.city.trim().length >= 2 &&
    values.postalCode.trim().length >= 2 &&
    /^[A-Z]{2}$/.test(values.countryCode) &&
    /^\+?[0-9 ()-]{7,24}$/.test(values.phone);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (valid) props.onSave(values);
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/50 p-4">
      <form
        onSubmit={submit}
        className="glass-panel my-6 w-full max-w-[720px] rounded-3xl p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-editor-title"
      >
        <h2 id="address-editor-title" className="serif text-[28px]">
          {props.address ? "Edit saved address" : "Add new address"}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Address label" value={values.label} onChange={(value) => set("label", value)} />
          <Field label="Recipient name" value={values.fullName} onChange={(value) => set("fullName", value)} />
          <Field wide label="Address line 1" value={values.line1} onChange={(value) => set("line1", value)} />
          <Field wide label="Address line 2 (optional)" value={values.line2 ?? ""} onChange={(value) => set("line2", value)} />
          <Field label="City" value={values.city} onChange={(value) => set("city", value)} />
          <Field label="State / region (optional)" value={values.region ?? ""} onChange={(value) => set("region", value)} />
          <Field label="Postcode" value={values.postalCode} onChange={(value) => set("postalCode", value)} />
          <Field label="Country" value={values.country} onChange={(value) => set("country", value)} />
          <Field label="Country code" maxLength={2} value={values.countryCode} onChange={(value) => set("countryCode", value.toUpperCase())} />
          <Field label="Phone number" type="tel" value={values.phone} onChange={(value) => set("phone", value)} />
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm font-medium">
          <input type="checkbox" checked={values.primary} onChange={(event) => set("primary", event.target.checked)} className="size-4 accent-[var(--brand)]" />
          Use as my primary delivery address
        </label>
        {props.error ? <p className="mt-3 text-sm text-red-700" role="alert">{props.error}</p> : null}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={props.onCancel} disabled={props.pending} className="h-11 rounded-xl border border-[var(--line)] px-5 text-sm font-semibold">Cancel</button>
          <button type="submit" disabled={!valid || props.pending} className="premium-action h-11 rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white disabled:opacity-50">{props.pending ? "Saving..." : "Save address"}</button>
        </div>
      </form>
    </div>
  );
}

function Field(props: { label: string; maxLength?: number; onChange: (value: string) => void; type?: string; value: string; wide?: boolean }) {
  return (
    <label className={`text-xs font-semibold ${props.wide ? "sm:col-span-2" : ""}`}>
      {props.label}
      <input required={!props.label.includes("optional")} type={props.type ?? "text"} maxLength={props.maxLength ?? 160} value={props.value} onChange={(event) => props.onChange(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-sm font-normal outline-none focus:border-[var(--brand)]" />
    </label>
  );
}

function fromAddress(address: AccountAddress): AddressValues {
  return {
    label: address.label,
    fullName: address.fullName,
    line1: address.line1,
    line2: address.line2 ?? "",
    city: address.city,
    region: address.region ?? "",
    postalCode: address.postalCode,
    country: address.country,
    countryCode: address.countryCode,
    phone: address.phone ?? "",
    primary: address.primary,
  };
}
