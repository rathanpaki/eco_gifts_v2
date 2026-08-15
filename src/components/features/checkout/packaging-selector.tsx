"use client";

import React from "react";
import { Package, Check, Sparkles, Sprout, Gift } from "lucide-react";
import { formatMoney } from "@/lib/format-money";
import type { PackagingOption } from "@/types/checkout";

interface PackagingSelectorProps {
  selectedId: string;
  onSelect: (option: PackagingOption) => void;
  options: PackagingOption[];
  currency: string;
  className?: string;
}

const OPTION_ICONS: Record<string, React.ElementType> = {
  "recycled-box": Package,
  "seed-paper-wrap": Sprout,
  "zero-waste-cloth": Gift,
};

export function PackagingSelector({
  selectedId,
  onSelect,
  options,
  currency,
  className = "",
}: PackagingSelectorProps) {
  const selectedOption = options.find((option) => option.id === selectedId);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Eco-Friendly Packaging Options
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose sustainable packaging to increase your order&apos;s Eco Score
          </p>
        </div>
        {selectedOption && selectedOption.ecoBonusPoints > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            +{selectedOption.ecoBonusPoints} Eco Points
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          const IconComponent = OPTION_ICONS[option.id] || Package;

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
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{option.name}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{option.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {option.priceCents === 0 ? "Included" : `+${formatMoney(option.priceCents, currency)}`}
                </span>
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  -{option.co2SavingsKg}kg CO₂
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
