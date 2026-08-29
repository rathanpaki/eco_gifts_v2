import { PreferenceSwitch } from "@/components/features/preferences/preference-controls";
import type {
  AdminSettings,
  AdminSettingsSection,
} from "@/types/admin-settings";

type Props = {
  section: AdminSettingsSection;
  set: <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => void;
  values: AdminSettings;
};

export function AdminSettingsCards({ section, set, values }: Props) {
  if (section === "Store profile")
    return (
      <SettingsCard title="Store profile" description="Shown across the storefront and customer communications.">
        <SettingsField label="Store name" value={values.storeName} onChange={(value) => set("storeName", value)} />
        <SettingsField label="Support email" type="email" value={values.supportEmail} onChange={(value) => set("supportEmail", value)} />
        <div className="mt-5">
          <PreferenceSwitch
            label="Storefront active"
            description="Customers can browse and place orders."
            checked={values.storefrontActive}
            onChange={(value) => set("storefrontActive", value)}
          />
        </div>
      </SettingsCard>
    );
  if (section === "Notifications")
    return (
      <SettingsCard title="Operational notifications">
        <Switches values={[
          ["New order alerts", "Notify fulfilment immediately.", values.newOrderAlerts, (value) => set("newOrderAlerts", value)],
          ["Payment failure alerts", "Notify finance and customer support.", values.paymentFailureAlerts, (value) => set("paymentFailureAlerts", value)],
          ["Low-stock digest", "Send one daily inventory summary.", values.lowStockDigest, (value) => set("lowStockDigest", value)],
        ]} />
      </SettingsCard>
    );
  if (section === "Fulfilment")
    return (
      <SettingsCard title="Fulfilment defaults">
        <label className="flex items-center justify-between gap-5 text-sm font-semibold">
          Default handling time
          <select value={values.handlingDays} onChange={(event) => set("handlingDays", Number(event.target.value))} className="h-10 rounded-[10px] border border-[var(--line)] bg-[var(--page)] px-3 text-[13px]">
            {[1, 2, 3, 5, 7, 10].map((days) => <option key={days} value={days}>{days} business {days === 1 ? "day" : "days"}</option>)}
          </select>
        </label>
        <div className="mt-5">
          <Switches values={[
            ["Carbon-neutral delivery default", "Preselect the lowest-impact eligible service.", values.carbonNeutralDelivery, (value) => set("carbonNeutralDelivery", value)],
            ["Require address validation", "Flag incomplete delivery details.", values.requireAddressValidation, (value) => set("requireAddressValidation", value)],
          ]} />
        </div>
      </SettingsCard>
    );
  return (
    <SettingsCard title="Security" description="Controls the lifetime of newly issued administrator sessions.">
      <label className="flex flex-wrap items-center justify-between gap-4 text-sm font-semibold">
        Admin session timeout
        <select value={values.sessionTimeoutMinutes} onChange={(event) => set("sessionTimeoutMinutes", Number(event.target.value))} className="h-10 rounded-[10px] border border-[var(--line)] bg-[var(--page)] px-3 text-[13px]">
          {[15, 30, 60, 120, 480].map((minutes) => <option key={minutes} value={minutes}>{minutes} minutes</option>)}
        </select>
      </label>
    </SettingsCard>
  );
}

type SwitchValue = [string, string, boolean, (value: boolean) => void];
function Switches({ values }: { values: SwitchValue[] }) {
  return <div className="grid gap-5">{values.map(([label, description, checked, onChange]) => <PreferenceSwitch key={label} label={label} description={description} checked={checked} onChange={onChange} />)}</div>;
}

function SettingsCard(props: { children: React.ReactNode; description?: string; title: string }) {
  return (
    <section className="max-w-[760px] rounded-2xl border border-[var(--line)] bg-[var(--page)] p-5 sm:p-6">
      <h2 className="serif text-[24px]">{props.title}</h2>
      {props.description ? <p className="mt-2 text-[13px] text-[var(--muted)]">{props.description}</p> : null}
      <div className="mt-5">{props.children}</div>
    </section>
  );
}

function SettingsField(props: { label: string; onChange: (value: string) => void; required?: boolean; type?: string; value: string }) {
  return (
    <label className="mt-4 block text-xs font-semibold">
      {props.label}
      <input required={props.required ?? true} type={props.type ?? "text"} value={props.value} onChange={(event) => props.onChange(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-sm font-normal outline-none focus:border-[var(--brand)]" />
    </label>
  );
}
