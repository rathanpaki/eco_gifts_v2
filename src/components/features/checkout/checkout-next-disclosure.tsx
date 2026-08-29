export function CheckoutNextDisclosure() {
  return (
    <aside className="flex min-h-[78px] flex-col justify-center gap-1 rounded-[14px] border border-[#b8ceb9] bg-[#edf4ee] px-[14px] sm:min-h-16 sm:border-[var(--line)] sm:bg-[var(--subtle)]">
      <p className="text-xs font-semibold">Next: packaging and delivery</p>
      <p className="text-[11px] leading-4 text-[var(--muted)]">
        Compare presentation, arrival date, price, and estimated impact before
        payment.
      </p>
    </aside>
  );
}
