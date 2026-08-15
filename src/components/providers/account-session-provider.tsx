"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { SessionUser } from "@/types/auth";

const AccountSessionContext = createContext<SessionUser | null>(null);

export function AccountSessionProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: SessionUser;
}) {
  return (
    <AccountSessionContext.Provider value={user}>
      {children}
    </AccountSessionContext.Provider>
  );
}

export function useAccountSession(): SessionUser {
  const user = useContext(AccountSessionContext);
  if (!user) throw new Error("The account session is unavailable.");
  return user;
}
