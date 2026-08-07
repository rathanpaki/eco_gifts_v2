import Image from "next/image";
import Link from "next/link";

export function Personalization() {
  return (
    <section id="customize" className="shell grid items-center gap-12 py-20 lg:grid-cols-2">
      <div><p className="eyebrow">Make it yours</p><h2 className="section-title mt-3">Every gift tells your story</h2><p className="mt-4 max-w-xl leading-7 text-[var(--muted)]">Personalise with names, dates, and heartfelt messages. Upload artwork or choose an elegant design, then preview it in real time.</p><div className="mt-7 grid gap-4"><label className="grid gap-2 text-sm font-semibold">Names or title<input disabled value="Sarah & James" className="h-12 rounded-lg border border-[var(--line)] bg-white px-4 font-normal disabled:opacity-100" /></label><label className="grid gap-2 text-sm font-semibold">Personal message<input disabled value="Thank you for celebrating with us" className="h-12 rounded-lg border border-[var(--line)] bg-white px-4 font-normal disabled:opacity-100" /></label></div><Link href="/customize" className="mt-6 inline-flex rounded-lg bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white">Start customising</Link></div>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-[var(--subtle)]"><Image src="/images/personalization-preview.jpg" alt="Personalized gift preview for Sarah and James" fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" /></div>
    </section>
  );
}
