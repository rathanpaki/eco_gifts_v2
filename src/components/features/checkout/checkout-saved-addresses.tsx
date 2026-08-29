"use client";

import type { AccountAddress } from "@/types/account-profile";

export function CheckoutSavedAddresses(props: {
  addresses: AccountAddress[];
  selectedId?: string;
  onSelect: (address: AccountAddress) => void;
}) {
  if (!props.addresses.length) return null;
  return (
    <section aria-labelledby="saved-addresses-title">
      <h3 id="saved-addresses-title" className="mb-3 text-[13px] font-semibold text-[var(--muted)]">Saved addresses</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {props.addresses.map((address) => (
          <button key={address.id} type="button" onClick={() => props.onSelect(address)} className={`rounded-[14px] border p-4 text-left ${props.selectedId === address.id ? "border-[var(--brand)] bg-[#eef4ee]" : "border-[var(--line)] bg-[var(--page)]"}`}>
            <span className="flex items-center justify-between gap-2 text-sm font-semibold"><span>{address.label}</span>{address.primary ? <span className="text-[10px] uppercase text-[var(--brand)]">Primary</span> : null}</span>
            <span className="mt-2 block text-xs leading-5 text-[var(--muted)]">{address.fullName}<br />{address.line1}, {address.city}<br />{address.phone}</span>
          </button>
        ))}
      </div>
    </section>
  );
}