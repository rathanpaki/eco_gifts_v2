"use client";

import Link from "next/link";

interface PersonalizeActionProps {
  productSlug: string;
  saved: boolean;
  signedIn: boolean;
  onOpen: () => void;
}

export function PersonalizeAction(props: PersonalizeActionProps) {
  const className =
    "flex h-11 w-full items-center gap-3 rounded-xl bg-[var(--brand)] px-4 text-left text-white sm:h-12 sm:border-[1.5px] sm:border-[#b5c9b6] sm:bg-[#f7eee7] sm:text-[var(--ink)]";
  const content = (
    <>
      <span className="flex-1 text-sm font-semibold">
        {props.saved ? "Edit personalization" : "Personalize this gift"}
      </span>
      <span className="hidden text-[13px] font-medium text-[var(--muted)] sm:block">
        {props.saved ? "Saved" : "Optional · +$6"}
      </span>
    </>
  );

  if (!props.signedIn) {
    const next = `/shop/${encodeURIComponent(props.productSlug)}`;
    return (
      <Link
        href={`/sign-in?next=${encodeURIComponent(next)}`}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onOpen} className={className}>
      {content}
    </button>
  );
}
