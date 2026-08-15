import type { ReactNode } from "react";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { AccountSessionProvider } from "@/components/providers/account-session-provider";
import { requireUserSession } from "@/services/server-api";
import { AccountSidebar } from "./account-sidebar";

export async function AccountShell({ children }: { children: ReactNode }) {
  const user = await requireUserSession();
  return (
    <AccountSessionProvider user={user}>
      <StorefrontHeader />
      <main className="bg-[var(--page)] px-5 py-10 sm:px-8 lg:px-[72px]">
        <div className="mx-auto grid min-h-[60vh] max-w-[1296px] gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <AccountSidebar email={user.email} isAdmin={user.role === "ADMIN"} />
          <div className="min-w-0">{children}</div>
        </div>
      </main>
    </AccountSessionProvider>
  );
}
