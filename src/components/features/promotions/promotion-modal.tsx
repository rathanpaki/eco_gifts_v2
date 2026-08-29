"use client";

import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActivePromotions } from "@/hooks/use-promotions";
import { promotionCopy } from "./promotion-copy";

export function PromotionModal() {
  const promotions = useActivePromotions();
  const promotion = promotions.data?.[0];
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!promotion) return;
    const key = `ecogifts:promotion:${promotion.id}:shown`;
    if (sessionStorage.getItem(key)) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(key, "true");
      setOpen(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [promotion]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (!open || !promotion) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#252a26]/55 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="promotion-modal-title"
        aria-describedby="promotion-modal-copy"
        className="relative w-full max-w-[520px] overflow-hidden rounded-[22px] border border-[#dbcbbb] bg-[var(--page)] p-6 shadow-2xl sm:p-8"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close offer"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-[var(--line)] bg-white"
        >
          <X aria-hidden="true" size={18} />
        </button>
        <div className="grid size-11 place-items-center rounded-full bg-[#eef4ee] text-[var(--brand)]">
          <Sparkles aria-hidden="true" size={20} />
        </div>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--brand)]">
          Limited offer
        </p>
        <h2 id="promotion-modal-title" className="serif mt-2 pr-10 text-[32px] leading-[1.05] sm:text-[38px]">
          {promotion.name}
        </h2>
        <p id="promotion-modal-copy" className="mt-4 text-sm leading-6 text-[var(--muted)]">
          {promotionCopy(promotion)}
        </p>
        <div className="mt-5 rounded-[14px] bg-[#f7eee7] p-4">
          <p className="text-xs text-[var(--muted)]">Use at checkout</p>
          <p className="mt-1 text-lg font-bold tracking-[0.12em] text-[var(--brand)]">
            {promotion.code}
          </p>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="h-11 rounded-xl border border-[var(--line)] px-5 text-sm font-semibold"
          >
            Maybe later
          </button>
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="flex h-11 items-center justify-center rounded-xl bg-[var(--brand)] px-5 text-sm font-semibold text-white"
          >
            Shop the offer
          </Link>
        </div>
      </section>
    </div>
  );
}
