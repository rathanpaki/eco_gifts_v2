"use client";

import { sessionUserSchema } from "@/lib/schemas/auth.schema";
import type { SessionUser } from "@/types/auth";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000"
).replace(/\/$/, "");

export async function getCurrentSession(): Promise<SessionUser | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
      cache: "no-store",
      credentials: "include",
    });
    if (!response.ok) return null;
    const result = sessionUserSchema.safeParse((await response.json()).user);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
