"use client";

import { Banknote, ShieldCheck } from "lucide-react";
import { formatMoney } from "@/lib/format-money";

interface PaymentMethodPanelProps {
  totalCents: number;
  currency: string;
  pending: boolean;
}

export function PaymentMethodPanel({ totalCents, currency, pending }: PaymentMethodPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs" aria-labelledby="payment-method-title">
      <h2 className="text-lg font-bold text-slate-900" id="payment-method-title">Payment method</h2>
      <div className="mt-4 flex items-start gap-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4">
        <Banknote className="mt-0.5 size-5 shrink-0 text-emerald-700" />
        <div><strong className="text-sm text-emerald-950">Pay on delivery</strong><p className="mt-1 text-xs leading-5 text-emerald-800">Pay {formatMoney(totalCents, currency)} when the tracked order reaches your delivery address. No card data is collected.</p></div>
      </div>
      <button type="submit" disabled={pending} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60">
        <ShieldCheck size={17} />{pending ? "Placing order…" : "Place order"}
      </button>
    </section>
  );
}
