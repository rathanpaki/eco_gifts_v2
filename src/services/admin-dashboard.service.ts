import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { AdminDashboard } from "@/types/admin-dashboard";

const amount = z.number().int().nonnegative();
const dashboardSchema = z.object({
  generatedAt: z.string().datetime(),
  periodDays: z.number().int().positive(),
  operator: z.object({ email: z.string().email().nullable(), displayName: z.string().nullable() }),
  kpis: z.object({
    revenueCents: amount, revenueChangePercent: z.number().finite().nullable(),
    orderCount: amount, orderChangePercent: z.number().finite().nullable(),
    averageOrderCents: amount, averageChangePercent: z.number().finite().nullable(), openIssues: amount,
  }),
  attention: z.object({ paymentFailures: amount, lowStockProducts: amount, readyToShip: amount }),
  revenueTrend: z.array(z.object({ date: z.string().date(), label: z.string().min(1), revenueCents: amount })),
  recentOrders: z.array(z.object({
    id: z.string().min(1), orderNumber: z.string().min(1), customerName: z.string().min(1).nullable(),
    totalCents: amount, currency: z.string().length(3).nullable(), status: z.string().min(1).nullable(),
  })),
});

export type DashboardLoad =
  | { kind: "ready"; dashboard: AdminDashboard }
  | { kind: "forbidden" }
  | { kind: "unavailable" };

const apiBaseUrl = (process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, "");

export async function loadAdminDashboard(): Promise<DashboardLoad> {
  const session = (await cookies()).get("session")?.value;
  if (!session) redirect("/sign-in?next=/admin");
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/api/admin/dashboard`, {
      cache: "no-store",
      headers: { Cookie: `session=${encodeURIComponent(session)}` },
    });
  } catch {
    return { kind: "unavailable" };
  }
  if (response.status === 401) redirect("/sign-in?next=/admin");
  if (response.status === 403) return { kind: "forbidden" };
  if (!response.ok) return { kind: "unavailable" };
  try {
    const result = dashboardSchema.safeParse(await response.json());
    return result.success ? { kind: "ready", dashboard: result.data } : { kind: "unavailable" };
  } catch {
    return { kind: "unavailable" };
  }
}
