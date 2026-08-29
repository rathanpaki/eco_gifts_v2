import { TriangleAlert } from "lucide-react";
import type { PromotionDraft } from "./promotion-editor.types";

export function PromotionPreview({ values }: { values: PromotionDraft }) {
  const percent =
    values.discountType === "percentage"
      ? Number(values.discountValue || 0)
      : 0;
  const minimum = Number(values.minimumBasket || 0).toFixed(0);
  const scope =
    values.appliesTo === "all"
      ? "all gifts"
      : values.eligibleIds || "selected gifts";

  return (
    <aside className="grid content-start gap-5">
      <section className="rounded-[20px] bg-[#252a26] p-6 text-white">
        <p className="text-[10px] font-semibold">CHECKOUT PREVIEW</p>
        <h2 className="serif mt-3 text-[25px]">{offerTitle(values)}</h2>
        <p className="mt-3 text-xs leading-[17px]">
          Use code {values.code || "YOURCODE"} on {scope}
          {Number(minimum) ? ` when your basket reaches $${minimum}.` : "."}
        </p>
        <div className="mt-7 flex h-[52px] items-center justify-between rounded-xl bg-white px-4 text-sm font-semibold text-[var(--brand)]">
          <span>{values.code || "YOURCODE"}</span>
          <span className="text-[#a8714f]">{discountLabel(values)}</span>
        </div>
        <p className="mt-5 text-[11px] font-medium">
          Scheduled · {dateRange(values)}
        </p>
      </section>

      {percent > 15 && (
        <section className="rounded-[20px] border border-[var(--line)] bg-[#f7eee7] p-5">
          <div className="flex items-center gap-3">
            <TriangleAlert
              aria-hidden="true"
              className="text-[#a8714f]"
              size={22}
            />
            <h2 className="text-[17px] font-semibold">Approval required</h2>
          </div>
          <p className="mt-3 text-xs leading-[17px] text-[var(--muted)]">
            This discount may reduce the average gift margin below the 38%
            guardrail. Save it as a draft for finance review.
          </p>
          <div className="mt-5 flex items-end justify-between">
            <span className="text-[11px] text-[#8a918a]">Projected margin</span>
            <strong className="serif text-2xl text-[#a8714f]">
              {Math.max(0, 54.8 - percent).toFixed(1)}%
            </strong>
          </div>
        </section>
      )}

      <section className="rounded-[20px] border border-[var(--line)] p-5">
        <h2 className="text-[17px] font-semibold">Before scheduling</h2>
        <Check label="Code format" value={values.code ? "Ready" : "Required"} />
        <Check
          label="Eligibility"
          value={values.appliesTo === "all" ? "All gifts" : scope}
        />
        <Check label="Customer cap" value="1 use each" />
        <Check
          label="Margin review"
          value={percent > 15 ? "Required" : "Clear"}
        />
      </section>
    </aside>
  );
}

function Check(props: { label: string; value: string }) {
  return (
    <div className="mt-3 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs">
      <span className="text-[var(--muted)]">{props.label}</span>
      <span className="font-semibold text-[var(--brand)]">{props.value}</span>
    </div>
  );
}

function offerTitle(values: PromotionDraft) {
  if (values.discountType === "free_delivery") return "Free delivery";
  if (values.discountType === "fixed") {
    return `$${Number(values.discountValue || 0).toFixed(0)} off celebration gifts`;
  }
  return `${Number(values.discountValue || 0)}% off celebration gifts`;
}

function discountLabel(values: PromotionDraft) {
  if (values.discountType === "free_delivery") return "FREE";
  const prefix = values.discountType === "fixed" ? "$" : "";
  const suffix = values.discountType === "percentage" ? "%" : "";
  return `−${prefix}${Number(values.discountValue || 0)}${suffix}`;
}

function dateRange(values: PromotionDraft) {
  if (!values.startsAt || !values.endsAt) return "Choose dates";
  const format = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  });
  return `${format.format(new Date(values.startsAt))}–${format.format(
    new Date(values.endsAt),
  )}`;
}
