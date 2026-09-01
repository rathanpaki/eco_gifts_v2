import { Star } from "lucide-react";
import { testimonials } from "@/constants/landing";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Testimonials() {
  return (
    <section className="shell py-12 md:py-20">
      <ScrollReveal preset="fade-right">
      <div className="text-left md:text-center">
        <p className="eyebrow">Customer stories</p>
        <h2 className="section-title mt-3">Celebrations worth remembering</h2>
      </div>
      </ScrollReveal>
      <div className="mt-7 grid gap-5 md:mt-10 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <ScrollReveal delay={index * 0.13} key={item.author} preset="scale-up">
          <figure className="card landing-testimonial h-full p-5 sm:p-6">
            <div className="flex gap-1 text-[#c9853a]" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={14} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-6 sm:mt-5">“{item.quote}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold sm:mt-5">
              {item.author}
              <span className="mt-1 block text-xs font-normal text-[var(--muted)]">
                {item.context}
              </span>
            </figcaption>
          </figure>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={0.3} preset="blur-in">
      <div className="mt-7 grid gap-3 rounded-xl bg-[var(--subtle)] px-5 py-4 text-xs sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
        <span>★ 4.9/5 average rating</span>
        <span>✓ 2,400+ verified reviews</span>
        <span>♻ Transparent eco scores</span>
      </div>
      </ScrollReveal>
    </section>
  );
}
