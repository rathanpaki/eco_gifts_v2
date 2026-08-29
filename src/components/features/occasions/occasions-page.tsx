import Image from "next/image";
import Link from "next/link";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import {
  birthdayImage,
  corporateImage,
  weddingImage,
} from "@/constants/landing-images";

const collections = [
  {
    name: "Weddings",
    copy: "Personal keepsakes for couples, homes, and wedding parties.",
    href: "/shop?occasion=wedding",
    image: weddingImage,
  },
  {
    name: "Birthdays",
    copy: "Useful, joyful gifts selected for the people you know best.",
    href: "/shop?occasion=birthday",
    image: birthdayImage,
  },
  {
    name: "Corporate",
    copy: "Responsible appreciation for clients, teams, and milestones.",
    href: "/shop?occasion=corporate",
    image: corporateImage,
  },
];

export function OccasionsPage() {
  return (
    <>
      <StorefrontHeader />
      <main className="shell py-10 sm:py-14">
        <header className="max-w-3xl">
          <p className="eyebrow">Shop by occasion</p>
          <h1 className="serif mt-3 text-[clamp(40px,6vw,58px)] leading-none">
            A thoughtful gift for every moment.
          </h1>
          <p className="mt-5 text-base leading-7 text-[var(--muted)]">
            Start with the occasion, then refine the collection around the
            recipient, their space, and the way you want them to feel.
          </p>
        </header>
        <section className="mt-10 grid gap-6 lg:grid-cols-3" aria-label="Occasion collections">
          {collections.map((item) => (
            <Link key={item.name} href={item.href} className="group overflow-hidden rounded-[22px] border border-[var(--line)] bg-white">
              <div className="relative h-72 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width:1024px) 33vw, 100vw" />
              </div>
              <div className="p-6">
                <h2 className="serif text-3xl">{item.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.copy}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-[var(--brand)]">Explore collection →</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
