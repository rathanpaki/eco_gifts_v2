import { Search } from "lucide-react";
import type {
  CustomerConsentFilter,
  CustomerListInput,
  CustomerOrderFilter,
} from "@/types/admin-customer";
import styles from "./customer-filters.module.css";

type Props = {
  draft: CustomerListInput;
  onDraftChange: (value: CustomerListInput) => void;
  onSubmit: (value?: CustomerListInput) => void;
};

export function CustomerFilters({ draft, onDraftChange, onSubmit }: Props) {
  const apply = (next: CustomerListInput) => {
    onDraftChange(next);
    onSubmit(next);
  };
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
      <Filter
        label="Customer group"
        value={
          ["first-time", "repeat"].includes(draft.orders) ? draft.orders : "any"
        }
        onChange={(value) =>
          apply({ ...draft, orders: value as CustomerOrderFilter })
        }
        options={[
          ["any", "All customers"],
          ["first-time", "First-time"],
          ["repeat", "Repeat customers"],
        ]}
      />
      <Filter
        label="Consent"
        value={draft.consent}
        onChange={(value) =>
          apply({ ...draft, consent: value as CustomerConsentFilter })
        }
        options={[
          ["any", "Consent: Any"],
          ["opted-in", "Opted in"],
          ["not-opted-in", "Not opted in"],
        ]}
      />
      <Filter
        label="Orders"
        value={draft.orders === "none" ? "none" : "any"}
        onChange={(value) =>
          apply({ ...draft, orders: value as CustomerOrderFilter })
        }
        options={[
          ["any", "Orders: Any"],
          ["none", "Orders: None"],
        ]}
      />
    </form>
  );
}

function Filter({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[][];
  value: string;
}) {
  return (
    <label>
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map(([option, text]) => (
          <option key={option} value={option}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
