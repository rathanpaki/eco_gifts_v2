"use client";

import Link from "next/link";
import { useStoreSettings } from "@/hooks/use-store-settings";
import { NewsletterForm } from "./newsletter-form";

const groups = [
  { title: "Explore", links: [["Gift Guides", "/shop"], ["Corporate Gifting", "/shop?search=corporate"], ["Sustainability Report", "/#impact"]] },
  { title: "Shop", links: [["Plantable Gifts", "/shop?search=plantable"], ["Handmade Gifts", "/shop?search=handmade"], ["Gift Boxes", "/shop?search=gift%20box"]] },
  { title: "Support", links: [["Help Centre", "/help"], ["Order Tracking", "/account/orders"], ["Contact Us", "/help#order-support"]] },
  { title: "Company", links: [["About EcoGifts", "/#impact"], ["Our Story", "/#impact"], ["Accessibility", "/help#policies"]] },
] as const;

export function Footer() {
  const settings = useStoreSettings();
  const name = settings.data?.storeName ?? "EcoGifts";
  const support = settings.data?.supportEmail ?? "hello@ecogifts.example";
  return <footer className="bg-[#202722] py-14 text-white"><div className="shell"><div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-10 lg:flex-row lg:items-center"><div><h2 className="serif text-3xl">Join our eco community</h2><p className="mt-2 text-sm text-white/55">Get sustainable gifting inspiration, new products, and exclusive offers.</p></div><NewsletterForm /></div><div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-5"><div><p className="text-xl font-semibold">{name}</p><p className="mt-3 text-xs leading-5 text-white/50">Thoughtfully crafted gifts for a better planet.</p><a className="mt-3 block text-xs text-white/70" href={`mailto:${support}`}>{support}</a></div>{groups.map(({ title, links }) => <div key={title}><h3 className="text-sm font-semibold">{title}</h3><ul className="mt-4 grid gap-2 text-xs text-white/55">{links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul></div>)}</div><div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row"><p>© 2026 {name}. Thoughtfully crafted for a better planet.</p><p><Link href="/help#policies">Privacy</Link> · <Link href="/help#policies">Terms</Link> · <Link href="/help#policies">Accessibility</Link></p></div></div></footer>;
}
