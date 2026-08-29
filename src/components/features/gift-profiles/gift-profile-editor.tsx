"use client";

import { useState, type FormEvent } from "react";
import type { GiftProfile, GiftProfileValues } from "@/types/account-saved";

const empty: GiftProfileValues = {
  recipientName: "",
  relationship: "",
  occasion: "",
  importantDate: "",
  notes: "",
};

export function GiftProfileEditor(props: {
  profile?: GiftProfile;
  pending: boolean;
  error?: string;
  onCancel: () => void;
  onSave: (values: GiftProfileValues) => void;
}) {
  const [values, setValues] = useState<GiftProfileValues>(
    props.profile
      ? {
          recipientName: props.profile.recipientName,
          relationship: props.profile.relationship,
          occasion: props.profile.occasion,
          importantDate: props.profile.importantDate ?? "",
          notes: props.profile.notes ?? "",
        }
      : empty,
  );
  function change(field: keyof GiftProfileValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    props.onSave(values);
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" role="presentation">
      <section className="w-full max-w-xl rounded-[20px] bg-[var(--page)] p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="gift-profile-title">
        <h2 id="gift-profile-title" className="serif text-2xl">{props.profile ? "Edit gift profile" : "Add gift profile"}</h2>
        <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={submit}>
          <Field label="Recipient name" value={values.recipientName} onChange={(value) => change("recipientName", value)} required />
          <Field label="Relationship" value={values.relationship} onChange={(value) => change("relationship", value)} required />
          <Field label="Occasion" value={values.occasion} onChange={(value) => change("occasion", value)} required />
          <Field label="Important date" type="date" value={values.importantDate ?? ""} onChange={(value) => change("importantDate", value)} />
          <label className="grid gap-2 text-xs font-semibold sm:col-span-2">Notes<textarea className="min-h-24 rounded-[10px] border border-[var(--line)] bg-transparent px-3 py-2 font-normal" maxLength={500} value={values.notes ?? ""} onChange={(event) => change("notes", event.target.value)} /></label>
          {props.error ? <p className="text-xs text-red-700 sm:col-span-2" role="alert">{props.error}</p> : null}
          <div className="flex justify-end gap-3 sm:col-span-2">
            <button type="button" className="h-10 rounded-[10px] border border-[var(--line)] px-5 text-xs font-semibold" onClick={props.onCancel}>Cancel</button>
            <button disabled={props.pending} className="h-10 rounded-[10px] bg-[var(--brand)] px-5 text-xs font-semibold text-white disabled:opacity-50">{props.pending ? "Saving..." : "Save profile"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field(props: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <label className="grid gap-2 text-xs font-semibold">{props.label}<input className="h-11 rounded-[10px] border border-[var(--line)] bg-transparent px-3 font-normal" type={props.type} required={props.required} maxLength={100} value={props.value} onChange={(event) => props.onChange(event.target.value)} /></label>;
}