import Image from "next/image";

export function CatalogIntro() {
  return (
    <>
    <section className="lg:hidden">
      <p className="text-[11px] font-semibold uppercase text-[var(--brand)]">Thoughtful gifts, lighter impact</p>
      <h1 className="serif mt-2 text-[34px] leading-[1.36]">Find a gift they’ll remember</h1>
      <p className="mt-1 text-sm leading-5 text-[var(--muted)]">Curated, personal, and transparently lower-impact.</p>
    </section>
    <section className="hidden items-stretch gap-7 lg:grid lg:min-h-[220px] lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-12">
      <div className="flex flex-col justify-center">
        <p className="eyebrow">Home / Shop</p>
        <h1 className="serif mt-4 text-[clamp(34px,8vw,48px)] leading-[1.08]">
          Gifts chosen with
          <br className="hidden sm:block" /> care, not compromise.
        </h1>
        <p className="mt-4 max-w-[520px] text-base leading-[19px] text-[#8a918a]">
          Explore considered gifts with transparent materials, packaging, and
          contribution details.
        </p>
      </div>
      <article className="relative min-h-[190px] overflow-hidden rounded-[20px] bg-[var(--subtle)] sm:min-h-[220px]">
        <Image
          src="/images/quiet-comfort.jpeg"
          alt="A folded natural linen throw from the quiet comfort collection"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 500px, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-[11px] font-semibold uppercase">
            New / Quiet comfort
          </p>
          <h2 className="serif mt-3 text-[28px] leading-none">
            The mindful home edit
          </h2>
        </div>
      </article>
    </section>
    </>
  );
}
