import type { InventoryAnalyticsReport } from "@/types/admin-inventory";

export function InventoryMetrics({
  report,
}: {
  report: InventoryAnalyticsReport;
}) {
  const units = report.items.reduce((sum, item) => sum + item.currentStock, 0);
  const low = report.items.filter(
    (item) => item.reorder.urgency !== "none",
  ).length;
  const out = report.items.filter((item) => item.availableStock === 0).length;
  const cards = [
    ["Total units", units, "Current catalog stock", false],
    ["Low stock", low, "Needs attention", true],
    ["Out of stock", out, "Revenue at risk", false],
    ["Incoming", 0, "No purchase orders recorded", false],
  ] as const;
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(([label, value, note, warning]) => (
        <article
          className={`h-[108px] rounded-2xl border border-[#e3e0d8] p-[17px] ${
            warning ? "bg-[#f7eee7]" : "bg-white"
          }`}
          key={label}
        >
          <p className="text-[11px] font-semibold text-[#616861]">{label}</p>
          <p
            className={`serif mt-2 text-[28px] leading-none ${
              warning ? "text-[#a8714f]" : "text-[#252a26]"
            }`}
          >
            {value.toLocaleString()}
          </p>
          <p
            className={`mt-2 text-[10px] font-medium ${
              warning ? "text-[#a8714f]" : "text-[#8a918a]"
            }`}
          >
            {note}
          </p>
        </article>
      ))}
    </div>
  );
}
