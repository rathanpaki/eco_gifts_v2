import type { AdminCustomer } from "@/types/admin-customer";
import styles from "./customer-context.module.css";

export function CustomerContactCard({ customer }: { customer: AdminCustomer }) {
  return (
    <section className={styles.contact}>
      <h2>Contact & consent</h2>
      <Fact label="Phone" value={customer.contact.phone ?? "Not recorded"} />
      <Fact
        label="Primary address"
        value={customer.contact.address ?? "No fulfilled address recorded"}
      />
      <Fact label="Marketing consent" value={consent(customer)} />
      <Fact
        label="Preferred channel"
        value={customer.email ? "Email" : "Not recorded"}
      />
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.fact}>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

function consent(customer: AdminCustomer): string {
  if (!customer.marketingOptIn) return "Not opted in";
  if (!customer.marketingConsentUpdatedAt) {
    return "Opted in · consent date unavailable";
  }
  const date = new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    new Date(customer.marketingConsentUpdatedAt),
  );
  return `Opted in · ${date}`;
}
