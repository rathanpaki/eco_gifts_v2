import { useAdminOrder } from "@/hooks/use-admin-orders";
import type { FulfillmentStatus } from "@/types/checkout";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";
import { OrderInspector } from "./order-inspector";
import styles from "./admin-orders.module.css";

export function InspectorState({
  detail,
  error,
  onTransition,
  pending,
}: {
  detail: ReturnType<typeof useAdminOrder>;
  error: string | null;
  onTransition: (status: FulfillmentStatus) => void;
  pending: boolean;
}) {
  if (detail.isLoading)
    return <LogoDrawLoader label="Loading order details" />;
  if (detail.isError)
    return (
      <aside className={styles.inspectorState}>
        <h2>Order unavailable</h2>
        <p>{detail.error.message}</p>
        <button onClick={() => void detail.refetch()} type="button">
          Try again
        </button>
      </aside>
    );
  if (!detail.data)
    return (
      <aside className={styles.inspectorState}>
        <h2>Select an order</h2>
        <p>Choose an order from the queue to inspect fulfillment details.</p>
      </aside>
    );
  return (
    <OrderInspector
      error={error}
      onTransition={onTransition}
      order={detail.data}
      pending={pending}
    />
  );
}

export function OrdersSkeleton() {
  return <LogoDrawLoader label="Loading orders" />;
}

export function OrdersError({
  message,
  retry,
}: {
  message: string;
  retry: () => void;
}) {
  return (
    <div className={styles.pageState} role="alert">
      <h2>Orders unavailable</h2>
      <p>{message}</p>
      <button onClick={retry} type="button">
        Try again
      </button>
    </div>
  );
}
