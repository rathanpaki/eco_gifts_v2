"use client";

import { useState } from "react";
import { downloadAccountExport } from "@/services/account-export.service";
import { PrivacyDetails } from "./privacy-details";
import { PrivacyNavigation } from "./privacy-navigation";

const principles = [
  ["Purpose-led", "Every field has a clear service purpose."],
  [
    "Limited retention",
    "We remove or anonymise data when it is no longer needed.",
  ],
  ["Your control", "Access, correct, export, or delete your information."],
];

export function PrivacyPage() {
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
    <main className="min-h-[calc(100vh-72px)] bg-[#f2efe7] px-5 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1312px] gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <PrivacyNavigation />
        <div id="overview" className="min-w-0">
          <header>
            <h1 className="serif text-[clamp(38px,4vw,40px)] leading-[1.08]">
              Your data, explained plainly
            </h1>
            <p className="mt-2 text-base leading-6 text-[var(--muted)]">
              We collect only what we need to create, deliver, and support your
              gifts. We do not sell personal data.
            </p>
          </header>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {principles.map(([title, body]) => (
              <section
                key={title}
                className="min-h-[140px] rounded-2xl bg-[#eef4ee] p-6"
              >
                <h2 className="text-[17px] font-semibold text-[var(--brand)]">
                  {title}
                </h2>
                <p className="mt-3 text-[13px] leading-5 text-[var(--muted)]">
                  {body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-5">
            <PrivacyDetails downloading={downloading} onDownload={download} />
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <section
            id="contact"
            className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[14px] bg-[#252a26] px-5 py-4 text-white"
          >
            <div>
              <h2 className="font-semibold">Questions about privacy?</h2>
              <p className="mt-0.5 text-[13px]">
                Email privacy@ecogifts.example or contact our Data Protection
                Lead.
              </p>
            </div>
            <p className="text-[13px] font-semibold">
              Response target: 30 days
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
