"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDialog } from "@/components/providers/feedback-provider";
import { useDeleteAdminPromotion } from "@/hooks/use-admin-promotions";
import type { AdminPromotion } from "@/types/admin-promotions";

export function PromotionTable({ items }: { items: AdminPromotion[] }) {
  const remove = useDeleteAdminPromotion();
  const dialog = useAppDialog();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const deletePromotion = async (promotion: AdminPromotion) => {
    const approved = await dialog.confirm({
      title: "Delete this promotion?",
      description: `${promotion.name} will stop appearing to customers and cannot be restored.`,
      confirmLabel: "Delete promotion",
      tone: "danger",
    });
    if (!approved) return;
    setDeletingId(promotion.id);
    remove.mutate(promotion.id, {
      onSuccess: () => toast.success("Promotion deleted", { description: `${promotion.name} is no longer available to customers.` }),
      onError: (error) => toast.error("We couldn’t delete the promotion", { description: error.message }),
      onSettled: () => setDeletingId(null),
    });
  };
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--page)] p-3 sm:p-5">
      {remove.error && (
        <p className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-800" role="alert">
          {remove.error.message}
        </p>
      )}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead className="bg-[#eef4ee] text-xs font-semibold text-[var(--brand)]">
            <tr>
              {["Campaign", "Code", "Discount", "Status", "Window", "Redemptions", "Actions"].map(
                (label) => <th key={label} className="px-3 py-[14px]">{label}</th>,
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((promotion) => (
              <tr key={promotion.id} className="border-t border-[var(--line)]">
                <td className="px-3 py-[14px] text-[13px] font-semibold">{promotion.name}</td>
                <td className="px-3 py-[14px] text-[13px] text-[var(--muted)]">{promotion.code}</td>
                <td className="px-3 py-[14px] text-[13px] text-[var(--muted)]">{discount(promotion)}</td>
                <td className="px-3 py-[14px]"><StatusBadge status={promotion.status} /></td>
                <td className="px-3 py-[14px] text-[13px] text-[var(--muted)]">
                  {windowLabel(promotion.startsAt, promotion.endsAt)}
                </td>
                <td className="px-3 py-[14px] text-[13px] text-[var(--muted)]">
                  {promotion.redemptions.toLocaleString()}
                </td>
                <td className="px-3 py-[14px]">
                  <PromotionActions
                    deleting={deletingId === promotion.id}
                    onDelete={() => void deletePromotion(promotion)}
                    promotion={promotion}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:hidden">
        {items.map((promotion) => (
          <article key={promotion.id} className="rounded-xl border border-[var(--line)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">{promotion.name}</h2>
                <p className="mt-1 text-xs text-[var(--muted)]">{promotion.code} · {discount(promotion)}</p>
              </div>
              <StatusBadge status={promotion.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div><dt className="text-[#8a918a]">Window</dt><dd className="mt-1">{windowLabel(promotion.startsAt, promotion.endsAt)}</dd></div>
              <div><dt className="text-[#8a918a]">Redemptions</dt><dd className="mt-1">{promotion.redemptions.toLocaleString()}</dd></div>
            </dl>
            <div className="mt-4">
              <PromotionActions
                deleting={deletingId === promotion.id}
                onDelete={() => void deletePromotion(promotion)}
                promotion={promotion}
              />
            </div>
          </article>
        ))}
      </div>
      {!items.length && <EmptyPromotions />}
    </div>
  );
}

function PromotionActions(props: {
  deleting: boolean;
  onDelete: () => void;
  promotion: AdminPromotion;
}) {
  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/promotions/${encodeURIComponent(props.promotion.id)}/edit`}
        className="inline-flex h-9 flex-1 items-center justify-center rounded-lg border border-[#b5c9b6] px-3 text-xs font-semibold text-[var(--brand)]"
      >
        Edit
      </Link>
      <button
        type="button"
        disabled={props.deleting}
        onClick={props.onDelete}
        className="h-9 flex-1 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 disabled:opacity-50"
      >
        {props.deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}

function EmptyPromotions() {
  return (
    <div className="grid min-h-40 place-items-center text-center">
      <div>
        <p className="text-sm text-[var(--muted)]">No promotions match this view.</p>
        <Link href="/admin/promotions/new" className="mt-3 inline-block text-sm font-semibold text-[var(--brand)]">
          Create the first promotion →
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AdminPromotion["status"] }) {
  const colors = {
    active: "bg-[#eef4ee] text-[#56825a]",
    scheduled: "bg-[#f7eee7] text-[#c98b3c]",
    ended: "bg-[#f2efe7] text-[#616861]",
    draft: "bg-[#f2efe7] text-[#616861]",
  };
  return (
    <span className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${colors[status]}`}>
      <span className="size-2 rounded-full bg-current" aria-hidden="true" />
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
}

function discount(promotion: AdminPromotion) {
  if (promotion.discountType === "percentage") return `${promotion.discountValue}%`;
  if (promotion.discountType === "free_delivery") return "Free delivery";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    .format(promotion.discountValue / 100);
}

function windowLabel(start: string, end: string) {
  const format = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short" });
  return `${format.format(new Date(start))}–${format.format(new Date(end))}`;
}
