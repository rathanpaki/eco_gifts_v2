import { formatMoney } from "@/lib/format-money";
import type { AdminImpactItem } from "@/types/admin-impact";

export function AdminImpactTable({
  items,
  onVerify,
}: {
  items: AdminImpactItem[];
  onVerify: (item: AdminImpactItem) => void;
}) {
  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-[#d9d5ca] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-[#d9d5ca] bg-[#f2efe7] text-xs uppercase tracking-wide text-[#727970]">
            <tr>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Cause</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Tree ID</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                className="border-b border-[#e3e0d8] last:border-0"
                key={item.id}
              >
                <td className="px-5 py-4">
                  <p className="font-semibold">
                    {item.customerName ?? "Customer"}
                  </p>
                  <p className="mt-1 text-xs text-[#727970]">
                    {item.customerEmail ?? item.orderId}
                  </p>
                </td>
                <td className="px-5 py-4">{item.cause}</td>
                <td className="px-5 py-4 font-semibold">
                  {formatMoney(item.amountCents, "USD")}
                </td>
                <td className="px-5 py-4 font-mono text-xs">
                  {item.treeId ?? "—"}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === "verified" ? "bg-[#eef4ee] text-[#3d5540]" : "bg-amber-50 text-amber-800"}`}
                  >
                    {item.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    className="min-h-10 rounded-xl border border-[#3d5540] px-4 text-xs font-semibold text-[#3d5540] disabled:opacity-40"
                    disabled={item.status === "verified"}
                    onClick={() => onVerify(item)}
                    type="button"
                  >
                    {item.status === "verified" ? "Verified" : "Review"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!items.length ? (
        <p className="p-8 text-center text-sm text-[#727970]">
          No impact records match these filters.
        </p>
      ) : null}
    </section>
  );
}
