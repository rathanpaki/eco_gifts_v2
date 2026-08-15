"use client";

import React from "react";
import { Truck, Leaf, ShieldCheck, Check } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { DeliveryOption } from "@/types/checkout";

interface GreenLogisticsSelectorProps {
  selectedId: string;
  onSelect: (option: DeliveryOption) => void;
  options: DeliveryOption[];
  currency: string;
  className?: string;
}

export function GreenLogisticsSelector({
  selectedId,
  onSelect,
  options,
  currency,
  className = "",
}: GreenLogisticsSelectorProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Delivery Options
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select standard or carbon-neutral shipping for your order
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          const isGreen = option.id === "green-logistics" || option.co2OffsetKg > 0;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option)}
              className={`relative text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 bg-white dark:bg-slate-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isGreen ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {isGreen ? <Leaf className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                    </div>
                    {isGreen && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        Eco Preferred
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  {option.name}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{option.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {option.priceCents === 0 ? "Included" : `+${formatMoney(option.priceCents, currency)}`}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] block">{option.estimatedDays}</span>
                </div>
                {option.co2OffsetKg > 0 ? (
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      -{option.co2OffsetKg}kg CO₂
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-300 block font-semibold">
                      +{option.ecoBonusPoints} Points
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Standard Footprint</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
