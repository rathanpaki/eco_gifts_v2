const metrics = [
  { value: "12,450", label: "Trees funded", meta: "Partner-confirmed" },
  {
    value: "8.5 t",
    label: "Plastic avoided",
    meta: "Calculated by package weight",
  },
  {
    value: "94%",
    label: "Sustainable materials",
    meta: "Supplier documentation",
  },
  {
    value: "100%",
    label: "Recycled packaging",
    meta: "Monthly procurement audit",
  },
];

export function ImpactHero() {
  return (
    <section className="bg-[#252a26] px-5 py-14 text-white sm:px-8 lg:px-[72px]">
      <div className="mx-auto max-w-[1296px]">
        <p className="text-[11px] font-semibold tracking-[0.14em]">
          OUR IMPACT / UPDATED JULY 2026
        </p>
        <h1 className="serif mt-7 text-[clamp(40px,5vw,48px)] leading-[1.08]">
          Numbers that matter.
          <br />
          Methods you can inspect.
        </h1>
        <p className="mt-5 max-w-[720px] text-[15px] leading-6">
          We publish the assumptions behind every metric, distinguish estimates
          from measured outcomes, and update our methodology quarterly.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl bg-white/[0.08] p-5"
            >
              <p className="serif text-[30px]">{metric.value}</p>
              <h2 className="mt-2 text-[13px] font-semibold">{metric.label}</h2>
              <p className="mt-2 text-[11px]">{metric.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
