"use client";

import { useState } from "react";
import {
  useGiftPreferences,
  useUpdateGiftPreferences,
} from "@/hooks/use-gift-preferences";
import type { GiftPreferences } from "@/types/account-profile";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import {
  ChoiceGroup,
  PreferenceCard,
  PreferenceSwitch,
} from "./preference-controls";

const occasions = [
  { label: "Birthdays", value: "birthdays" },
  { label: "Weddings", value: "weddings" },
  { label: "New baby", value: "new-baby" },
  { label: "Thank you", value: "thank-you" },
  { label: "Corporate", value: "corporate" },
];
const packaging = [
  { label: "Recycled sage", value: "recycled-sage" },
  { label: "Natural kraft", value: "natural-kraft" },
  { label: "Fabric wrap", value: "fabric-wrap" },
];
const styles = [
  { label: "Elegant", value: "elegant" },
  { label: "Classic", value: "classic" },
  { label: "Modern", value: "modern" },
  { label: "Script", value: "script" },
];

export function GiftPreferencesPage() {
  const query = useGiftPreferences();

  if (query.isPending) {
    return <LogoDrawLoader label="Loading gift preferences" />;
  }
  if (query.error) {
    return (
      <p className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
        {query.error.message}
      </p>
    );
  }
  return <PreferencesForm initial={query.data} />;
}

function PreferencesForm({ initial }: { initial: GiftPreferences }) {
  const [values, setValues] = useState(initial);
  const update = useUpdateGiftPreferences();
  const set = <K extends keyof GiftPreferences>(
    key: K,
    value: GiftPreferences[K],
  ) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        update.mutate(values);
      }}
    >
      <header>
        <h1 className="serif text-[34px] leading-none sm:text-[40px] sm:leading-[58px]">Gift preferences</h1>
        <p className="text-[15px] text-[var(--muted)]">
          Save the details that make future gifting faster—without limiting your
          choices.
        </p>
      </header>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div className="grid content-start gap-5">
          <PreferenceCard
            title="Occasions you gift for"
            description="We’ll surface relevant collections and reminders."
          >
            <ChoiceGroup
              choices={occasions}
              multiple
              selected={values.occasions}
              setSelected={(choice) => set("occasions", choice)}
            />
          </PreferenceCard>
          <PreferenceCard title="Preferred packaging">
            <ChoiceGroup
              choices={packaging}
              selected={[values.packaging]}
              setSelected={([choice]) => choice && set("packaging", choice)}
            />
            <div className="mt-5">
              <PreferenceSwitch
                label="Avoid plastic extras"
                description="Applied whenever the product allows it."
                checked={values.avoidPlasticExtras}
                onChange={(choice) => set("avoidPlasticExtras", choice)}
              />
            </div>
          </PreferenceCard>
        </div>

        <div className="grid content-start gap-5">
          <PreferenceCard
            title="Message card style"
            description="Choose a default; you can change it per gift."
          >
            <ChoiceGroup
              choices={styles}
              selected={[values.cardStyle]}
              setSelected={([choice]) => choice && set("cardStyle", choice)}
            />
          </PreferenceCard>
          <PreferenceCard title="Reminders & recommendations">
            <div className="grid gap-5">
              <PreferenceSwitch
                label="Occasion reminders"
                description="Send a gentle reminder 14 days before."
                checked={values.occasionReminders}
                onChange={(choice) => set("occasionReminders", choice)}
              />
              <PreferenceSwitch
                label="New collection updates"
                description="A monthly edit—never daily marketing."
                checked={values.newCollectionUpdates}
                onChange={(choice) => set("newCollectionUpdates", choice)}
              />
              <PreferenceSwitch
                label="Impact milestones"
                description="Share the positive impact of your gifts."
                checked={values.impactMilestones}
                onChange={(choice) => set("impactMilestones", choice)}
              />
            </div>
          </PreferenceCard>
        </div>
      </div>

      <footer className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <p className="text-[13px] text-[#8a918a]">
          {update.isSuccess
            ? "Preferences saved."
            : "Changes apply to this account only."}
        </p>
        <button
          type="submit"
          disabled={update.isPending}
          className="min-h-12 w-full rounded-xl bg-[var(--brand)] text-sm font-semibold text-white disabled:opacity-50 sm:h-11 sm:w-40 sm:min-h-0"
        >
          {update.isPending ? "Saving..." : "Save preferences"}
        </button>
      </footer>
      {update.error && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {update.error.message}
        </p>
      )}
    </form>
  );
}
