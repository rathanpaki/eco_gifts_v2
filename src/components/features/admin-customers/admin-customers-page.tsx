"use client";

import { useState } from "react";
import { useAdminCustomers } from "@/hooks/use-admin-customers";
import { exportCustomersCsv } from "@/services/admin-customers.service";
import type { CustomerListInput } from "@/types/admin-customer";
import { CustomerFilters } from "./customer-filters";
import { CustomerMetrics } from "./customer-metrics";
import { CustomersError, CustomersLoading } from "./customer-list-states";
import { CustomerTable } from "./customer-table";
import styles from "./admin-customers.module.css";

const initial: CustomerListInput = {
  consent: "any",
  orders: "any",
  search: "",
};

export function AdminCustomersPage() {
  const [query, setQuery] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const result = useAdminCustomers(query);
  const customers = result.data?.pages.flatMap((page) => page.items) ?? [];
  const metrics = result.data?.pages[0]?.metrics;

  const exportCsv = async () => {
    setExporting(true);
    setExportError(null);
    try {
      await exportCustomersCsv(query);
    } catch (error) {
      setExportError(
        error instanceof Error ? error.message : "The CSV export failed.",
      );
    } finally {
      setExporting(false);
    }
  };
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Customer operations</p>
          <h1>Customers</h1>
          <p>
            View order history, consent, and support context without hidden
            scoring.
          </p>
        </div>
        <button
          disabled={exporting || !metrics?.totalCustomers}
          onClick={() => void exportCsv()}
          type="button"
        >
          {exporting ? "Exporting…" : "Export CSV"}
        </button>
      </header>
      {exportError && (
        <p className={styles.error} role="alert">
          {exportError}
        </p>
      )}
      {result.isLoading && <CustomersLoading />}
      {result.isError && (
        <CustomersError
          message={result.error.message}
          retry={() => void result.refetch()}
        />
      )}
      {metrics && !result.isError && (
        <>
          <CustomerMetrics metrics={metrics} />
          <CustomerFilters
            draft={draft}
            onDraftChange={setDraft}
            onSubmit={() => setQuery({ ...draft, search: draft.search.trim() })}
          />
          <CustomerTable customers={customers} />
          <footer className={styles.footer}>
            <p>
              Customer data is limited to fulfillment, support, and recorded
              consent.
            </p>
            {result.hasNextPage && (
              <button
                disabled={result.isFetchingNextPage}
                onClick={() => void result.fetchNextPage()}
                type="button"
              >
                {result.isFetchingNextPage ? "Loading…" : "Load next page"}
              </button>
            )}
          </footer>
        </>
      )}
    </section>
  );
}
