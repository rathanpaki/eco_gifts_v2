const metrics = [["94%", "Gifts made sustainably", "Independently verified"], ["100%", "Recycled packaging", "Zero single-use plastic"], ["12,400+", "Eco-contributions", "Trees, carbon, wildlife"], ["340kg", "Waste prevented monthly", "Demand-led sourcing"]];

export function Impact() {
  return (
    <section id="impact" className="bg-[#202722] py-12 text-white md:py-20">
      <div className="shell text-left md:text-center">
        <p className="eyebrow text-[#91a892]">Our impact</p>
        <h2 className="section-title mt-3">Numbers that matter</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {metrics.map(([value, label, note]) => (
            <div key={label} className="flex items-start gap-4 sm:block">
              <strong className="serif w-[120px] shrink-0 text-[34px] leading-none text-[#91a892] sm:w-auto sm:text-4xl">
                {value}
              </strong>
              <span>
                <p className="text-sm font-semibold sm:mt-3">{label}</p>
                <p className="mt-1 text-xs text-white/55 sm:mt-2">{note}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
