"use client";

import { useState, type FormEvent } from "react";
import { useAddCustomerNote } from "@/hooks/use-admin-customers";
import type { AdminCustomer } from "@/types/admin-customer";
import styles from "./customer-context.module.css";

export function CustomerNotesCard({ customer }: { customer: AdminCustomer }) {
  const [body, setBody] = useState("");
  const mutation = useAddCustomerNote(customer.id);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (body.trim().length < 3) return;
    await mutation.mutateAsync(body);
    setBody("");
  };
  return (
    <section className={styles.notes}>
      <h2>Support context</h2>
      <div className={styles.noteList}>
        {customer.notes.length ? (
          customer.notes.map((note) => (
            <article key={note.id}>
              <p>{note.body}</p>
              <small>
                {date(note.createdAt)}
                {note.actorEmail ? ` · ${note.actorEmail}` : ""}
              </small>
            </article>
          ))
        ) : (
          <p>No support notes have been recorded.</p>
        )}
      </div>
      <form onSubmit={(event) => void submit(event)}>
        <label htmlFor="customer-note">Add internal note</label>
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
          {mutation.isPending ? "Saving…" : "Add internal note"}
        </button>
      </form>
    </section>
  );
}

function date(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
