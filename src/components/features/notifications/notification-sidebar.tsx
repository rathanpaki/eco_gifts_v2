import Link from "next/link";
import { Bell } from "lucide-react";
import type { GiftPreferences } from "@/types/account-profile";

export function NotificationSidebar(props: { preferences?: GiftPreferences }) {
  return (
    <aside className="grid content-start gap-5">
      <section className="rounded-[20px] border border-[var(--line)] bg-transparent p-5">
        <h2 className="serif text-xl">Stay in control</h2>
        <p className="mt-2 text-xs leading-[17px] text-[var(--muted)]">
          Choose which updates reach your inbox and which stay here.
        </p>
        <div className="mt-4 divide-y divide-[var(--line)] border-t border-[var(--line)]">
          <PreferenceValue label="Order updates" value="On" />
          <PreferenceValue
            label="Gift reminders"
            value={props.preferences?.occasionReminders ? "On" : "Off"}
          />
          <PreferenceValue
            label="Impact reports"
            value={props.preferences?.impactMilestones ? "Monthly" : "Off"}
          />
        </div>
        <Link
          href="/account/preferences"
          className="mt-1 flex h-11 items-center justify-center rounded-xl border border-[#b5c9b6] bg-white text-[13px] font-semibold text-[var(--brand)]"
        >
          Manage settings
        </Link>
      </section>

      <section className="grid min-h-[304px] justify-items-center rounded-[20px] border border-[var(--line)] bg-white p-7 text-center">
        <Bell aria-hidden="true" className="text-[var(--brand)]" size={40} />
        <h2 className="serif mt-2 text-[22px]">You’re all caught up</h2>
        <p className="mt-1 text-xs leading-[17px] text-[var(--muted)]">
          Read notifications stay available for 30 days, then archive
          automatically.
        </p>
        <div className="mt-5 w-full rounded-[14px] bg-[#eef4ee] p-4 text-left">
          <p className="text-[10px] font-semibold text-[var(--brand)]">Tip</p>
          <p className="mt-1 text-[11px] text-[var(--muted)]">
            Keyboard shortcut: Shift + M marks all as read.
          </p>
        </div>
      </section>
    </aside>
  );
}

function PreferenceValue(props: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 text-xs">
      <span>{props.label}</span>
      <span className="min-w-[58px] rounded-full border border-[var(--line)] bg-white px-3 py-1 text-center text-[11px] font-semibold text-[var(--brand)]">
        {props.value}
      </span>
    </div>
  );
}
