"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useCreateAdminPromotion,
  useUpdateAdminPromotion,
} from "@/hooks/use-admin-promotions";
import type { AdminPromotion, PromotionWrite } from "@/types/admin-promotions";
import { PromotionEditorFields } from "./promotion-editor-fields";
import type { PromotionDraft } from "./promotion-editor.types";
import { PromotionPreview } from "./promotion-preview";

const initial: PromotionDraft = {
  name: "Spring celebration edit",
  code: "SPRING20",
  discountType: "percentage",
  discountValue: "20",
  minimumBasket: "50",
  appliesTo: "collections",
  eligibleIds: "Weddings, Birthdays",
  startsAt: "2026-09-01T09:00",
  endsAt: "2026-09-08T23:59",
};

export function PromotionEditorPage({
  promotion,
}: {
  promotion?: AdminPromotion;
}) {
  const [values, setValues] = useState(() =>
    promotion ? draftFromPromotion(promotion) : initial,
  );
  const create = useCreateAdminPromotion();
  const update = useUpdateAdminPromotion(promotion?.id);
  const router = useRouter();
  const set = <K extends keyof PromotionDraft>(
    key: K,
    value: PromotionDraft[K],
  ) => setValues((current) => ({ ...current, [key]: value }));

  function save(status: PromotionWrite["status"]) {
    const mutation = promotion ? update : create;
    mutation.mutate(toPayload(values, status), {
      onSuccess: () => router.push("/admin/promotions"),
    });
  }

  const pending = create.isPending || update.isPending;
  const error = create.error ?? update.error;

  return (
    <section className="min-h-screen bg-[#f2efe7] px-4 py-7 sm:px-6 sm:py-10 lg:px-12">
      <header className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="text-[10px] font-semibold text-[var(--brand)]">
            GROWTH · PROMOTIONS
          </p>
          <h1 className="serif mt-1 text-[32px] leading-[46px]">
            {promotion ? "Edit promotion" : "Create promotion"}
          </h1>
          <p className="text-[13px] text-[var(--muted)]">
            {promotion
              ? "Update this offer while keeping its redemption history intact."
              : "Build a targeted offer with clear eligibility, timing, and margin guardrails."}
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto">
          <button
            type="button"
            disabled={pending}
            onClick={() => save("draft")}
            className="h-11 w-[136px] rounded-xl border border-[#b5c9b6] bg-white text-[13px] font-semibold text-[var(--brand)] disabled:opacity-50"
          >
            {promotion ? "Update draft" : "Save draft"}
          </button>
          <button
            type="button"
            disabled={
              pending ||
              (values.discountType === "percentage" &&
                Number(values.discountValue) > 15)
            }
            onClick={() => save("scheduled")}
            className="h-11 w-40 rounded-xl bg-[var(--brand)] text-sm font-semibold text-white disabled:opacity-50"
          >
            {promotion ? "Update schedule" : "Schedule promotion"}
          </button>
        </div>
      </header>

      <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,700px)_380px]">
        <PromotionEditorFields values={values} set={set} />
        <PromotionPreview values={values} />
      </div>
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800">
          {error.message}
        </p>
      )}
    </section>
  );
}

function draftFromPromotion(promotion: AdminPromotion): PromotionDraft {
  return {
    name: promotion.name,
    code: promotion.code,
    discountType: promotion.discountType,
    discountValue: String(
      promotion.discountType === "fixed"
        ? promotion.discountValue / 100
        : promotion.discountValue,
    ),
    minimumBasket: String(promotion.minimumBasketCents / 100),
    appliesTo: promotion.appliesTo,
    eligibleIds: promotion.eligibleIds.join(", "),
    startsAt: localDateTime(promotion.startsAt),
    endsAt: localDateTime(promotion.endsAt),
  };
}

function localDateTime(value: string): string {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function toPayload(
  values: PromotionDraft,
  status: PromotionWrite["status"],
): PromotionWrite {
  const rawDiscount = Number(values.discountValue || 0);
  return {
    name: values.name,
    code: values.code,
    discountType: values.discountType,
    discountValue:
      values.discountType === "fixed"
        ? Math.round(rawDiscount * 100)
        : values.discountType === "free_delivery"
          ? 0
          : Math.round(rawDiscount),
    minimumBasketCents: Math.round(Number(values.minimumBasket || 0) * 100),
    appliesTo: values.appliesTo,
    eligibleIds:
      values.appliesTo === "all"
        ? []
        : values.eligibleIds.split(",").map((item) => item.trim()),
    startsAt: new Date(values.startsAt).toISOString(),
    endsAt: new Date(values.endsAt).toISOString(),
    status,
  };
}
