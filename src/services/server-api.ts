import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionUserSchema } from "@/lib/schemas/auth.schema";
import type { SessionUser } from "@/types/auth";

export const serverApiBaseUrl = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000"
).replace(/\/$/, "");
const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? "session";

export async function serverApi(
  path: string,
  nextPath = "/admin",
): Promise<Response> {
  const session = (await cookies()).get(sessionCookieName)?.value;
  if (!session) redirect(signInPath(nextPath));
  return fetch(`${serverApiBaseUrl}/api${path}`, {
    cache: "no-store",
    headers: {
      Cookie: `${sessionCookieName}=${encodeURIComponent(session)}`,
    },
  });
}

export async function requireAdminSession(): Promise<SessionUser> {
  const user = await requireUserSession("/admin");
  if (user.role !== "ADMIN") redirect("/");
  return user;
}

export async function requireUserSession(
  nextPath = "/account/orders",
): Promise<SessionUser> {
  let response: Response;
  try {
    response = await serverApi("/auth/me", nextPath);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    redirect(signInPath(nextPath));
  }
  if (response.status === 401) redirect(signInPath(nextPath));
  if (!response.ok) redirect("/sign-in");
  const result = sessionUserSchema.safeParse((await response.json()).user);
  if (!result.success) redirect("/sign-in");
  return result.data;
}

function isRedirectError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "digest" in error;
}

function signInPath(nextPath: string): string {
  return `/sign-in?next=${encodeURIComponent(nextPath)}`;
}
