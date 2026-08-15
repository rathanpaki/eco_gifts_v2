"use client";

import React from "react";
import { Sparkles, Calendar, TrendingUp, PackageCheck, Leaf } from "lucide-react";

export interface CategorySurgeItem {
  category: string;
  surgeMultiplier: number;
  description: string;
}

export interface DemandForecastProps {
  forecast: {
    seasonName: string;
    multiplier: number;
    peakStart: string;
    peakEnd: string;
    projectedDemandUnits: number;
    recommendedStockBuffer: number;
    categorySurges: CategorySurgeItem[];
  };
}

export function DemandForecastCard({ forecast }: DemandForecastProps) {
  const {
    seasonName,
    multiplier,
    peakStart,
    peakEnd,
    projectedDemandUnits,
    recommendedStockBuffer,
    categorySurges,
  } = forecast;

  return (
    <div className="w-full bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-900 text-white rounded-2xl p-5 border border-emerald-700/40 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold tracking-wide text-emerald-50">
              {seasonName} Analytics
            </h3>
            <p className="text-xs text-emerald-300/80 flex items-center gap-1 mt-0.5 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              Peak Demand: {peakStart} – {peakEnd}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 font-semibold text-xs">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{multiplier}x Wedding Demand Surge</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
          <span className="text-[11px] text-emerald-200/70 block uppercase tracking-wider font-semibold">
            Projected Demand
          </span>
          <span className="text-xl font-bold text-white mt-1 block">
            {projectedDemandUnits.toLocaleString()} units
          </span>
        </div>
        <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
          <span className="text-[11px] text-emerald-200/70 block uppercase tracking-wider font-semibold">
            Stock Buffer
          </span>
          <span className="text-xl font-bold text-emerald-400 mt-1 block">
            +{recommendedStockBuffer.toLocaleString()} units
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-emerald-900/40 border border-emerald-500/30 p-3.5 rounded-xl flex items-center gap-3">
          <Leaf className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[11px] text-emerald-200/80 block font-medium">Waste Minimization</span>
            <span className="text-xs text-emerald-300 font-bold">Zero-Overstock Strategy</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/90 flex items-center gap-1.5">
          <PackageCheck className="w-4 h-4" /> Category Wedding Demand Breakdown
        </h4>
        <div className="grid gap-2">
          {categorySurges.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between p-3 bg-black/30 rounded-xl border border-white/5 text-xs hover:border-emerald-500/30 transition-colors"
            >
              <div>
                <span className="font-semibold text-emerald-100">{item.category}</span>
                <p className="text-[11px] text-stone-300/80 mt-0.5 font-normal">{item.description}</p>
              </div>
              <span className="shrink-0 ml-3 px-2.5 py-1 bg-emerald-400/15 text-emerald-300 font-extrabold border border-emerald-400/30 rounded-lg text-xs">
                +{Math.round((item.surgeMultiplier - 1) * 100)}% Surge
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
