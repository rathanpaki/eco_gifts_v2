import type { AdminImpactPage } from "@/types/admin-impact";

export function exportImpactReport(data: AdminImpactPage): void {
  const rows = [
    ["Order", "Customer", "Cause", "Amount", "Status", "Tree ID", "Created"],
    ...data.items.map((item) => [
      item.orderId,
      item.customerEmail ?? item.customerName ?? item.userId,
      item.cause,
      (item.amountCents / 100).toFixed(2),
      item.status,
      item.treeId ?? "",
      item.createdAt,
    ]),
  ];
  const content = rows.map(csvRow).join("\r\n");
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "eco-gifts-impact-report.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function csvRow(values: string[]): string {
  return values.map((value) => `"${value.replaceAll('"', '""')}"`).join(",");
}
