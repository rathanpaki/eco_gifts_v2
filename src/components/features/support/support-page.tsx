import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  PackageCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const guides = [
  {
    title: "Track an order",
    copy: "View the latest fulfilment status, recipient details, and delivery estimate.",
    href: "/account/orders",
    icon: PackageCheck,
  },
  {
    title: "Personalise a gift",
    copy: "Choose an eligible gift, add your design, and review it before checkout.",
    href: "/shop?personalizable=true",
    icon: WandSparkles,
  },
  {
    title: "Frequently asked questions",
    copy: "Search answers about ordering, personalisation, delivery, returns, and impact.",
    href: "/faq",
    icon: ArrowRight,
  },
  {
    title: "Understand your impact",
    copy: "Review packaging choices, EcoPoints, contributions, and tree tracking.",
    href: "/account#impact",
    icon: Leaf,
  },
  {
    title: "Shop by intention",
    copy: "Explore live gifts, availability, transparent eco scores, and sustainable options.",
    href: "/shop",
    icon: Sparkles,
  },
];

export function SupportPage() {
  return (
    <main className="min-h-screen bg-[var(--page)] px-5 py-12 sm:px-8 lg:px-[72px]">
      <section className="mx-auto max-w-[1296px]">
        <header className="max-w-2xl border-b border-[var(--line)] pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
            Support
          </p>
          <h1 className="serif mt-2 text-4xl sm:text-5xl">How can we help?</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Find practical answers for your EcoGifts order, personalization,
            delivery, and environmental impact.
          </p>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {guides.map(({ title, copy, href, icon: Icon }) => (
            <Link
              className="group rounded-2xl border border-[var(--line)] bg-white p-6 transition hover:bg-[var(--subtle)]"
              href={href}
              key={title}
            >
              <Icon className="size-6 text-[var(--brand)]" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {copy}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                Open <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>

        <section
          id="order-support"
          className="mt-8 rounded-2xl bg-[var(--brand)] p-6 text-white sm:p-8"
        >
          <h2 className="serif text-3xl">Need help with an existing order?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
            Your account contains the live delivery timeline, confirmation
            details, and the order number needed for support.
          </p>
          <Link
            className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-white px-5 text-sm font-semibold text-[var(--brand)]"
            href="/account/orders"
          >
            Open your orders
          </Link>
        </section>

        <section
          id="policies"
          className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6"
        >
          <h2 className="text-xl font-semibold">Policies and accessibility</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Privacy, terms, and accessibility policy content needs
            business-owner and jurisdiction-specific legal approval before
            public launch. This project does not present unreviewed policy copy
            as final legal terms.
          </p>
        </section>
      </section>
    </main>
  );
}
