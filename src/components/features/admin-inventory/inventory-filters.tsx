import { Search } from "lucide-react";

export type StockFilter = "all" | "low" | "out";

const filters: { label: string; value?: StockFilter }[] = [
  { label: "All stock", value: "all" },
  { label: "Low", value: "low" },
  { label: "Out", value: "out" },
  { label: "Incoming" },
];

export function InventoryFilters({
  filter,
  onFilter,
  onSearch,
  search,
}: {
  filter: StockFilter;
  onFilter: (value: StockFilter) => void;
  onSearch: (value: string) => void;
  search: string;
}) {
  return (
    <div className="mt-5 flex min-h-[72px] flex-wrap items-center gap-2 rounded-2xl border border-[#e3e0d8] bg-white p-[11px_15px]">
      <label className="relative mr-3 w-full max-w-[360px]">
        <span className="sr-only">Search inventory</span>
        <Search className="absolute left-[13px] top-[14px] size-5 text-[#3d5540]" />
        <input
          className="h-12 w-full rounded-xl border border-[#e3e0d8] bg-[#faf8f3] pl-[43px] pr-3 text-xs outline-none focus:border-[#3d5540]"
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search SKU or product name"
          type="search"
          value={search}
        />
      </label>
      {filters.map((choice) => {
        const active = choice.value === filter;
        return (
          <button
            aria-pressed={choice.value ? active : undefined}
            className={`h-9 rounded-full border px-5 text-xs font-medium ${
              active
                ? "border-[#b5c9b6] bg-[#eef4ee] font-semibold text-[#3d5540]"
                : "border-[#e3e0d8] bg-white text-[#616861]"
            }`}
            disabled={!choice.value}
            key={choice.label}
            onClick={() => choice.value && onFilter(choice.value)}
            title={
              choice.value ? undefined : "Purchase orders are not tracked yet"
            }
            type="button"
          >
            {choice.label}
          </button>
        );
      })}
    </div>
  );
}
