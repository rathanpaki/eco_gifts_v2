"use client";

import { CheckCircle2, PackageCheck } from "lucide-react";
import type { DeliveryConfirmationStatus } from "@/types/checkout";

interface DeliveryConfirmationCardProps {
  confirmedAt: string | null;
  error?: string;
  onConfirm?: () => void;
  pending?: boolean;
  status: DeliveryConfirmationStatus;
}

export function DeliveryConfirmationCard({
  confirmedAt,
  error,
  onConfirm,
  pending = false,
  status,
}: DeliveryConfirmationCardProps) {
  if (status === "not_ready") return null;
  if (status === "confirmed") {
    return (
      <section
        id="delivery-confirmation"
        className="mt-5 flex scroll-mt-24 gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="text-sm font-bold">Delivery confirmed</h2>
          <p className="mt-1 text-xs leading-5">
            You confirmed receipt
            {confirmedAt ? ` on ${formatDate(confirmedAt)}` : ""}.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section
      id="delivery-confirmation"
      className="mt-5 scroll-mt-24 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950"
    >
      <div className="flex gap-3">
        <PackageCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="text-sm font-bold">Was your order delivered?</h2>
          <p className="mt-1 text-xs leading-5">
            EcoGifts marked this order delivered. Confirm only after the package
            is in your possession.
          </p>
        </div>
      </div>
      {error ? (
        <p className="mt-3 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      {onConfirm ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (window.confirm("Confirm that you received this order?"))
              onConfirm();
          }}
          className="mt-4 min-h-11 w-full rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Confirming…" : "Confirm I received this order"}
        </button>
      ) : null}
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
