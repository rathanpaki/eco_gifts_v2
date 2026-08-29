import { BadgeCheck, Quote, Star } from "lucide-react";
import type { ProductReview, ProductReviewFeed } from "@/types/product-review";

export function ProductReviews({ feed }: { feed: ProductReviewFeed }) {
  return (
    <section
      id="product-reviews"
      className="mt-9 scroll-mt-28 overflow-hidden rounded-[24px] border border-[var(--line)] bg-white shadow-[0_18px_55px_rgba(37,42,38,.06)]"
      aria-labelledby="product-reviews-title"
    >
      <header className="grid gap-6 bg-[#202722] px-5 py-7 text-white sm:px-8 sm:py-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#c7ed61]">
            Customer feedback
          </p>
          <h2
            id="product-reviews-title"
            className="serif mt-3 text-[30px] leading-tight sm:text-[36px]"
          >
            Reviews from verified purchases
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
            Real experiences from customers who received and confirmed their
            EcoGifts order.
          </p>
        </div>
        {feed.totalReviews ? <RatingProof feed={feed} /> : null}
      </header>
      <div className="p-4 sm:p-6">
        {feed.items.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {feed.items.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] bg-[var(--subtle)] p-5 sm:p-7">
            <p className="serif text-2xl">Be the first to share the details.</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              After delivery is confirmed, the purchaser can publish a
              verified review directly from their order page.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function RatingProof({ feed }: { feed: ProductReviewFeed }) {
  return (
    <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
      <strong className="serif text-4xl text-[#c7ed61]">
        {feed.averageRating.toFixed(1)}
      </strong>
      <span>
        <span className="flex gap-0.5 text-[#e4b45d]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={15}
              fill={star <= Math.round(feed.averageRating) ? "currentColor" : "none"}
            />
          ))}
        </span>
        <span className="mt-1 block text-xs text-white/65">
          {feed.totalReviews} verified{" "}
          {feed.totalReviews === 1 ? "review" : "reviews"}
        </span>
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article className="relative overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--page)] p-5 sm:p-6">
      <Quote
        aria-hidden="true"
        className="absolute right-5 top-5 text-[#d9e5d9]"
        size={30}
      />
      <p
        className="flex gap-0.5 text-[#c9853a]"
        aria-label={review.rating + " out of 5 stars"}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={15}
            fill={star <= review.rating ? "currentColor" : "none"}
          />
        ))}
      </p>
      {review.title ? (
        <h3 className="serif mt-4 pr-10 text-xl">{review.title}</h3>
      ) : null}
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        “{review.comment}”
      </p>
      <footer className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
        <strong className="text-[var(--ink)]">{review.displayName}</strong>
        <span className="flex items-center gap-1 text-[var(--brand)]">
          <BadgeCheck size={14} /> Verified purchase
        </span>
        <time className="sm:ml-auto" dateTime={review.createdAt}>
          {new Date(review.createdAt).toLocaleDateString("en", {
            dateStyle: "medium",
          })}
        </time>
      </footer>
    </article>
  );
}
