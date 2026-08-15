import { Search } from "lucide-react";
import type {
  CustomerConsentFilter,
  CustomerListInput,
  CustomerOrderFilter,
} from "@/types/admin-customer";
import styles from "./admin-customers.module.css";

export function CustomerFilters({
  draft,
  onDraftChange,
  onSubmit,
}: {
  draft: CustomerListInput;
  onDraftChange: (value: CustomerListInput) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      className={styles.filters}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className={styles.search}>
        <Search aria-hidden="true" size={18} />
        <span>Search customers</span>
        <input
          onChange={(event) =>
            onDraftChange({ ...draft, search: event.target.value })
          }
          placeholder="Search name, email, or order ID"
          type="search"
          value={draft.search}
        />
      </label>
      <label>
        <span>Consent</span>
        <select
          onChange={(event) =>
            onDraftChange({
              ...draft,
              consent: event.target.value as CustomerConsentFilter,
            })
          }
          value={draft.consent}
        >
          <option value="any">Consent: Any</option>
          <option value="opted-in">Opted in</option>
          <option value="not-opted-in">Not opted in</option>
        </select>
      </label>
      <label>
        <span>Orders</span>
        <select
          onChange={(event) =>
            onDraftChange({
              ...draft,
              orders: event.target.value as CustomerOrderFilter,
            })
          }
          value={draft.orders}
        >
          <option value="any">Orders: Any</option>
          <option value="none">No orders</option>
          <option value="first-time">First-time</option>
          <option value="repeat">Repeat</option>
        </select>
      </label>
      <button type="submit">Apply</button>
    </form>
  );
}
