"use client";

import Image from "next/image";
import { BadgeCheck, Check, MessageSquareText, PenLine } from "lucide-react";
import { useState } from "react";
import {
  useCreateProductReview,
  useReviewedProductIds,
} from "@/hooks/use-product-reviews";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { OrderItem } from "@/types/checkout";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { OrderReviewForm } from "./order-review-form";

export function OrderReviewSection(props: {
  orderId: string;
  items: OrderItem[];
}) {
  const reviewed = useReviewedProductIds(props.orderId, true);
  const create = useCreateProductReview(props.orderId);
  const [active, setActive] = useState<string | null>(null);
  const items = uniqueProducts(props.items);

  return (
    <section
      id="order-reviews"
      className="mt-6 scroll-mt-24 overflow-hidden rounded-[24px] border border-[var(--line)] bg-white shadow-[0_18px_55px_rgba(37,42,38,.07)]"
    >
      <header className="grid gap-5 bg-[#202722] px-5 py-7 text-white sm:grid-cols-[1fr_auto] sm:items-end sm:px-8 sm:py-8">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#c7ed61]">
            <MessageSquareText size={15} />
            Reviews & feedback
          </p>
          <h2 className="serif mt-3 text-[30px] leading-tight sm:text-[36px]">
            How did your gifts feel?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
            Thoughtful details help future customers choose with confidence.
          </p>
        </div>
        <span className="flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold">
          <BadgeCheck size={16} className="text-[#c7ed61]" />
          Verified purchase
        </span>
      </header>
      <div className="p-4 sm:p-6">
        {reviewed.isPending ? (
          <ReviewSkeleton />
        ) : reviewed.error ? (
          <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {reviewed.error.message}
          </p>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => {
              const done = reviewed.data?.includes(item.productId);
              const open = active === item.productId;
              return (
                <article
                  key={item.productId}
                  className="rounded-[18px] border border-[var(--line)] bg-[var(--page)] p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <ProductImage item={item} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--brand-soft)]">
                        Purchased gift
                      </p>
                      <h3 className="mt-1 truncate text-base font-semibold">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                        {done
                          ? "Your feedback is published and helping other shoppers."
                          : "Rate the quality, presentation, and overall experience."}
                      </p>
                    </div>
                    {done ? (
                      <span className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#eef4ee] px-4 text-xs font-semibold text-[var(--brand)]">
                        <Check size={16} /> Reviewed
                      </span>
                    ) : (
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setActive(open ? null : item.productId)}
                        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--brand)] px-5 text-xs font-semibold text-[var(--brand)] sm:w-auto"
                      >
                        <PenLine size={15} />
                        {open ? "Close review" : "Write a review"}
                      </button>
                    )}
                  </div>
                  {open && !done ? (
                    <OrderReviewForm
                      pending={create.isPending}
                      error={create.error?.message}
                      onSubmit={(values) =>
                        create.mutate(
                          {
                            ...values,
                            orderId: props.orderId,
                            productId: item.productId,
                          },
                          { onSuccess: () => setActive(null) },
                        )
                      }
                    />
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductImage({ item }: { item: OrderItem }) {
  return (
    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-[14px] bg-[var(--subtle)] sm:size-[92px]">
      {item.image ? (
        <Image
          alt={item.image.alt}
          fill
          sizes="(min-width:640px) 92px, 100vw"
          src={item.image.url}
          unoptimized={shouldBypassImageOptimization(item.image.url)}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}

function ReviewSkeleton() {
  return <LogoDrawLoader label="Checking your reviews" size="inline" />;
}

function uniqueProducts(items: OrderItem[]) {
  return items.filter(
    (item, index) =>
      items.findIndex((candidate) => candidate.productId === item.productId) ===
      index,
  );
}
