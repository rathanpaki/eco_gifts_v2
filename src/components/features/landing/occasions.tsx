import Image from "next/image";
import Link from "next/link";

const occasions = [
  { name: "Weddings", image: "/images/weddings.jpg", className: "md:row-span-2" },
  { name: "Birthdays", image: "/images/birthdays.jpg", className: "" },
  { name: "Corporate", image: "/images/corporate.jpg", className: "" },
];

export function Occasions() {
  return (
    <section id="occasions" className="shell py-20">
      <div className="mb-8 flex items-end justify-between"><h2 className="section-title">Curated for Every Moment</h2><Link href="/#shop" className="text-sm text-[var(--brand)]">View All →</Link></div>
      <div className="grid gap-5 md:h-[550px] md:grid-cols-[2fr_1fr] md:grid-rows-2">
        {occasions.map((item) => <Link href={`/shop?occasion=${item.name.toLowerCase()}`} key={item.name} className={`group relative min-h-64 overflow-hidden rounded-2xl ${item.className}`}><Image src={item.image} alt={`${item.name} sustainable gift collection`} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width:768px) 66vw, 100vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" /><h3 className="serif absolute bottom-7 left-7 text-3xl text-white">{item.name}</h3></Link>)}
      </div>
    </section>
  );
}
