"use client";

import { useState } from "react";
import { Heart, Leaf } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Personalization() {
  const [title, setTitle] = useState("Sarah & James");
  const [message, setMessage] = useState(
    "Thank you for celebrating with us",
  );
  return (
    <section
      id="customize"
      className="shell grid items-center gap-7 py-12 md:gap-12 md:py-20 lg:grid-cols-2"
    >
      <ScrollReveal preset="fade-left">
      <div>
        <p className="eyebrow">Make it yours</p>
        <h2 className="section-title mt-3">Every gift tells your story</h2>
        <p className="mt-4 max-w-xl leading-7 text-[var(--muted)]">
          Personalise with names, dates, and heartfelt messages, then preview
          your idea in real time.
        </p>
        <div className="mt-7 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            Names or title
            <input
              value={title}
              maxLength={48}
              onChange={(event) => setTitle(event.target.value)}
              className="h-12 rounded-lg border border-[var(--line)] bg-white px-4 font-normal outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/15"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Personal message
            <input
              value={message}
              maxLength={90}
              onChange={(event) => setMessage(event.target.value)}
              className="h-12 rounded-lg border border-[var(--line)] bg-white px-4 font-normal outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/15"
            />
          </label>
        </div>
        <Link
          href="/shop?personalizable=true"
          className="premium-action mt-6 flex min-h-11 w-full items-center justify-center rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white sm:inline-flex sm:w-auto"
        >
          Start personalizing
        </Link>
      </div>
      </ScrollReveal>
      <ScrollReveal delay={0.18} preset="scale-up">
        <LivePreview title={title} message={message} />
      </ScrollReveal>
    </section>
  );
}

function LivePreview({ title, message }: { title: string; message: string }) {
  return (
    <div className="landing-preview-wrap grid min-h-[230px] place-items-center overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top,#f8f5ec_0%,#efede5_70%)] p-5 sm:aspect-[1.08] sm:p-12">
      <article
        aria-live="polite"
        className="landing-preview-card grid min-h-[190px] w-full max-w-[520px] place-content-center rounded-[22px] border border-white/80 bg-white/90 px-5 py-8 text-center shadow-[0_22px_60px_rgba(39,54,45,.12)] backdrop-blur sm:min-h-[300px] sm:px-12 sm:py-10"
      >
        <div className="mx-auto flex items-center gap-2 text-[var(--brand)]">
          <Leaf size={22} aria-hidden="true" />
          <Heart size={20} fill="currentColor" aria-hidden="true" />
        </div>
        <h3 className="serif mt-4 break-words text-[clamp(26px,4vw,42px)] leading-tight text-[var(--brand)] sm:mt-7">
          {title.trim() || "Your names or title"}
        </h3>
        <p className="mx-auto mt-4 max-w-sm break-words text-sm leading-6 text-[var(--muted)] sm:text-base">
          {message.trim() || "Your personal message will appear here"}
        </p>
      </article>
    </div>
  );
}
