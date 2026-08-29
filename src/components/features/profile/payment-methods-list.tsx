"use client";

import { CreditCard, Trash2 } from "lucide-react";
import {
  useDeleteSavedPaymentMethod,
  useSavedPaymentMethods,
} from "@/hooks/use-account-saved";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";

export function PaymentMethodsList() {
  const methods = useSavedPaymentMethods();
  const remove = useDeleteSavedPaymentMethod();
  return (
    <section className="rounded-[18px] border border-[var(--line)] p-6">
      <h2 className="serif text-[24px]">Saved payment methods</h2>
      <p className="mt-2 text-xs text-[var(--muted)]">
        Save a card during checkout to reuse it here. Security codes are never saved.
      </p>
      {methods.isPending ? (
        <LogoDrawLoader className="mt-4" label="Loading saved cards" size="inline" />
      ) : null}
      <div className="mt-4 grid gap-3">
        {methods.data?.map((method) => (
          <div key={method.id} className="flex items-center gap-4 rounded-xl bg-[var(--subtle)] p-4">
            <CreditCard size={20} className="text-[var(--brand)]" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold capitalize">{method.brand} •••• {method.lastFour}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Expires {String(method.expiryMonth).padStart(2, "0")}/{String(method.expiryYear).slice(-2)}{method.primary ? " · Primary" : ""}</p>
            </div>
            <button type="button" disabled={remove.isPending} onClick={() => remove.mutate(method.id)} aria-label={`Remove card ending ${method.lastFour}`} className="grid size-10 place-items-center rounded-lg text-red-700 hover:bg-red-50"><Trash2 size={16} /></button>
          </div>
        ))}
        {!methods.isPending && !methods.data?.length ? <p className="rounded-xl border border-dashed border-[var(--line)] p-4 text-sm text-[var(--muted)]">No saved cards yet.</p> : null}
      </div>
      {(methods.error || remove.error) ? <p className="mt-3 text-xs text-red-700">{(methods.error ?? remove.error)?.message}</p> : null}
    </section>
  );
}
