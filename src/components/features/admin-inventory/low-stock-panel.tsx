import type { StockAnalytics } from "@/types/admin-inventory";

export function LowStockPanel({
  items,
  onReview,
}: {
  items: StockAnalytics[];
  onReview: (item: StockAnalytics) => void;
}) {
  const urgent = items
    .filter((item) => item.reorder.urgency !== "none")
    .sort(
      (a, b) =>
        (a.reorder.estimatedStockoutDays ?? 999) -
        (b.reorder.estimatedStockoutDays ?? 999),
    )
    .slice(0, 3);
  return (
    <aside className="h-[612px] rounded-[18px] border border-[#e3e0d8] bg-[#f2efe7] p-[19px]">
      <p className="text-[10px] font-semibold uppercase text-[#a8714f]">
        Low stock queue
      </p>
      <h2 className="serif mt-2 text-[22px]">Act before items sell out</h2>
      <p className="mt-2 text-[11px] leading-4 text-[#616861]">
        Suggested quantities use the last 30 days of sales and current lead
        times.
      </p>
      <div className="mt-[22px] grid gap-3">
        {urgent.map((item) => (
          <article
            className="h-[94px] rounded-[14px] border border-[#e3e0d8] bg-white p-[13px]"
            key={item.productId}
          >
            <strong className="block truncate text-xs">
              {item.productName}
            </strong>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="font-medium text-[#3d5540]">
                Add {item.reorder.recommendedOrderQuantity} units
              </span>
              <span className="text-[10px] text-[#a8714f]">{cover(item)}</span>
            </div>
            <button
              className="float-right mt-1 h-9 w-[98px] rounded-xl border border-[#b5c9b6] text-xs font-semibold text-[#3d5540]"
              onClick={() => onReview(item)}
              type="button"
            >
              Review
            </button>
          </article>
        ))}
        {!urgent.length && (
          <p className="rounded-xl bg-white p-4 text-xs text-[#616861]">
            No urgent restocks right now.
          </p>
        )}
      </div>
      <button
        className="mt-[30px] h-11 w-full rounded-xl bg-[#3d5540] text-sm font-semibold text-white disabled:opacity-40"
        disabled={!urgent.length}
        onClick={() => urgent[0] && onReview(urgent[0])}
        type="button"
      >
        Add stock adjustment
      </button>
      <div className="mt-4 rounded-xl bg-[#eef4ee] p-3 text-[10px] leading-[15px] text-[#616861]">
        <strong className="block text-[#3d5540]">Safe adjustment</strong>
        Every manual change keeps an audit trail.
      </div>
    </aside>
  );
}

function cover(item: StockAnalytics): string {
  const days = item.reorder.estimatedStockoutDays;
  return days === null ? "Cover unavailable" : `${days}-day cover`;
}
