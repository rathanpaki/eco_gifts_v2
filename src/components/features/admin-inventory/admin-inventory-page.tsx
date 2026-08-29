"use client";

import { useMemo, useState } from "react";
import { useInventoryAnalytics } from "@/hooks/use-admin-inventory";
import { exportInventoryCsv } from "@/services/admin-inventory.service";
import type { StockAnalytics } from "@/types/admin-inventory";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { InventoryAdjustmentPanel } from "./inventory-adjustment-panel";
import { InventoryFilters, type StockFilter } from "./inventory-filters";
import { InventoryMetrics } from "./inventory-metrics";
import { InventoryTable } from "./inventory-table";
import { LowStockPanel } from "./low-stock-panel";

export function AdminInventoryPage() {
  const report = useInventoryAnalytics();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StockFilter>("all");
  const [selected, setSelected] = useState<StockAnalytics | null>(null);
  const items = useMemo(() => {
    const value = search.trim().toLowerCase();
    return (report.data?.items ?? []).filter((item) => {
      const matchesSearch =
        !value ||
        [item.productName, item.productId, item.category].some((field) =>
          field.toLowerCase().includes(value),
        );
      const matchesFilter =
        filter === "all" ||
        (filter === "out" && item.availableStock === 0) ||
        (filter === "low" && item.reorder.urgency !== "none");
      return matchesSearch && matchesFilter;
    });
  }, [filter, report.data?.items, search]);

  return (
    <section className="min-h-screen w-full max-w-[1200px] bg-[#faf8f3] px-6 py-7 text-[#252a26] lg:px-9">
      <header className="flex min-h-20 flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-[10px] font-semibold uppercase text-[#3d5540]">
            Catalog · inventory
          </p>
          <h1 className="serif mt-1 text-[32px] leading-[38px]">
            Inventory & stock
          </h1>
          <p className="mt-1 text-[13px] text-[#616861]">
            Monitor availability, reorder thresholds, and stock adjustments
            without leaving the catalog.
          </p>
        </div>
        <div className="mt-5 flex gap-4">
          <button
            className="h-11 w-[136px] rounded-xl border border-[#b5c9b6] bg-white text-[13px] font-semibold text-[#3d5540] disabled:opacity-40"
            disabled={!report.data?.items.length}
            onClick={() => report.data && exportInventoryCsv(report.data.items)}
            type="button"
          >
            Export stock
          </button>
          <button
            className="h-11 w-[154px] rounded-xl bg-[#3d5540] text-sm font-semibold text-white disabled:opacity-40"
            disabled={!items.length}
            onClick={() => setSelected(items[0] ?? null)}
            type="button"
          >
            Add adjustment
          </button>
        </div>
      </header>
      {report.isLoading && (
        <LogoDrawLoader className="mt-5" label="Loading inventory" />
      )}
      {report.isError && (
        <p className="mt-6 rounded-xl bg-red-50 p-5 text-sm text-red-700">
          {report.error.message}
        </p>
      )}
      {report.data && (
        <>
          <InventoryMetrics report={report.data} />
          <InventoryFilters
            filter={filter}
            onFilter={setFilter}
            onSearch={setSearch}
            search={search}
          />
          <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,780px)_324px]">
            <InventoryTable items={items} onAdjust={setSelected} />
            <LowStockPanel items={report.data.items} onReview={setSelected} />
          </div>
        </>
      )}
      {selected && (
        <InventoryAdjustmentPanel
          item={selected}
          key={selected.productId}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
