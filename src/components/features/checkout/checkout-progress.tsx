import { Check } from "lucide-react";
import { motion } from "motion/react";

export type CheckoutStage =
  "shipping" | "packaging" | "impact" | "payment" | "review";

const steps = [
  { id: "shipping", title: "Shipping", next: "In progress" },
  { id: "packaging", title: "Packaging", next: "Next" },
  { id: "impact", title: "Impact", next: "Later" },
  { id: "payment", title: "Payment", next: "Later" },
  { id: "review", title: "Review", next: "Final step" },
] as const;

export function CheckoutProgress({
  stage,
  onStageChange,
}: {
  stage: CheckoutStage;
  onStageChange?: (stage: CheckoutStage) => void;
}) {
  const current = steps.findIndex((step) => step.id === stage);
  return (
    <ol
      className="grid min-h-[54px] grid-cols-5 gap-0 sm:min-h-[72px] sm:gap-3"
      aria-label="Checkout progress"
    >
      {steps.map((step, index) => {
        const complete = index < current;
        const active = index === current;
        return (
          <li className="min-w-0" key={step.id}>
            <button
              type="button"
              disabled={!complete}
              onClick={() => onStageChange?.(step.id)}
              className="flex w-full min-w-0 flex-col items-center gap-1 text-center disabled:cursor-default sm:flex-row sm:gap-3 sm:text-left"
            >
              <motion.span
                animate={{ scale: active ? 1.08 : 1, boxShadow: active ? "0 8px 22px rgba(61,85,64,.2)" : "0 0 0 rgba(61,85,64,0)" }}
                className={`grid size-[26px] shrink-0 place-items-center rounded-full border text-[10px] font-semibold sm:size-10 sm:text-sm ${complete ? "border-[var(--brand)] bg-[var(--brand)] text-white" : active ? "border-2 border-[var(--brand)] bg-[#eef4ee] text-[var(--brand)]" : "border-[var(--line)] bg-transparent text-[var(--muted)]"}`}
              >
                {complete ? (
                  <Check aria-label="Complete" size={18} />
                ) : (
                  index + 1
                )}
              </motion.span>
              <span className="min-w-0">
                <span className="block truncate text-[9px] font-semibold sm:text-sm">
                  {step.title}
                </span>
                <span className="mt-1 hidden truncate text-xs text-[var(--muted)] sm:block">
                  {complete ? "Complete" : active ? "In progress" : step.next}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
