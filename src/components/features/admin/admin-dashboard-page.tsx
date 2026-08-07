import { loadAdminDashboard } from "@/services/admin-dashboard.service";
import { AdminDashboardView, AdminState } from "@/components/features/admin/admin-dashboard-view";

export async function AdminDashboardPage() {
  const result = await loadAdminDashboard();
  return result.kind === "ready"
    ? <AdminDashboardView dashboard={result.dashboard} />
    : <AdminState kind={result.kind} />;
}
