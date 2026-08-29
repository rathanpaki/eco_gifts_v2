import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import styles from "./admin-customers.module.css";

export function CustomersLoading() {
  return <LogoDrawLoader label="Loading customers" />;
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
