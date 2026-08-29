"use client";

import { Award, ExternalLink, MapPin, Sparkles, Trees } from "lucide-react";
import type { TreeIDRecord } from "@/types/contribution.types";

interface TreeTrackerCardProps {
  rewardPoints: number;
  trees: TreeIDRecord[];
  onRedeemVoucher?: () => void;
}

export function TreeTrackerCard({
  rewardPoints,
  trees,
  onRedeemVoucher,
}: TreeTrackerCardProps) {
  const totalCo2 = trees.reduce(
    (sum, tree) => sum + (tree.co2SequestrationKg ?? 0),
    0,
  );
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--brand)] p-5 text-white shadow-xs">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-white">
            <Trees size={23} />
          </span>
          <div>
            <h2 className="font-bold">Our impact</h2>
            <p className="text-xs text-white/70">
              {trees.length} tree records · {totalCo2}kg verified CO₂ impact
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5">
          <Sparkles className="size-4 text-amber-200" />
          <strong className="text-sm text-white">{rewardPoints} pts</strong>
        </div>
      </header>
      <div className="mt-4 flex items-center justify-between text-xs font-semibold text-white/75">
        <span>Tree records</span>
        {onRedeemVoucher && rewardPoints >= 100 ? (
          <button
            type="button"
            onClick={onRedeemVoucher}
            className="text-amber-100 underline"
          >
            Redeem 100 points
          </button>
        ) : null}
      </div>
      {!trees.length ? (
        <p className="mt-3 rounded-xl border border-dashed border-white/20 p-5 text-center text-xs text-white/70">
          No tree contributions are recorded for this account.
        </p>
      ) : null}
      <div className="mt-3 max-h-64 space-y-2.5 overflow-y-auto">
        {trees.map((tree) => (
          <article
            className="flex items-center justify-between gap-3 rounded-xl bg-white/10 p-3"
            key={tree.treeId}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded bg-white/10 px-2 py-0.5 text-xs font-bold text-white">
                  {tree.treeId}
                </code>
                <span className="text-[11px] text-white/70">
                  {tree.status === "verified"
                    ? "Verified"
                    : "Verification pending"}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
                <MapPin className="size-3.5 shrink-0 text-white/70" />
                {tree.partnerLocation ??
                  "Partner location pending verification"}
              </p>
            </div>
            {tree.certificateUrl ? (
              <a
                href={tree.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded bg-white/10 px-2 py-1 text-[11px] text-white"
              >
                <Award size={12} />
                Certificate
                <ExternalLink size={10} />
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
