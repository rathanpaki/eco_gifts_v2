import { ExternalLink, MapPin, Trees } from "lucide-react";
import type { TreeIDRecord } from "@/types/contribution.types";

export function TreeEvidenceList({ trees }: { trees: TreeIDRecord[] }) {
  return (
    <section className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex items-start gap-3 sm:items-center">
        <span className="grid size-10 place-items-center rounded-xl bg-[#eef4ee] text-[var(--brand)]">
          <Trees size={20} />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold sm:text-xl">Tree IDs & evidence</h2>
          <p className="text-sm text-[var(--muted)]">
            Partner details appear after administrator verification.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {trees.map((tree) => (
          <article
            className="rounded-xl border border-[var(--line)] p-4"
            key={tree.treeId}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="break-all font-mono text-sm font-semibold">{tree.treeId}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-[var(--muted)]">
                  <MapPin size={13} />
                  {tree.partnerName && tree.partnerLocation
                    ? `${tree.partnerName} · ${tree.partnerLocation}`
                    : "Verification pending"}
                </p>
              </div>
              <span className="rounded-full bg-[var(--subtle)] px-2.5 py-1 text-xs font-semibold">
                {tree.status.replaceAll("_", " ")}
              </span>
            </div>
            {tree.co2SequestrationKg !== null ? (
              <p className="mt-3 text-sm text-[var(--brand)]">
                {tree.co2SequestrationKg} kg verified CO₂ sequestration
              </p>
            ) : null}
            {tree.certificateUrl ? (
              <a
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]"
                href={tree.certificateUrl}
                rel="noreferrer"
                target="_blank"
              >
                View certificate <ExternalLink size={14} />
              </a>
            ) : null}
          </article>
        ))}
      </div>
      {!trees.length ? (
        <p className="mt-5 text-sm text-[var(--muted)]">No Tree IDs yet.</p>
      ) : null}
    </section>
  );
}
