"use client";

import { apiResponseMessage, clientApiBaseUrl } from "@/services/client-api";

export async function downloadAccountExport(): Promise<void> {
  const response = await fetch(`${clientApiBaseUrl}/api/account/export`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await apiResponseMessage(response));

  const payload: unknown = await response.json();
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `ecogifts-data-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
