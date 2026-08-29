"use client";

import { useState } from "react";
import { downloadAccountExport } from "@/services/account-export.service";
import { DataControls } from "./privacy-details";

export function AccountDataPanel() {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string>();
  async function download() {
    setDownloading(true);
    setError(undefined);
    try {
      await downloadAccountExport();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Export failed.");
    } finally {
      setDownloading(false);
    }
  }
  return (
    <section id="data" className="scroll-mt-28">
      <p className="text-[11px] font-semibold uppercase text-[var(--brand)]">Your data</p>
      <h2 className="serif mt-3 text-[32px]">Access and manage your data</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        Export a portable copy, correct inaccurate details, or request account deletion.
      </p>
      <div className="mt-5 max-w-[760px]">
        <DataControls downloading={downloading} onDownload={download} />
      </div>
      {error ? <p className="mt-3 text-sm text-red-700" role="alert">{error}</p> : null}
    </section>
  );
}
