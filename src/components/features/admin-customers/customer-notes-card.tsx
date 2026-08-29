"use client";

import { useState, type FormEvent } from "react";
import { useAddCustomerNote } from "@/hooks/use-admin-customers";
import type { AdminCustomer } from "@/types/admin-customer";
import styles from "./customer-context.module.css";

export function CustomerNotesCard({ customer }: { customer: AdminCustomer }) {
  const [body, setBody] = useState("");
  const [editing, setEditing] = useState(false);
  const mutation = useAddCustomerNote(customer.id);
  const latest = customer.notes[0];

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (body.trim().length < 3) return;
    await mutation.mutateAsync(body);
    setBody("");
    setEditing(false);
  };

  return (
    <section className={styles.notes}>
      <h2>Support context</h2>
      <div className={styles.noteSummary}>
        {latest ? (
          <>
            <p>{latest.body}</p>
            <small>
              {date(latest.createdAt)}
              {latest.actorEmail ? ` · ${latest.actorEmail}` : ""}
            </small>
          </>
        ) : (
          <p>No support notes have been recorded.</p>
        )}
      </div>
      {editing ? (
        <form onSubmit={(event) => void submit(event)}>
          <label htmlFor="customer-note">Internal note</label>
          <textarea
            id="customer-note"
            maxLength={500}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Record relevant support context"
            value={body}
          />
          {mutation.isError && (
            <p className={styles.formError} role="alert">
              {mutation.error.message}
            </p>
          )}
          <button
            disabled={mutation.isPending || body.trim().length < 3}
            type="submit"
          >
            {mutation.isPending ? "Saving…" : "Save internal note"}
          </button>
        </form>
      ) : (
        <button onClick={() => setEditing(true)} type="button">
          Add internal note
        </button>
      )}
    </section>
  );
}

function date(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
