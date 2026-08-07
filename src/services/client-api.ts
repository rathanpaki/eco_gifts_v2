"use client";

import { z } from "zod";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, "");
const csrfSchema = z.object({ csrfToken: z.string().min(32) });

export async function apiMutation(path: string, init: RequestInit = {}): Promise<Response> {
  const csrfResponse = await fetch(`${apiBaseUrl}/api/auth/csrf`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!csrfResponse.ok) throw new Error("A secure request could not be initialized.");
  const { csrfToken } = csrfSchema.parse(await csrfResponse.json());
  const headers = new Headers(init.headers);
  headers.set("X-CSRF-Token", csrfToken);
  const response = await fetch(`${apiBaseUrl}/api${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
  if (!response.ok) throw new Error(await responseMessage(response));
  return response;
}

async function responseMessage(response: Response): Promise<string> {
  try {
    const body = z.object({ message: z.union([z.string(), z.array(z.string())]) }).parse(await response.json());
    return Array.isArray(body.message) ? body.message.join(" ") : body.message;
  } catch {
    return "The request could not be completed.";
  }
}
