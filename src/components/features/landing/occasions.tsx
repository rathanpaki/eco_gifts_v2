import Image from "next/image";
import Link from "next/link";
import {
  birthdayImage,
  corporateImage,
  weddingImage,
} from "@/constants/landing-images";

const occasions = [
  {
    name: "Weddings",
    occasion: "wedding",
    image: weddingImage,
    copy: "Elegant sustainable favours",
    tone: "bg-[#f7eee7]",
    className: "md:row-span-2",
  },
  {
    name: "Birthdays",
    occasion: "birthday",
    image: birthdayImage,
    copy: "Personalized celebration gifts",
    tone: "bg-[#eef4ee]",
    className: "",
  },
  {
    name: "Corporate",
    occasion: "corporate",
    image: corporateImage,
    copy: "Branded gifts with purpose",
    tone: "bg-[var(--page)]",
    className: "",
  },
];

export function Occasions() {
  return (
    <section id="occasions" className="bg-[var(--subtle)] py-12 md:bg-transparent md:py-20">
      <div className="shell">
      <div className="mb-6 flex items-end justify-between md:mb-8">
        <h2 className="section-title">Curated for Every Moment</h2>
        <Link href="/occasions" className="hidden text-sm text-[var(--brand)] sm:block">
          View All →
        </Link>
      </div>
      <div className="grid gap-5 md:h-[550px] md:grid-cols-[2fr_1fr] md:grid-rows-2">
        {occasions.map((item) => (
          <Link
            href={`/shop?occasion=${item.occasion}`}
            key={item.name}
            className={
              "group relative flex min-h-[116px] items-center gap-4 overflow-hidden rounded-2xl p-3.5 md:block md:min-h-64 md:p-0 " +
              item.tone +
              " " +
              item.className
            }
          >
            <div className="relative size-[88px] shrink-0 overflow-hidden rounded-xl md:absolute md:inset-0 md:size-auto md:rounded-none">
              <Image
                src={item.image}
                alt={`${item.name} sustainable gift collection`}
                fill
                className="object-cover object-center transition duration-500 group-hover:scale-105"
                sizes="(min-width:768px) 66vw, 88px"
              />
            </div>
            <div className="absolute inset-0 hidden bg-gradient-to-t from-black/60 via-transparent md:block" />
            <div className="relative min-w-0 md:absolute md:bottom-7 md:left-7">
              <h3 className="serif text-[22px] text-[var(--ink)] md:text-3xl md:text-white">
                {item.name}
              </h3>
              <p className="mt-1 text-[13px] text-[var(--muted)] md:hidden">
                {item.copy}
              </p>
              <span className="mt-1 block text-xs font-semibold text-[var(--brand)] md:hidden">
                Shop collection →
              </span>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/occasions" className="mt-6 inline-flex text-sm font-semibold text-[var(--brand)] sm:hidden">
        View all occasions →
      </Link>
      </div>
    </section>
  );
}
