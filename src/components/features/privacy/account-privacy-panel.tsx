import { PrivacyCollectionDetails } from "./privacy-details";

const principles = [
  ["Purpose-led", "Every field has a clear service purpose."],
  ["Limited retention", "We remove or anonymise data when it is no longer needed."],
  ["Your control", "Access, correct, export, or delete your information."],
];

export function AccountPrivacyPanel() {
  return (
    <section id="privacy" className="scroll-mt-28">
      <p className="text-[11px] font-semibold uppercase text-[var(--brand)]">Privacy</p>
      <h2 className="serif mt-3 text-[32px]">How we protect your privacy</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        We collect only what is needed to create, deliver, and support your gifts. We do not sell personal data.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {principles.map(([title, body]) => (
          <article key={title} className="rounded-2xl bg-[#eef4ee] p-5">
            <h3 className="font-semibold text-[var(--brand)]">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{body}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 max-w-[760px]">
        <PrivacyCollectionDetails />
      </div>
    </section>
  );
}
