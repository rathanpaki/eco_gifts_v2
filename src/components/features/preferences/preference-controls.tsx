import type { ReactNode } from "react";

export function PreferenceCard(props: {
  children: ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--page)] p-5 sm:p-6">
      <h2 className="text-xl font-semibold">{props.title}</h2>
      {props.description && (
        <p className="mt-2 text-sm text-[var(--muted)]">{props.description}</p>
      )}
      <div className="mt-4">{props.children}</div>
    </section>
  );
}

export function ChoiceGroup(props: {
  choices: readonly { label: string; value: string }[];
  multiple?: boolean;
  selected: string[];
  setSelected: (values: string[]) => void;
}) {
  function toggle(value: string) {
    if (!props.multiple) {
      props.setSelected([value]);
      return;
    }
    props.setSelected(
      props.selected.includes(value)
        ? props.selected.filter((item) => item !== value)
        : [...props.selected, value],
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {props.choices.map((choice) => {
        const active = props.selected.includes(choice.value);
        return (
          <button
            type="button"
            key={choice.value}
            aria-pressed={active}
            onClick={() => toggle(choice.value)}
            className={`rounded-full border px-[14px] py-[10px] text-sm font-medium ${
              active
                ? "border-[#b5c9b6] bg-[#eef4ee] font-semibold text-[var(--brand)]"
                : "border-[var(--line)] text-[var(--muted)]"
            }`}
          >
            {choice.label}
          </button>
        );
      })}
    </div>
  );
}

export function PreferenceSwitch(props: {
  checked: boolean;
  description: string;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div>
        <p className="text-[15px] font-semibold">{props.label}</p>
        <p className="mt-0.5 text-[13px] text-[var(--muted)]">
          {props.description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={props.checked}
        aria-label={props.label}
        onClick={() => props.onChange(!props.checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          props.checked ? "bg-[var(--brand)]" : "bg-[#e9e7df]"
        }`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white transition-[left] ${
            props.checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
