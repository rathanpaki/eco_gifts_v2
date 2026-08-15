"use client";

import Image from "next/image";
import { Leaf, Package, ShieldCheck, Truck } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { CheckoutQuote } from "@/types/checkout";

export function CheckoutSummary({ quote }: { quote: CheckoutQuote }) {
  return (
    <aside className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="font-bold text-slate-900">Order summary</h2>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {quote.items.length} {quote.items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
        {quote.items.map((item) => (
          <div className="flex items-center justify-between gap-3 text-xs" key={item.itemId}>
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {item.image ? (
                  <Image
                    alt={item.image.alt}
                    fill
                    sizes="40px"
                    src={item.image.url}
                    unoptimized={shouldBypassImageOptimization(item.image.url)}
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-800">{item.name}</p>
                <p className="text-[11px] text-slate-500">Qty {item.quantity} · Eco score {item.ecoScore}</p>
                {item.customization ? <p className="text-[11px] font-semibold text-emerald-700">Personalized</p> : null}
              </div>
            </div>
            <strong className="shrink-0">{formatMoney(item.lineTotalCents, quote.currency)}</strong>
          </div>
        ))}
      </div>

      <dl className="space-y-2 border-t border-slate-100 pt-4 text-xs">
        <Row icon={Package} label={quote.packaging.name} value={formatMoney(quote.packaging.priceCents, quote.currency)} />
        <Row icon={Truck} label={quote.delivery.name} value={formatMoney(quote.delivery.priceCents, quote.currency)} />
      </dl>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900">
        <div className="flex items-center justify-between gap-3 font-bold">
          <span className="flex items-center gap-1.5"><Leaf size={15} />Estimated impact</span>
          <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-white">Grade {quote.impact.grade} · {quote.impact.score}/100</span>
        </div>
        <p className="mt-2 text-[11px] text-emerald-700">
          {quote.impact.co2SavedKg}kg estimated CO₂ saving · methodology {quote.impact.methodologyVersion}
        </p>
      </div>

      <div className="space-y-2 border-t border-slate-200 pt-4 text-xs">
        <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatMoney(quote.subtotalCents, quote.currency)}</span></div>
        <div className="flex justify-between text-base font-black text-slate-900"><span>Total due</span><span className="text-emerald-700">{formatMoney(quote.totalCents, quote.currency)}</span></div>
        <p className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-500"><ShieldCheck size={13} />Payment is collected when the order is delivered.</p>
      </div>
    </aside>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return <div className="flex items-center justify-between gap-3"><dt className="flex items-center gap-1.5 text-slate-600"><Icon size={14} className="text-emerald-600" />{label}</dt><dd className="font-medium text-slate-900">{value}</dd></div>;
}
