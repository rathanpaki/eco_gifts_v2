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

export async function serverApi(path: string): Promise<Response> {
  const session = (await cookies()).get("session")?.value;
  if (!session) redirect(`/sign-in?next=${encodeURIComponent(path.startsWith("/admin") ? path : "/admin")}`);
  return fetch(`${serverApiBaseUrl}/api${path}`, {
    cache: "no-store",
    headers: { Cookie: `session=${encodeURIComponent(session)}` },
  });
}

export async function requireAdminSession(): Promise<SessionUser> {
  let response: Response;
  try {
    response = await serverApi("/auth/me");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    redirect("/sign-in?next=/admin");
  }
  if (response.status === 401) redirect("/sign-in?next=/admin");
  if (!response.ok) redirect("/");
  const result = sessionUserSchema.safeParse((await response.json()).user);
  if (!result.success || result.data.role !== "ADMIN") redirect("/");
  return result.data;
}

function isRedirectError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "digest" in error;
}
