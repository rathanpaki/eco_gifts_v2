import { Search } from "lucide-react";
import type { AdminImpactQuery, AdminImpactStatus } from "@/types/admin-impact";
import type { ContributionCause } from "@/types/contribution.types";

export function AdminImpactFilters({
  draft,
  onChange,
  onSubmit,
}: {
  draft: AdminImpactQuery;
  onChange: (value: AdminImpactQuery) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      className="mt-5 grid gap-3 rounded-2xl border border-[#d9d5ca] bg-white p-4 md:grid-cols-[1fr_190px_210px_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="relative">
        <span className="sr-only">Search impact records</span>
        <Search className="absolute left-3 top-3.5 size-4 text-[#727970]" />
        <input
          className="min-h-11 w-full rounded-xl border border-[#d9d5ca] bg-[#faf8f3] pl-10 pr-3 text-sm"
          onChange={(event) =>
            onChange({ ...draft, search: event.target.value })
          }
          placeholder="Customer, order, Tree ID"
          type="search"
          value={draft.search}
        />
      </label>
      <select
        aria-label="Verification status"
        className="min-h-11 rounded-xl border border-[#d9d5ca] bg-[#faf8f3] px-3 text-sm"
        onChange={(event) =>
          onChange({
            ...draft,
            status: event.target.value as AdminImpactStatus,
          })
        }
        value={draft.status}
      >
        <option value="all">All statuses</option>
        <option value="pending_verification">Pending</option>
        <option value="verified">Verified</option>
      </select>
      <select
        aria-label="Contribution cause"
        className="min-h-11 rounded-xl border border-[#d9d5ca] bg-[#faf8f3] px-3 text-sm"
        onChange={(event) =>
          onChange({
            ...draft,
            cause: event.target.value as "all" | ContributionCause,
          })
        }
        value={draft.cause}
      >
        <option value="all">All causes</option>
        <option value="Tree Planting">Tree Planting</option>
        <option value="Carbon Offset">Carbon Offset</option>
        <option value="Wildlife Conservation">Wildlife Conservation</option>
      </select>
      <button
        className="min-h-11 rounded-xl bg-[#3d5540] px-5 text-sm font-semibold text-white"
        type="submit"
      >
        Apply filters
      </button>
    </form>
  );
}
