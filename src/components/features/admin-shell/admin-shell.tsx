import type { ReactNode } from "react";
import { requireAdminSession } from "@/services/server-api";
import { AdminSidebar } from "@/components/features/admin-shell/admin-sidebar";
import styles from "@/components/features/admin-shell/admin-shell.module.css";

export async function AdminShell({ children }: { children: ReactNode }) {
  const admin = await requireAdminSession();
  return (
    <div className={styles.page}>
      <AdminSidebar operator={admin.email ?? "Administrator"} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
