"use client";

import { useState } from "react";
import {
  useAdminSettings,
  useUpdateAdminSettings,
} from "@/hooks/use-admin-settings";
import type {
  AdminSettings,
  AdminSettingsSection,
} from "@/types/admin-settings";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { AdminSettingsCards } from "./admin-settings-cards";

const tabs: AdminSettingsSection[] = [
  "Store profile",
  "Notifications",
  "Fulfilment",
  "Security",
];

export function AdminSettingsPage() {
  const settings = useAdminSettings();
  if (settings.isPending) {
    return <LogoDrawLoader className="bg-[#f2efe7]" label="Loading store settings" size="page" />;
  }
  if (settings.error) {
    return (
      <p className="m-12 rounded-2xl bg-red-50 p-5 text-sm text-red-800">
        {settings.error.message}
      </p>
    );
  }
  return <SettingsForm initial={settings.data} />;
}

function SettingsForm({ initial }: { initial: AdminSettings }) {
  const [values, setValues] = useState(initial);
  const [section, setSection] =
    useState<AdminSettingsSection>("Store profile");
  const update = useUpdateAdminSettings();
  const set = <K extends keyof AdminSettings>(
    key: K,
    value: AdminSettings[K],
  ) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        update.mutate(values);
      }}
      className="min-h-screen bg-[#f2efe7] px-4 py-7 sm:px-6 sm:py-10 lg:px-12"
    >
      <header className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <h1 className="serif text-[34px] leading-tight sm:text-[38px]">Store settings</h1>
          <p className="text-sm text-[var(--muted)]">
            Operational defaults, notification rules, and account safeguards.
          </p>
        </div>
        <button
          type="submit"
          disabled={update.isPending}
          className="h-11 w-full rounded-xl bg-[var(--brand)] text-sm font-semibold text-white disabled:opacity-50 sm:w-40"
        >
          {update.isPending ? "Saving..." : "Save changes"}
        </button>
      </header>
      <div className="my-5 flex gap-2 overflow-x-auto pb-1" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={section === tab}
            onClick={() => setSection(tab)}
            className={`shrink-0 rounded-[10px] px-[14px] py-[10px] text-[13px] ${
              section === tab
                ? "bg-[#eef4ee] font-semibold text-[var(--brand)]"
                : "font-medium text-[var(--muted)] hover:bg-white/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <AdminSettingsCards section={section} values={values} set={set} />
      <SaveState
        error={update.error?.message}
        saved={update.isSuccess}
      />
    </form>
  );
}

function SaveState({ error, saved }: { error?: string; saved: boolean }) {
  if (error)
    return (
      <p className="mt-4 text-sm text-red-700" role="alert">
        {error}
      </p>
    );
  return saved ? (
    <p className="mt-4 text-sm font-semibold text-[var(--brand)]" role="status">
      Store settings saved.
    </p>
  ) : null;
}
