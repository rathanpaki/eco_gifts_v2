import { X } from "lucide-react";
import type {
  AdminImpactItem,
  AdminImpactPage,
  AdminImpactQuery,
} from "@/types/admin-impact";
import { AdminImpactFilters } from "./admin-impact-filters";
import { AdminImpactTable } from "./admin-impact-table";

type Props = {
  data: AdminImpactPage;
  draft: AdminImpactQuery;
  onChange: (value: AdminImpactQuery) => void;
  onClose: () => void;
  onSubmit: () => void;
  onVerify: (item: AdminImpactItem) => void;
};

export function ImpactRecordsDialog({
  data,
  draft,
  onChange,
  onClose,
  onSubmit,
  onVerify,
}: Props) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/45 p-4">
      <section
        aria-labelledby="impact-records-title"
        aria-modal="true"
        className="max-h-[92vh] w-full max-w-[1120px] overflow-y-auto rounded-2xl bg-[#f2efe7] p-6 shadow-2xl"
        role="dialog"
      >
        <header className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-semibold uppercase text-[#3d5540]">
              Sustainability reporting
            </p>
            <h2 className="serif mt-1 text-3xl" id="impact-records-title">
              Contribution records
            </h2>
            <p className="mt-1 text-xs text-[#616861]">
              Review partner evidence and record verification decisions.
            </p>
          </div>
          <button
            aria-label="Close contribution records"
            className="grid size-10 place-items-center rounded-full border border-[#e3e0d8]"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </header>
        <AdminImpactFilters
          draft={draft}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <AdminImpactTable items={data.items} onVerify={onVerify} />
      </section>
    </div>
  );
}
