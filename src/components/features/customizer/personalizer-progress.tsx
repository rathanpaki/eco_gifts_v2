import { Check } from "lucide-react";

export function PersonalizerProgress() {
  return (
    <>
    <div className="w-full lg:hidden" aria-label="Personalization progress">
      <div className="flex items-center justify-between text-[11px]"><span className="font-semibold uppercase text-[var(--brand)]">Make it theirs</span><span className="text-[var(--muted)]">Step 1 of 3</span></div>
      <div className="mt-3 grid grid-cols-3 gap-1.5"><span className="h-1 rounded-full bg-[var(--brand)]" /><span className="h-1 rounded-full bg-[var(--line)]" /><span className="h-1 rounded-full bg-[var(--line)]" /></div>
    </div>
    <div
      className="hidden w-full max-w-[570px] overflow-x-auto lg:flex lg:justify-end"
      aria-label="Personalization progress"
    >
      <ProgressStep state="complete" title="Gift" meta="Selected" marker="1" />
      <ProgressStep
        state="current"
        title="Personalize"
        meta="In progress"
        marker="2"
      />
      <ProgressStep state="upcoming" title="Review" meta="Next" marker="3" />
    </div>
    </>
  );
}

function ProgressStep(props: {
  state: "complete" | "current" | "upcoming";
  title: string;
  meta: string;
  marker: string;
}) {
  const markerClass = {
    complete: "border-[var(--brand)] bg-[var(--brand)] text-white",
    current: "border-2 border-[var(--brand)] bg-[#eef4ee] text-[var(--brand)]",
    upcoming: "border-[var(--line)] bg-[var(--page)] text-[var(--muted)]",
  }[props.state];

  return (
    <div className="flex h-[72px] min-w-[180px] items-center gap-3.5 py-2">
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-full border text-[13px] font-semibold ${markerClass}`}
      >
        {props.state === "complete" ? (
          <Check aria-hidden="true" size={20} />
        ) : (
          props.marker
        )}
      </span>
      <span>
        <span className="block text-sm font-semibold">{props.title}</span>
        <span className="mt-1 block text-xs text-[var(--muted)]">
          {props.meta}
        </span>
      </span>
    </div>
  );
}
