"use client";

import { useState } from "react";
import { exportCustomerData } from "@/services/admin-customers.service";
import styles from "./customer-context.module.css";

export function CustomerPrivacyCard({ customerId }: { customerId: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const exportData = async () => {
    setPending(true);
    setError(null);
    try {
      await exportCustomerData(customerId);
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "The export failed.",
      );
    } finally {
      setPending(false);
    }
  };
  return (
    <section className={styles.privacy}>
      <h2>Privacy requests</h2>
      <p>Export data only after verifying the customer request.</p>
      <button
        disabled={pending}
        onClick={() => void exportData()}
        type="button"
      >
        {pending ? "Exporting…" : "Export customer data"}
      </button>
      <small>
        Account deletion requires a separately verified request and is
        intentionally unavailable from this screen.
      </small>
      {error && (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
