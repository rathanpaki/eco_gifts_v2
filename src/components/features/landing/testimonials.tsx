import { Star } from "lucide-react";
import { testimonials } from "@/constants/landing";

export function Testimonials() {
  return <section className="shell py-20"><div className="text-center"><p className="eyebrow">Customer stories</p><h2 className="section-title mt-3">Celebrations worth remembering</h2></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{testimonials.map((item) => <figure key={item.author} className="card p-6"><div className="flex gap-1 text-[#c9853a]" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</div><blockquote className="mt-5 text-sm leading-6">“{item.quote}”</blockquote><figcaption className="mt-5 text-sm font-semibold">{item.author}<span className="mt-1 block text-xs font-normal text-[var(--muted)]">{item.context}</span></figcaption></figure>)}</div><div className="mt-7 flex flex-wrap justify-center gap-8 rounded-xl bg-[var(--subtle)] px-6 py-4 text-xs"><span>★ 4.9/5 average rating</span><span>✓ 2,400+ verified reviews</span><span>♻ Transparent eco scores</span></div></section>;
}
