"use client";

import { useState } from "react";
import {
  useAccountProfile,
  useCreateAccountAddress,
  useDeleteAccountAddress,
  useUpdateAccountAddress,
} from "@/hooks/use-account-profile";
import type { AccountAddress, AddressValues } from "@/types/account-profile";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { AddressCard } from "./address-card";
import { AddressEditor } from "./address-editor";

export function ProfileAddressesPage() {
  const profile = useAccountProfile();
  const create = useCreateAccountAddress();
  const update = useUpdateAccountAddress();
  const remove = useDeleteAccountAddress();
  const [editor, setEditor] = useState<AccountAddress | "new" | null>(null);

  if (profile.isPending) return <LogoDrawLoader label="Loading saved addresses" />;
  if (profile.error || !profile.data) return <p className="rounded-2xl bg-red-50 p-6 text-sm text-red-700">{profile.error?.message ?? "Addresses unavailable."}</p>;

  function save(values: AddressValues) {
    if (editor === "new") create.mutate(values, { onSuccess: () => setEditor(null) });
    else if (editor) update.mutate({ id: editor.id, values }, { onSuccess: () => setEditor(null) });
  }
  const error = create.error?.message ?? update.error?.message;

  return (
    <section aria-labelledby="addresses-title">
      <p className="text-[11px] font-semibold uppercase text-[var(--brand)]">Delivery details</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="addresses-title" className="serif text-[34px] leading-none sm:text-[40px]">Saved addresses</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">Choose these again during checkout.</p>
        </div>
        <button type="button" onClick={() => setEditor("new")} className="min-h-12 w-full rounded-[10px] border border-[var(--line)] px-5 text-xs font-semibold text-[var(--brand)] sm:h-11 sm:w-auto sm:min-h-0">Add new address</button>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {profile.data.addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={() => setEditor(address)}
            onRemove={() => {
              if (window.confirm("Remove " + address.label + " address?")) remove.mutate(address.id);
            }}
          />
        ))}
        {!profile.data.addresses.length ? <div className="rounded-2xl border border-dashed border-[var(--line)] p-6 text-sm text-[var(--muted)]">No saved addresses yet. An address entered at checkout will also appear here.</div> : null}
      </div>
      {remove.error ? <p className="mt-3 text-xs text-red-700">{remove.error.message}</p> : null}
      {editor ? <AddressEditor address={editor === "new" ? undefined : editor} pending={create.isPending || update.isPending} error={error} onCancel={() => setEditor(null)} onSave={save} /> : null}
    </section>
  );
}
