"use client";

import { useState } from "react";
import { useAdminImpact } from "@/hooks/use-admin-impact";
import type { AdminImpactItem, AdminImpactQuery } from "@/types/admin-impact";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { ImpactVerificationPanel } from "./impact-verification-panel";
import { ImpactRecordsDialog } from "./impact-records-dialog";
import { exportImpactReport } from "./impact-report-export";
import { ImpactReportSummary, impactPeriod } from "./impact-report-summary";

const initial: AdminImpactQuery = {
  cause: "all",
  search: "",
  status: "all",
};

export function AdminImpactPage() {
  const [query, setQuery] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [recordsOpen, setRecordsOpen] = useState(false);
  const [selected, setSelected] = useState<AdminImpactItem | null>(null);
  const result = useAdminImpact(query);

  return (
    <section className="flex min-h-screen w-full max-w-[1200px] flex-col gap-[22px] bg-[#f2efe7] px-6 py-10 text-[#252a26] lg:px-12 lg:py-[42px]">
      <header className="flex min-h-[76px] flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase text-[#3d5540]">
            Sustainability reporting
          </p>
          <h1 className="serif mt-1 text-[35px] leading-none">
            Impact reports
          </h1>
          <p className="mt-[7px] text-xs text-[#616861]">
            Measured operational outcomes with reporting scope and verification
            status.
          </p>
        </div>
        {result.data && (
          <div className="flex gap-0">
            <span className="flex h-[42px] w-[174px] items-center justify-center rounded-l-[10px] border border-[#e3e0d8] bg-[#faf8f3] text-[11px] font-semibold text-[#616861]">
              {impactPeriod(result.data.trend)}
            </span>
            <button
              className="h-[42px] w-[140px] rounded-r-[10px] bg-[#3d5540] text-[11px] font-semibold text-white"
              onClick={() => exportImpactReport(result.data)}
              type="button"
            >
              Export report
            </button>
          </div>
        )}
      </header>
      {result.isLoading && (
        <LogoDrawLoader label="Loading impact report" />
      )}
      {result.isError && (
        <div className="rounded-2xl bg-red-50 p-5 text-sm text-red-700">
          <p>{result.error.message}</p>
          <button
            className="mt-3 font-semibold"
            onClick={() => void result.refetch()}
            type="button"
          >
            Try again
          </button>
        </div>
      )}
      {result.data && (
        <ImpactReportSummary
          data={result.data}
          onReview={() => setRecordsOpen(true)}
        />
      )}
      {recordsOpen && result.data && (
        <ImpactRecordsDialog
          data={result.data}
          draft={draft}
          onChange={setDraft}
          onClose={() => setRecordsOpen(false)}
          onSubmit={() => setQuery({ ...draft, search: draft.search.trim() })}
          onVerify={setSelected}
        />
      )}
      {selected && (
        <ImpactVerificationPanel
          item={selected}
          key={selected.id}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
