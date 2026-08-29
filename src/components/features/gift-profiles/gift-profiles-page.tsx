"use client";

import { CalendarDays, Gift, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCreateGiftProfile, useDeleteGiftProfile, useGiftProfiles, useUpdateGiftProfile } from "@/hooks/use-account-saved";
import type { GiftProfile, GiftProfileValues } from "@/types/account-saved";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { GiftProfileEditor } from "./gift-profile-editor";

export function GiftProfilesPage() {
  const profiles = useGiftProfiles();
  const create = useCreateGiftProfile();
  const update = useUpdateGiftProfile();
  const remove = useDeleteGiftProfile();
  const [editor, setEditor] = useState<GiftProfile | "new" | null>(null);
  function save(values: GiftProfileValues) {
    if (editor === "new") create.mutate(values, { onSuccess: () => setEditor(null) });
    else if (editor) update.mutate({ id: editor.id, values }, { onSuccess: () => setEditor(null) });
  }
  if (profiles.isPending) return <LogoDrawLoader label="Loading gift profiles" />;
  if (profiles.error) return <p className="rounded-2xl bg-red-50 p-6 text-sm text-red-700">{profiles.error.message}</p>;
  return (
    <section aria-labelledby="gift-profiles-title">
      <p className="text-[11px] font-semibold uppercase text-[var(--brand)]">Recipients</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div><h1 id="gift-profiles-title" className="serif text-[34px] leading-none sm:text-[40px]">Gift profiles</h1><p className="mt-3 text-sm text-[var(--muted)]">Remember who you are shopping for and their important occasions.</p></div>
        <button type="button" onClick={() => setEditor("new")} className="min-h-12 w-full rounded-[10px] bg-[var(--brand)] px-5 text-xs font-semibold text-white sm:h-11 sm:w-auto sm:min-h-0">Add gift profile</button>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {profiles.data?.map((profile) => <article key={profile.id} className="rounded-2xl border border-[var(--line)] bg-[var(--page)] p-5">
          <div className="flex items-start gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#eef4ee] text-[var(--brand)]"><Gift size={18} /></span><div className="min-w-0 flex-1"><h2 className="serif text-xl">{profile.recipientName}</h2><p className="mt-1 text-xs text-[var(--muted)]">{profile.relationship} · {profile.occasion}</p></div></div>
          {profile.importantDate ? <p className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]"><CalendarDays size={14} />{profile.importantDate}</p> : null}
          {profile.notes ? <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{profile.notes}</p> : null}
          <div className="mt-5 flex gap-4"><button type="button" onClick={() => setEditor(profile)} className="flex items-center gap-1 text-xs font-semibold text-[var(--brand)]"><Pencil size={13} /> Edit</button><button type="button" onClick={() => window.confirm(`Remove ${profile.recipientName}'s profile?`) && remove.mutate(profile.id)} className="flex items-center gap-1 text-xs font-semibold text-red-700"><Trash2 size={13} /> Remove</button></div>
        </article>)}
        {!profiles.data?.length ? <div className="rounded-2xl border border-dashed border-[var(--line)] p-7 text-sm text-[var(--muted)]">No gift profiles yet. Add one to keep future gifting details together.</div> : null}
      </div>
      {remove.error ? <p className="mt-3 text-xs text-red-700">{remove.error.message}</p> : null}
      {editor ? <GiftProfileEditor profile={editor === "new" ? undefined : editor} pending={create.isPending || update.isPending} error={create.error?.message ?? update.error?.message} onCancel={() => setEditor(null)} onSave={save} /> : null}
    </section>
  );
}
