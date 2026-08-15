"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Box,
} from "lucide-react";

export interface StockItemProps {
  productId: string;
  productName: string;
  category: string;
  currentStock: number;
  allocatedStock: number;
  availableStock: number;
  unitCostCents: number;
  salesVelocity: {
    unitsSoldPerDay: number;
    trend: "increasing" | "stable" | "decreasing";
    velocityScore: number;
  };
  reorder: {
    recommendedOrderQuantity: number;
    reorderThreshold: number;
    urgency: "critical" | "moderate" | "low" | "none";
    estimatedStockoutDays: number | null;
  };
  wasteIndex: {
    wasteRiskScore: number;
    wasteRiskTag: "high_risk" | "moderate_risk" | "low_risk" | "optimal";
    overstockQuantity: number;
  };
}

export function SmartStockTable({ items }: { items: StockItemProps[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed rounded-xl border-stone-300 text-stone-500 bg-stone-50/50">
        <Box className="w-8 h-8 mx-auto mb-2 opacity-50 text-stone-400" />
        <p className="text-sm font-medium">No inventory items available for analytics.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-stone-200 bg-stone-50/40 shadow-xs">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-stone-100/90 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200">
          <tr>
            <th className="py-3 px-4">Product Name</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Available Stock</th>
            <th className="py-3 px-4">Sales Velocity</th>
            <th className="py-3 px-4">Reorder Badge</th>
            <th className="py-3 px-4">Waste Risk Tag</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200 bg-white">
          {items.map((item) => (
            <tr key={item.productId} className="hover:bg-stone-50/80 transition-colors">
              <td className="py-3 px-4 font-medium text-stone-900">
                <div className="font-semibold text-stone-800">{item.productName}</div>
                <div className="text-[10px] text-stone-400 font-mono">ID: {item.productId}</div>
              </td>
              <td className="py-3 px-4 text-stone-600 font-medium">{item.category}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-stone-900 text-sm">{item.availableStock}</span>
                  <span className="text-stone-400 text-[11px]">/ {item.currentStock} units</span>
                  {item.allocatedStock > 0 && (
                    <span className="ml-1 text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200 font-medium">
                      {item.allocatedStock} reserved
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1.5">
                  <VelocityIcon trend={item.salesVelocity.trend} />
                  <span className="font-semibold text-stone-700">
                    {item.salesVelocity.unitsSoldPerDay} / day
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">
                <ReorderBadge urgency={item.reorder.urgency} qty={item.reorder.recommendedOrderQuantity} />
              </td>
              <td className="py-3 px-4">
                <WasteRiskTag tag={item.wasteIndex.wasteRiskTag} score={item.wasteIndex.wasteRiskScore} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VelocityIcon({ trend }: { trend: "increasing" | "stable" | "decreasing" }) {
  if (trend === "increasing") return <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />;
  if (trend === "decreasing") return <TrendingDown className="w-4 h-4 text-rose-500 shrink-0" />;
  return <Minus className="w-4 h-4 text-stone-400 shrink-0" />;
}

function ReorderBadge({ urgency, qty }: { urgency: string; qty: number }) {
  const styles: Record<string, { bg: string; icon: React.ReactNode; label: string }> = {
    critical: { bg: "bg-rose-100 text-rose-800 border-rose-300", icon: <AlertTriangle className="w-3.5 h-3.5" />, label: `Critical: +${qty} units` },
    moderate: { bg: "bg-amber-100 text-amber-800 border-amber-300", icon: <RefreshCw className="w-3.5 h-3.5" />, label: `Reorder +${qty}` },
    low: { bg: "bg-blue-50 text-blue-700 border-blue-200", icon: <RefreshCw className="w-3.5 h-3.5" />, label: `Planned +${qty}` },
    none: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: "Optimal Level" },
  };
  const config = styles[urgency] || styles.none;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${config.bg}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

function WasteRiskTag({ tag, score }: { tag: string; score: number }) {
  const tags: Record<string, { label: string; className: string }> = {
    high_risk: { label: `High Risk (${score}%)`, className: "bg-rose-50 text-rose-700 border-rose-200 font-semibold" },
    moderate_risk: { label: `Mod Risk (${score}%)`, className: "bg-amber-50 text-amber-700 border-amber-200 font-medium" },
    low_risk: { label: `Low Risk (${score}%)`, className: "bg-blue-50 text-blue-700 border-blue-200 font-medium" },
    optimal: { label: "Optimal Stock", className: "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium" },
  };
  const config = tags[tag] || tags.optimal;
  return (
    <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] border ${config.className}`}>
      {config.label}
    </span>
  );
}
