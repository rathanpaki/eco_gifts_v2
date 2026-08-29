"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqItems, faqTopics } from "./faq-data";

export function FaqPage({ initialSearch = "" }: { initialSearch?: string }) {
  const [search, setSearch] = useState(initialSearch.trim().slice(0, 120));
  const [open, setOpen] = useState(faqItems[0].question);
  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return faqItems;
    return faqItems.filter((item) =>
      `${item.question} ${item.answer} ${item.topic}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[var(--page)]">
      <section className="grid min-h-[220px] place-items-center bg-[#eef4ee] px-5 py-9 text-center sm:min-h-[258px] sm:py-10">
        <div className="w-full max-w-[640px]">
          <h1 className="serif text-[34px] leading-tight sm:text-[42px] sm:leading-[61px]">How can we help?</h1>
          <p className="text-[15px] text-[var(--muted)]">
            Clear answers for ordering, personalising, delivery, returns, and
            impact.
          </p>
          <label className="mt-3 block text-left text-[13px] font-semibold">
            Search help
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try “delivery date” or “personalised message”"
              className="mt-2 h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] px-4 text-[15px] font-normal outline-none focus:border-[var(--brand)]"
            />
            <span className="mt-2 block text-xs font-normal text-[#8a918a]">
              Search results update as you type.
            </span>
          </label>
        </div>
      </section>

      <div className="mx-auto max-w-[1312px] px-5 py-9 sm:px-8 lg:px-16">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {faqTopics.map(([title, body, count]) => (
            <button
              type="button"
              key={title}
              onClick={() => setSearch(title)}
              className="rounded-2xl border border-[var(--line)] p-5 text-left"
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-3 text-[13px] text-[var(--muted)]">{body}</p>
              <p className="mt-3 text-[13px] font-semibold text-[var(--brand)]">
                {count} →
              </p>
            </button>
          ))}
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <section className="rounded-2xl border border-[var(--line)] px-5 py-6">
            <h2 className="serif text-2xl">Popular questions</h2>
            <div className="mt-2 divide-y divide-[var(--line)]">
              {visible.map((item) => {
                const expanded = open === item.question;
                return (
                  <div key={item.question} className="py-4">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-5 text-left text-[15px] font-semibold"
                      onClick={() => setOpen(expanded ? "" : item.question)}
                      aria-expanded={expanded}
                    >
                      {item.question}
                      {expanded ? (
                        <Minus aria-hidden="true" size={16} />
                      ) : (
                        <Plus aria-hidden="true" size={16} />
                      )}
                    </button>
                    {expanded && (
                      <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
              {!visible.length && (
                <p className="py-8 text-sm text-[var(--muted)]">
                  No matching answers. Try another phrase or contact support.
                </p>
              )}
            </div>
          </section>

          <aside className="rounded-2xl bg-[#252a26] p-6 text-white">
            <h2 className="serif text-[26px]">Still need a human?</h2>
            <p className="mt-3 text-sm leading-5">
              Our gifting team replies within one business day.
            </p>
            <a
              href="mailto:support@ecogifts.example"
              className="mt-4 flex h-11 w-40 items-center justify-center rounded-xl bg-[var(--brand)] text-sm font-semibold"
            >
              Contact support
            </a>
            <p className="mt-3 text-xs">Mon–Fri · 9:00–17:00</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
