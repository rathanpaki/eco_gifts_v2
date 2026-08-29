import type { ReactNode } from "react";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { AccountSessionProvider } from "@/components/providers/account-session-provider";
import { requireUserSession } from "@/services/server-api";
import { FigmaAccountSidebar } from "./figma-account-sidebar";

export async function AccountShell({ children }: { children: ReactNode }) {
  const user = await requireUserSession();
  return (
    <AccountSessionProvider user={user}>
      <StorefrontHeader />
      <main className="bg-[var(--page)] px-5 py-6 sm:px-8 sm:py-[44px] lg:px-[72px]">
        <div className="mx-auto grid min-h-[60vh] max-w-[1296px] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
          <div className="min-w-0 lg:order-2">{children}</div>
          <FigmaAccountSidebar
            displayName={user.displayName}
            email={user.email}
            isAdmin={user.role === "ADMIN"}
          />
        </div>
      </main>
    </AccountSessionProvider>
  );
}
