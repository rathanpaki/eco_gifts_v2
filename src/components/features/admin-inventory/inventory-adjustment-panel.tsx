"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import {
  useAdjustInventory,
  useInventoryHistory,
} from "@/hooks/use-admin-inventory";
import type {
  InventoryAdjustmentInput,
  StockAnalytics,
} from "@/types/admin-inventory";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";

export function InventoryAdjustmentPanel({
  item,
  onClose,
}: {
  item: StockAnalytics;
  onClose: () => void;
}) {
  const history = useInventoryHistory(item.productId);
  const adjust = useAdjustInventory(item.productId);
  const [kind, setKind] = useState<InventoryAdjustmentInput["kind"]>("restock");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    adjust.mutate(
      {
        kind,
        quantityDelta: Number(quantity),
        reason: reason.trim(),
      },
      {
        onSuccess: () => {
          setQuantity("");
          setReason("");
        },
      },
    );
  };
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#faf8f3] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#3d5540]">
              Inventory adjustment
            </p>
            <h2 className="mt-2 text-2xl font-bold">{item.productName}</h2>
            <p className="mt-1 text-sm text-[#727970]">
              Current stock: {item.currentStock} · Available:{" "}
              {item.availableStock}
            </p>
          </div>
          <button aria-label="Close adjustment" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={submit}>
          <label className="text-sm font-semibold">
            Adjustment type
            <select
              className="mt-2 min-h-11 w-full rounded-xl border border-[#d9d5ca] bg-white px-3 font-normal"
              onChange={(event) =>
                setKind(event.target.value as InventoryAdjustmentInput["kind"])
              }
              value={kind}
            >
              <option value="restock">Restock</option>
              <option value="adjustment">Manual correction</option>
            </select>
          </label>
          <label className="text-sm font-semibold">
            Quantity change
            <input
              className="mt-2 min-h-11 w-full rounded-xl border border-[#d9d5ca] bg-white px-3 font-normal"
              min={kind === "restock" ? 1 : undefined}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder={kind === "restock" ? "25" : "-2 or 2"}
              required
              type="number"
              value={quantity}
            />
          </label>
          <label className="text-sm font-semibold sm:col-span-2">
            Reason
            <textarea
              className="mt-2 min-h-24 w-full rounded-xl border border-[#d9d5ca] bg-white p-3 font-normal"
              maxLength={200}
              minLength={3}
              onChange={(event) => setReason(event.target.value)}
              required
              value={reason}
            />
          </label>
          {adjust.error ? (
            <p className="text-sm text-red-700 sm:col-span-2">
              {adjust.error.message}
            </p>
          ) : null}
          <button
            className="min-h-11 rounded-xl bg-[#3d5540] px-5 text-sm font-semibold text-white disabled:opacity-50 sm:col-span-2"
            disabled={adjust.isPending}
            type="submit"
          >
            {adjust.isPending ? "Saving adjustment…" : "Save adjustment"}
          </button>
        </form>
        <div className="mt-7 border-t border-[#d9d5ca] pt-5">
          <h3 className="font-bold">Recent inventory history</h3>
          {history.isLoading ? (
            <LogoDrawLoader
              className="mt-3"
              label="Loading inventory history"
              size="inline"
            />
          ) : null}
          <div className="mt-3 space-y-2">
            {history.data?.map((event) => (
              <article
                className="flex items-center justify-between gap-4 rounded-xl bg-white p-3 text-sm"
                key={event.id}
              >
                <div>
                  <p className="font-semibold">{event.reason}</p>
                  <p className="mt-1 text-xs text-[#727970]">
                    {event.type.replaceAll("_", " ")} ·{" "}
                    {new Date(event.createdAt).toLocaleString()}
                  </p>
                </div>
                <p
                  className={
                    event.quantityDelta > 0
                      ? "font-bold text-emerald-700"
                      : "font-bold text-red-700"
                  }
                >
                  {event.quantityDelta > 0 ? "+" : ""}
                  {event.quantityDelta} · {event.stockAfter} left
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
