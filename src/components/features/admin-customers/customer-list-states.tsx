import styles from "./admin-customers.module.css";

export function CustomersLoading() {
  return (
    <div className={styles.loading} aria-label="Loading customers">
      <span />
      <span />
      <span />
    </div>
  );
}

export function CustomersError({
  message,
  retry,
}: {
  message: string;
  retry: () => void;
}) {
  return (
    <div className={styles.state} role="alert">
      <h2>Customers unavailable</h2>
      <p>{message}</p>
      <button onClick={retry} type="button">
        Try again
      </button>
    </div>
  );
}
