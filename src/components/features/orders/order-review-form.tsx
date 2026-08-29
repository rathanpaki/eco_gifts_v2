"use client";

import { useState, type FormEvent } from "react";
import { Send, Star } from "lucide-react";

type ReviewValues = {
  rating: number;
  title?: string;
  comment: string;
};

export function OrderReviewForm(props: {
  error?: string;
  pending: boolean;
  onSubmit: (values: ReviewValues) => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.onSubmit({
      rating,
      title: String(data.get("title") ?? "").trim() || undefined,
      comment: comment.trim(),
    });
  }

  return (
    <form
      onSubmit={submit}
      className="mt-5 rounded-2xl border border-[#dce5dc] bg-white p-4 shadow-[0_16px_40px_rgba(37,42,38,.07)] sm:p-6"
    >
      <fieldset>
        <legend className="text-sm font-semibold">Your overall rating</legend>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Select one to five stars.
        </p>
        <div className="mt-3 flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={value + (value === 1 ? " star" : " stars")}
              onClick={() => setRating(value)}
              className="grid size-11 place-items-center rounded-xl transition hover:bg-[#f7eee7]"
            >
              <Star
                size={24}
                fill={value <= rating ? "currentColor" : "none"}
                className={
                  value <= rating ? "text-[#c9853a]" : "text-[#c9c6bd]"
                }
              />
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold">
          Review title
          <span className="text-xs font-normal text-[var(--muted)]">
            Optional — summarize the experience
          </span>
          <input
            name="title"
            maxLength={100}
            placeholder="Beautifully made and thoughtfully packed"
            className="h-12 rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-sm font-normal outline-none focus:border-[var(--brand)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Your feedback
          <textarea
            name="comment"
            required
            minLength={10}
            maxLength={1000}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share what stood out about the product, presentation, or quality."
            className="min-h-32 resize-y rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 py-3 text-sm font-normal leading-6 outline-none focus:border-[var(--brand)]"
          />
        </label>
      </div>
      <div className="mt-2 flex justify-end text-[11px] text-[var(--muted)]">
        {comment.length} / 1000
      </div>
      {props.error ? (
        <p role="alert" className="mt-3 text-xs text-red-700">
          {props.error}
        </p>
      ) : null}
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-[var(--muted)]">
          Published as a verified-purchase review.
        </p>
        <button
          disabled={props.pending || comment.trim().length < 10}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto"
        >
          <Send size={16} />
          {props.pending ? "Publishing…" : "Publish review"}
        </button>
      </div>
    </form>
  );
}
