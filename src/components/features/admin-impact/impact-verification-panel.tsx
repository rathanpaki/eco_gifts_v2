"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useVerifyAdminImpact } from "@/hooks/use-admin-impact";
import type { AdminImpactItem } from "@/types/admin-impact";

export function ImpactVerificationPanel({
  item,
  onClose,
}: {
  item: AdminImpactItem;
  onClose: () => void;
}) {
  const verify = useVerifyAdminImpact(item.id);
  const [partnerName, setPartnerName] = useState("");
  const [partnerLocation, setPartnerLocation] = useState("");
  const [plantedDate, setPlantedDate] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");
  const [co2, setCo2] = useState("");
  const isTree = Boolean(item.treeId);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    verify.mutate(
      isTree
        ? {
            partnerName: partnerName.trim(),
            partnerLocation: partnerLocation.trim(),
            plantedDate,
            ...(certificateUrl.trim()
              ? { certificateUrl: certificateUrl.trim() }
              : {}),
            co2SequestrationKg: Number(co2),
          }
        : {},
      { onSuccess: onClose },
    );
  };
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
      <section className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-[#faf8f3] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#3d5540]">
              Verification record
            </p>
            <h2 className="mt-2 text-2xl font-bold">{item.cause}</h2>
            <p className="mt-1 text-sm text-[#727970]">
              {item.orderId} {item.treeId ? `· ${item.treeId}` : ""}
            </p>
          </div>
          <button
            aria-label="Close verification"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          {isTree ? (
            <>
              <Field
                label="Partner name"
                onChange={setPartnerName}
                required
                value={partnerName}
              />
              <Field
                label="Partner location"
                onChange={setPartnerLocation}
                required
                value={partnerLocation}
              />
              <label className="block text-sm font-semibold">
                Planting date
                <input
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#d9d5ca] bg-white px-3 font-normal"
                  onChange={(event) => setPlantedDate(event.target.value)}
                  required
                  type="date"
                  value={plantedDate}
                />
              </label>
              <Field
                label="Certificate URL (optional)"
                onChange={setCertificateUrl}
                type="url"
                value={certificateUrl}
              />
              <Field
                label="CO₂ sequestration (kg)"
                onChange={setCo2}
                required
                type="number"
                value={co2}
              />
            </>
          ) : (
            <p className="rounded-xl bg-[#f2efe7] p-4 text-sm text-[#565d57]">
              Confirm that the partner evidence for this contribution has been
              reviewed. The audit record will store your administrator identity.
            </p>
          )}
          {verify.error ? (
            <p className="text-sm text-red-700" role="alert">
              {verify.error.message}
            </p>
          ) : null}
          <div className="flex justify-end gap-3 pt-2">
            <button
              className="min-h-11 px-4 text-sm font-semibold"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="min-h-11 rounded-xl bg-[#3d5540] px-5 text-sm font-semibold text-white disabled:opacity-50"
              disabled={verify.isPending}
              type="submit"
            >
              {verify.isPending ? "Verifying…" : "Verify impact"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  onChange,
  required,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        className="mt-2 min-h-11 w-full rounded-xl border border-[#d9d5ca] bg-white px-3 font-normal"
        min={type === "number" ? 0 : undefined}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        step={type === "number" ? "0.1" : undefined}
        type={type}
        value={value}
      />
    </label>
  );
}
