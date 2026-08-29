import Link from "next/link";
import { Search } from "lucide-react";

const categories = [
  ["Orders & delivery", "Track, change, or report an issue", "orders"],
  ["Personalization", "Edit details and production timing", "personalization"],
  ["Returns & refunds", "Eligibility and refund status", "returns"],
  ["Impact & materials", "Eco scores and methodology", "impact"],
] as const;

const questions = [
  "Can I edit personalization after ordering?",
  "How is the Eco Score calculated?",
  "When will my order arrive?",
  "What can I return?",
] as const;

const states = [
  {
    title: "Your wishlist is empty",
    copy: "Save gifts to compare them later.",
    action: "Explore gifts",
    href: "/shop",
    error: false,
  },
  {
    title: "You’re offline",
    copy: "Check your connection. Your cart is safely saved.",
    action: "Try again",
    href: "/help",
    error: false,
  },
  {
    title: "Payment wasn’t completed",
    copy: "No charge was made. Review your details or choose another method.",
    action: "Review payment",
    href: "/checkout",
    error: true,
  },
] as const;

export function SupportPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--page)] px-5 pb-16 pt-8 sm:min-h-[calc(100vh-72px)] sm:px-6 sm:pt-11">
      <div className="mx-auto max-w-[1296px]">
        <header className="text-center">
          <p className="eyebrow">Help center</p>
          <h1 className="serif mt-5 text-[34px] leading-none sm:mt-6 sm:text-[40px]">
            How can we help?
          </h1>
          <form
            action="/faq"
            role="search"
            className="mx-auto mt-7 flex h-14 max-w-[660px] items-center gap-3 rounded-[14px] border border-[var(--line)] px-[18px]"
          >
            <Search size={18} aria-hidden="true" />
            <label htmlFor="help-search" className="sr-only">
              Search help
            </label>
            <input
              id="help-search"
              name="search"
              placeholder="Search orders, returns, personalization, or impact"
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[var(--muted)]"
            />
          </form>
        </header>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(([title, copy, search]) => (
            <article
              key={title}
              className="min-h-28 rounded-2xl bg-[var(--subtle)] p-5"
            >
              <h2 className="serif text-lg">{title}</h2>
              <p className="mt-3 text-[13px] text-[var(--muted)]">{copy}</p>
              <Link
                href={`/faq?search=${search}`}
                className="mt-2 inline-block text-[13px] font-semibold text-[var(--brand)]"
              >
                View articles
              </Link>
            </article>
          ))}
        </section>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,912px)_360px]">
          <section className="overflow-hidden rounded-[18px] border border-[var(--line)]">
            <h2 className="serif px-5 pb-1 pt-2 text-2xl">Popular questions</h2>
            <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
              {questions.map((question) => (
                <Link
                  href={`/faq?search=${encodeURIComponent(question)}`}
                  className="flex min-h-12 items-center justify-between gap-4 px-[18px] py-3 text-sm"
                  key={question}
                >
                  {question}
                  <span className="shrink-0 text-xs font-semibold text-[var(--brand)]">
                    View answer
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <aside className="min-h-[330px] rounded-[18px] bg-[#eef4ee] p-6">
            <h2 className="serif text-[26px]">Still need help?</h2>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Our gifting team replies within one business day.
            </p>
            <SupportDetail label="Live chat" value="Available 09:00–18:00" />
            <SupportDetail label="Email" value="hello@ecogifts.com" />
            <SupportDetail
              label="Order issue"
              value="Include your order number"
            />
          </aside>
        </div>

        <section className="mt-7 grid gap-4 lg:grid-cols-3">
          {states.map((state) => (
            <article
              className={`min-h-32 rounded-2xl border p-5 ${state.error ? "border-[#cf5454]" : "border-[var(--line)] bg-[var(--subtle)]"}`}
              key={state.title}
            >
              <h2
                className={`serif text-lg ${state.error ? "text-[#c65353]" : ""}`}
              >
                {state.title}
              </h2>
              <p className="mt-3 text-[13px] text-[var(--muted)]">
                {state.copy}
              </p>
              <Link
                href={state.href}
                className={`mt-2 inline-block text-[13px] font-semibold ${state.error ? "text-[#c65353]" : "text-[var(--brand)]"}`}
              >
                {state.action}
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function SupportDetail({ label, value }: { label: string; value: string }) {
  return (
    <p className="mt-3 text-sm font-semibold">
      {label}
      <span className="mt-1 block text-xs font-normal text-[var(--muted)]">
        {value}
      </span>
    </p>
  );
}
