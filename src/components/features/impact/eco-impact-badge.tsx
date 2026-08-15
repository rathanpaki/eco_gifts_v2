"use client";

import React from "react";
import { Leaf, Sparkles, ShieldCheck } from "lucide-react";
import { EcoGrade } from "@/types/impact.types";

interface EcoImpactBadgeProps {
  score: number;
  grade: EcoGrade;
  highlights?: string[];
  co2SavedKg?: number;
  plasticAvoidedGrams?: number;
  variant?: "compact" | "full" | "inline";
  className?: string;
}

const GRADE_STYLES: Record<EcoGrade, { bg: string; text: string; border: string; badgeBg: string }> = {
  "A+": { bg: "bg-emerald-500/10 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-500/30", badgeBg: "bg-emerald-600 text-white" },
  A: { bg: "bg-teal-500/10 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-400", border: "border-teal-500/30", badgeBg: "bg-teal-600 text-white" },
  B: { bg: "bg-amber-500/10 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", border: "border-amber-500/30", badgeBg: "bg-amber-600 text-white" },
  C: { bg: "bg-slate-500/10 dark:bg-slate-900/30", text: "text-slate-700 dark:text-slate-400", border: "border-slate-500/30", badgeBg: "bg-slate-600 text-white" },
};

export function EcoImpactBadge({ score, grade, highlights = [], co2SavedKg, plasticAvoidedGrams, variant = "full", className = "" }: EcoImpactBadgeProps) {
  const styles = GRADE_STYLES[grade] || GRADE_STYLES["B"];

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles.bg} ${styles.text} border ${styles.border} ${className}`}>
        <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
        <span>Eco Score {score}/100</span>
        <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] uppercase font-extrabold ${styles.badgeBg}`}>{grade}</span>
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-between p-3 rounded-xl border ${styles.bg} ${styles.border} ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">{grade}</div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Eco Score Rating</div>
            <div className={`text-sm font-bold ${styles.text}`}>{score} / 100 Points</div>
          </div>
        </div>
        <Leaf className="w-5 h-5 text-emerald-500 opacity-80" />
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-2xl border ${styles.bg} ${styles.border} shadow-xs space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"><Leaf className="w-5 h-5" /></div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              Environmental Impact <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Verified eco-friendly rating</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide ${styles.badgeBg}`}>Grade {grade}</span>
          <div className="text-xs font-extrabold text-slate-700 dark:text-slate-200 mt-1">{score}/100</div>
        </div>
      </div>
      {(co2SavedKg !== undefined || plasticAvoidedGrams !== undefined) && (
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50 text-xs">
          {co2SavedKg !== undefined && (
            <div className="bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg text-center">
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">CO₂ Saved</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{co2SavedKg} kg</span>
            </div>
          )}
          {plasticAvoidedGrams !== undefined && (
            <div className="bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg text-center">
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">Plastic Avoided</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">{plasticAvoidedGrams} g</span>
            </div>
          )}
        </div>
      )}
      {highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {highlights.map((h, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />{h}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
