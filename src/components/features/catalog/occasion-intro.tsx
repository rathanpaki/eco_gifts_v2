import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import {
  birthdayImage,
  corporateImage,
  weddingImage,
} from "@/constants/landing-images";
import type { ProductOccasion } from "@/types/product-occasion";

const details: Record<ProductOccasion, OccasionDetails> = {
  wedding: {
    eyebrow: "Wedding gifts",
    title: ["Made for the day.", "Remembered for years."],
    copy: "Personal keepsakes and useful pieces, chosen to honor the couple and the planet.",
    cta: "Build a wedding gift",
    image: weddingImage,
    alt: "A considered sustainable wedding gift box",
  },
  birthday: {
    eyebrow: "Birthday gifts",
    title: ["Made for their day.", "Remembered for years."],
    copy: "Useful, personal gifts chosen to make an ordinary day feel remarkable.",
    cta: "Build a birthday gift",
    image: birthdayImage,
    alt: "A thoughtfully wrapped sustainable birthday gift",
  },
  corporate: {
    eyebrow: "Corporate gifting",
    title: ["Made with your values.", "Remembered by teams."],
    copy: "Responsible thank-yous for clients, teams, and the moments that matter at work.",
    cta: "Build a team gift",
    image: corporateImage,
    alt: "A sustainable corporate gift set",
  },
};

const intents: Record<ProductOccasion, OccasionIntent[]> = {
  wedding: [
    { label: "For the couple", href: "/shop?occasion=wedding" },
    { label: "For the home", href: "/shop?category=Artisan+Home" },
    { label: "For the wedding party", href: "/shop?category=Celebration+Favors" },
  ],
  birthday: [
    { label: "For their day", href: "/shop?occasion=birthday" },
    { label: "For wellbeing", href: "/shop?category=Wellbeing" },
    { label: "For the celebration", href: "/shop?category=Celebration+Favors" },
  ],
  corporate: [
    { label: "For the team", href: "/shop?occasion=corporate" },
    { label: "For the desk", href: "/shop?category=Corporate+%26+Desk" },
    { label: "Food & drink gifts", href: "/shop?category=Food+%26+Drink" },
  ],
};

export function OccasionIntro({ occasion }: { occasion: ProductOccasion }) {
  const item = details[occasion];
  return (
    <div className="flex flex-col gap-8">
      <section className="grid min-h-[360px] overflow-hidden rounded-[24px] bg-[#eef4ee] lg:grid-cols-[520px_minmax(0,1fr)]">
        <div className="flex flex-col items-start justify-start gap-4 px-7 py-10 sm:px-12 sm:py-[52px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
            {item.eyebrow}
          </p>
          <h1 className="serif text-[clamp(38px,3.4vw,42px)] leading-[46px]">
            {item.title[0]}
            <br />
            {item.title[1]}
          </h1>
          <p className="max-w-[410px] text-[15px] leading-[18px] text-[#8a918a]">
            {item.copy}
          </p>
          <Link
            href="#collection-products"
            className="rounded-xl bg-[var(--brand)] px-5 py-[13px] text-sm font-semibold leading-[17px] text-white"
          >
            {item.cta}
          </Link>
        </div>
        <div className="relative min-h-[280px]">
          <Image
            alt={item.alt}
            fill
            priority
            sizes="(min-width: 1024px) 776px, 100vw"
            src={item.image}
            className="object-cover"
          />
        </div>
      </section>
      <section
        className="grid gap-4 md:grid-cols-3"
        aria-label="Shop by intent"
      >
        {intents[occasion].map((intent, index) => (
          <Link
            key={intent.label}
            href={intent.href}
            className={`h-[92px] rounded-2xl px-[22px] py-[22px] ${
              index === 1 ? "bg-[#eef4ee]" : "bg-[var(--subtle)]"
            }`}
          >
            <h2 className="serif text-lg leading-[25px]">{intent.label}</h2>
            <p className="mt-2 text-xs leading-[15px] text-[#8a918a]">
              Curated gifts with personalization options
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}

export function OccasionCollectionHeading({
  occasion,
  count,
}: {
  occasion: ProductOccasion;
  count: number;
}) {
  const title =
    occasion === "corporate"
      ? "Corporate favorites"
      : `${capitalize(occasion)} favorites`;
  return (
    <header className="flex min-h-[41px] items-start justify-between gap-4">
      <h2 className="serif text-[30px] leading-[41px]">{title}</h2>
      <p className="pt-1 text-[13px] leading-4 text-[#8a918a]">
        {count} considered gifts
      </p>
    </header>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

type OccasionDetails = {
  eyebrow: string;
  title: [string, string];
  copy: string;
  cta: string;
  image: StaticImageData;
  alt: string;
};

type OccasionIntent = {
  label: string;
  href: string;
};
