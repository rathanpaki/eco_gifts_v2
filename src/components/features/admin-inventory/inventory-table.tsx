import { ChevronRight } from "lucide-react";
import type { StockAnalytics } from "@/types/admin-inventory";

export function InventoryTable({
  items,
  onAdjust,
}: {
  items: StockAnalytics[];
  onAdjust: (item: StockAnalytics) => void;
}) {
  return (
    <section className="h-[612px] overflow-auto rounded-[18px] border border-[#e3e0d8] bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="sticky top-0 z-10 h-[52px] bg-[#f2efe7] text-[10px] font-semibold text-[#8a918a]">
          <tr>
            <th className="w-[38%] px-5">Product</th>
            <th className="w-[14%] px-3">SKU</th>
            <th className="w-[12%] px-3">Available</th>
            <th className="w-[14%] px-3">Reorder at</th>
            <th className="px-3">Status</th>
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              className={`h-24 border-t border-[#e3e0d8] ${
                index % 2 ? "bg-[#faf8f3]" : "bg-white"
              }`}
              key={item.productId}
            >
              <td className="px-5">
                <strong className="block text-[13px]">
                  {item.productName}
                </strong>
                <span className="mt-2 block text-[10px] text-[#8a918a]">
                  {item.category}
                </span>
              </td>
              <td className="px-3 text-xs text-[#616861]">
                {sku(item.productId)}
              </td>
              <td
                className={`px-3 text-base font-semibold ${
                  item.availableStock ? "" : "text-[#a8714f]"
                }`}
              >
                {item.availableStock}
              </td>
              <td className="px-3 text-xs text-[#616861]">
                {item.reorder.reorderThreshold}
              </td>
              <td className="px-3">
                <StockStatus item={item} />
              </td>
              <td>
                <button
                  aria-label={`Adjust stock for ${item.productName}`}
                  className="grid size-9 place-items-center text-[#3d5540]"
                  onClick={() => onAdjust(item)}
                  type="button"
                >
                  <ChevronRight size={19} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!items.length && (
        <p className="grid h-56 place-items-center text-sm text-[#727970]">
          No inventory matches these filters.
        </p>
      )}
    </section>
  );
}

function StockStatus({ item }: { item: StockAnalytics }) {
  const out = item.availableStock === 0;
  const low = !out && item.reorder.urgency !== "none";
  const label = out ? "Out" : low ? "Low" : "Healthy";
  const style = out
    ? "border border-[#b95c5c] bg-[#faf8f3] text-[#b95c5c]"
    : low
      ? "bg-[#f7eee7] text-[#c98b3c]"
      : "bg-[#eef4ee] text-[#56825a]";
  return (
    <span
      className={`inline-flex w-[118px] items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${style}`}
    >
      <i className="size-2 rounded-full bg-current" />
      {label}
    </span>
  );
}

function sku(id: string): string {
  const normalized = id.replaceAll(/[^a-z0-9]/gi, "").toUpperCase();
  return normalized.length > 10 ? normalized.slice(0, 10) : normalized;
}
