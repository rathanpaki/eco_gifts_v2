const metrics = [["94%", "Gifts made sustainably", "Independently verified"], ["100%", "Recycled packaging", "Zero single-use plastic"], ["12,400+", "Eco-contributions", "Trees, carbon, wildlife"], ["340kg", "Waste prevented monthly", "Demand-led sourcing"]];

export function Impact() {
  return <section id="impact" className="bg-[#202722] py-20 text-white"><div className="shell text-center"><p className="eyebrow text-[#91a892]">Our impact</p><h2 className="section-title mt-3">Numbers that matter</h2><div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{metrics.map(([value, label, note]) => <div key={label}><strong className="serif text-4xl text-[#91a892]">{value}</strong><p className="mt-3 text-sm font-semibold">{label}</p><p className="mt-2 text-xs text-white/55">{note}</p></div>)}</div></div></section>;
}
