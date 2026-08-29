import { Circle } from "lucide-react";
import type { AccountAddress } from "@/types/account-profile";

export function AddressCard(props: {
  address: AccountAddress;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { address } = props;
  return (
    <article
      className={`min-h-[168px] rounded-2xl border p-[18px] ${
        address.primary
          ? "border-[1.5px] border-[var(--brand)] bg-[#eef4ee]"
          : "border-[var(--line)] bg-[var(--page)]"
      }`}
    >
      <div className="flex h-[26px] items-center">
        <h3 className="min-w-0 flex-1 text-sm font-semibold">
          {address.label}
        </h3>
        {address.primary && (
          <span className="flex items-center gap-2 rounded-full bg-[var(--subtle)] px-3 py-2 text-xs font-semibold text-[#616861]">
            <Circle aria-hidden="true" fill="currentColor" size={8} /> Primary
          </span>
        )}
      </div>
      <address className="mt-2.5 text-xs not-italic leading-[1.45] text-[#616861]">
        {address.fullName}
        <br />
        {address.line1}
        <br />
        {address.line2 && (
          <>
            {address.line2}
            <br />
          </>
        )}
        {address.city} · {address.postalCode}
        <br />
        {address.country}
      </address>
      <div className="mt-2 flex gap-[18px] text-[11px] font-semibold">
        <button
          type="button"
          onClick={props.onEdit}
          className="text-[var(--brand)]"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={props.onRemove}
          className="text-[#b95c5c]"
        >
          Remove address
        </button>
      </div>
    </article>
  );
}
