const sections = [
  "Overview",
  "Information we collect",
  "Your privacy choices",
  "Contact",
];

export function PrivacyNavigation() {
  return (
    <aside className="glass-panel h-fit min-h-[624px] rounded-2xl p-6">
      <h2 className="serif text-[22px]">Privacy center</h2>
      <p className="mt-2 text-[13px] text-[#8a918a]">Updated 24 July 2026</p>
      <nav className="mt-3 grid gap-1" aria-label="Privacy sections">
        {sections.map((section, index) => (
          <a
            key={section}
            href={index === 0 ? "#overview" : `#${slug(section)}`}
            className={`rounded-[10px] px-3 py-[10px] text-sm font-medium ${
              index === 0
                ? "bg-[#eef4ee] font-semibold text-[var(--brand)]"
                : "text-[var(--muted)] hover:bg-[#f2efe7]"
            }`}
          >
            {section}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-");
}
