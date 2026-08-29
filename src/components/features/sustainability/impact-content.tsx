import Link from "next/link";

const projects = [
  {
    region: "SOUTH EAST ENGLAND",
    title: "Wildflower corridors",
    outcome: "18 hectares restored",
    className: "bg-[#eef4ee]",
  },
  {
    region: "WEST SUSSEX",
    title: "Community woodland",
    outcome: "4,200 native trees",
    className: "bg-[var(--subtle)]",
  },
  {
    region: "BRIGHTON COAST",
    title: "Coastal plastic recovery",
    outcome: "2.1 tonnes recovered",
    className: "bg-[#f7eee7]",
  },
];

export function ImpactContent() {
  return (
    <section className="px-5 pb-[52px] pt-10 sm:px-8 lg:px-[72px]">
      <div className="mx-auto max-w-[1296px]">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[18px] bg-[var(--subtle)] p-[26px]">
            <h2 className="serif text-[26px]">How we calculate impact</h2>
            <p className="mt-3.5 max-w-[540px] text-sm leading-6 text-[var(--muted)]">
              Packaging avoided compares each fulfilled order with a
              conventional baseline by product category. Tree and habitat
              contributions are reported only after partner confirmation.
            </p>
            <Link
              href="/help"
              className="mt-3.5 inline-block text-[13px] font-semibold text-[var(--brand)]"
            >
              Read the full methodology
            </Link>
          </article>
          <article className="rounded-[18px] bg-[#eef4ee] p-[26px]">
            <h2 className="serif text-[26px]">Your impact</h2>
            <p className="mt-3.5 text-sm leading-6 text-[var(--muted)]">
              3.2 kg packaging avoided
              <br />
              4 habitat projects supported
              <br />
              680 EcoPoints earned
            </p>
            <Link
              href="/account/impact"
              className="mt-3.5 inline-block text-[13px] font-semibold text-[var(--brand)]"
            >
              View your impact history
            </Link>
          </article>
        </div>

        <div className="mt-[26px] flex items-end justify-between">
          <h2 className="serif text-[28px]">Projects your gifts support</h2>
          <p className="text-xs font-medium text-[var(--muted)]">
            Quarterly partner reports
          </p>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`rounded-[18px] p-6 ${project.className}`}
            >
              <p className="text-[10px] font-semibold tracking-[0.1em] text-[var(--muted)]">
                {project.region}
              </p>
              <h3 className="serif mt-2.5 text-[22px]">{project.title}</h3>
              <p className="mt-2.5 text-[13px] font-semibold text-[var(--brand)]">
                {project.outcome}
              </p>
              <p className="mt-2.5 text-xs font-medium text-[var(--muted)]">
                Latest partner update
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
