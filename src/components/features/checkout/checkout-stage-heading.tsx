export function CheckoutStageHeading({
  copy,
  title,
}: {
  copy?: string;
  title: string;
}) {
  return (
    <header>
      <h2 className="serif text-[30px] leading-none sm:text-[34px]">{title}</h2>
      {copy ? (
        <p className="mt-[6px] text-sm leading-5 text-[var(--muted)]">{copy}</p>
      ) : null}
    </header>
  );
}
