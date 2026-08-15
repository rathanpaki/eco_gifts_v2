"use client";

import Link from "next/link";
import { useAdminCustomer } from "@/hooks/use-admin-customers";
import { CustomerDetailView } from "./customer-detail-view";
import styles from "./customer-detail.module.css";

export function CustomerDetailPage({ customerId }: { customerId: string }) {
  const result = useAdminCustomer(customerId);
  if (result.isLoading)
    return (
      <div className={styles.detailLoading} aria-label="Loading customer" />
    );
  if (result.isError || !result.data) {
    return (
      <section className={styles.state} role="alert">
        <h1>Customer unavailable</h1>
        <p>{result.error?.message ?? "This customer could not be loaded."}</p>
        <button onClick={() => void result.refetch()} type="button">
          Try again
        </button>
        <Link href="/admin/customers">Back to customers</Link>
      </section>
    );
  }
  return <CustomerDetailView customer={result.data} />;
}
