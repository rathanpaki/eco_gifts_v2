import type { AdminCustomer } from "@/types/admin-customer";
import { CustomerContactCard } from "./customer-contact-card";
import { CustomerDetailHeader } from "./customer-detail-header";
import { CustomerNotesCard } from "./customer-notes-card";
import { CustomerOrdersCard } from "./customer-orders-card";
import { CustomerPrivacyCard } from "./customer-privacy-card";
import styles from "./customer-detail.module.css";

export function CustomerDetailView({ customer }: { customer: AdminCustomer }) {
  return (
    <section className={styles.page}>
      <CustomerDetailHeader customer={customer} />
      <div className={styles.workspace}>
        <aside className={styles.context}>
          <CustomerContactCard customer={customer} />
          <CustomerNotesCard customer={customer} />
          <CustomerPrivacyCard customerId={customer.id} />
        </aside>
        <CustomerOrdersCard customer={customer} />
      </div>
    </section>
  );
}
