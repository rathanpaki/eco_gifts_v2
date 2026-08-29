import { BadgeCheck, Star } from "lucide-react";
import type { ProductReviewFeed } from "@/types/product-review";

export function ProductReviewSummary({ feed }: { feed: ProductReviewFeed }) {
  const label = feed.totalReviews
    ? feed.averageRating.toFixed(1) +
      " · " +
      feed.totalReviews +
      " verified " +
      (feed.totalReviews === 1 ? "review" : "reviews")
    : "No reviews yet";
  return (
    <div className="flex flex-wrap items-center justify-end gap-2.5 text-[13px] sm:justify-start">
      <span
        className="hidden items-center gap-0.5 text-[#c9853a] sm:flex"
        aria-label={
          feed.totalReviews
            ? feed.averageRating + " out of 5 stars"
            : undefined
        }
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            fill={star <= Math.round(feed.averageRating) ? "currentColor" : "none"}
          />
        ))}
      </span>
      <span className="font-medium text-[#616861]">{label}</span>
      {feed.totalReviews ? (
        <span className="hidden items-center gap-1 rounded-full bg-[#eef4ee] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand)] sm:flex">
          <BadgeCheck size={13} /> Verified
        </span>
      ) : null}
      <a
        href="#product-reviews"
        className="hidden min-h-11 content-center font-semibold text-[var(--brand)] sm:block"
      >
        {feed.totalReviews ? "Read reviews" : "Review information"}
      </a>
    </div>
  );
}
