"use client";

import { useEffect, useState } from "react";
import { useAccountProfile } from "@/hooks/use-account-profile";
import { AccountPrivacyPanel } from "@/components/features/privacy/account-privacy-panel";
import { AccountDataPanel } from "@/components/features/privacy/account-data-panel";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { PaymentMethodsList } from "./payment-methods-list";
import { ProfileContactCard } from "./profile-contact-card";

export function AccountSettingsPage() {
  const [section, setSection] = useState<SettingsSection>("profile");
  const profile = useAccountProfile();
  useEffect(() => {
    const sync = () => setSection(sectionFromHash(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  if (profile.isPending) return <LogoDrawLoader label="Loading account settings" />;
  if (profile.error || !profile.data) return <p className="rounded-2xl bg-red-50 p-6 text-sm text-red-700">{profile.error?.message ?? "Account settings unavailable."}</p>;
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase text-[var(--brand)]">Account</p>
      <h1 className="serif mt-3 text-[34px] leading-none sm:text-[40px]">Account settings</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">Manage your profile, privacy, and account data in one place.</p>
      <SettingsNavigation section={section} onChange={setSection} />
      <div className="mt-6">
        {section === "profile" ? (
          <div className="grid gap-6">
            <ProfileContactCard profile={profile.data} />
            <PaymentMethodsList />
          </div>
        ) : section === "privacy" ? (
          <AccountPrivacyPanel />
        ) : (
          <AccountDataPanel />
        )}
      </div>
    </div>
  );
}

type SettingsSection = "profile" | "privacy" | "data";
const settingsSections: { id: SettingsSection; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "privacy", label: "Privacy" },
  { id: "data", label: "Data controls" },
];

function SettingsNavigation(props: {
  section: SettingsSection;
  onChange: (section: SettingsSection) => void;
}) {
  return (
    <nav className="glass-soft mt-6 flex gap-2 overflow-x-auto rounded-xl p-1" aria-label="Account settings">
      {settingsSections.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-current={props.section === item.id ? "page" : undefined}
          onClick={() => {
            history.replaceState(null, "", `#${item.id}`);
            props.onChange(item.id);
          }}
          className={`h-10 shrink-0 rounded-[9px] px-4 text-sm ${
            props.section === item.id
              ? "glass-nav-active font-semibold"
              : "text-[var(--muted)]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function sectionFromHash(hash: string): SettingsSection {
  if (hash === "#privacy") return "privacy";
  if (hash === "#data") return "data";
  return "profile";
}
