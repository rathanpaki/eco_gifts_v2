import Link from "next/link";

export function CheckoutLoading() {
  return <main className="min-h-[60vh] bg-slate-50 px-5 py-12"><div className="mx-auto max-w-6xl animate-pulse space-y-5"><div className="h-9 w-64 rounded bg-slate-200" /><div className="grid gap-8 lg:grid-cols-2"><div className="h-80 rounded-2xl bg-slate-200" /><div className="h-80 rounded-2xl bg-slate-200" /></div></div></main>;
}

export function CheckoutUnavailable({ message, retry }: { message: string; retry: () => void }) {
  return <main className="grid min-h-[60vh] place-items-center bg-slate-50 px-5"><section className="max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center"><h1 className="text-xl font-bold text-slate-900">Checkout unavailable</h1><p className="mt-2 text-sm leading-6 text-slate-600">{message}</p><div className="mt-5 flex justify-center gap-3"><button type="button" onClick={retry} className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Try again</button><Link href="/cart" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Review bag</Link></div></section></main>;
}
