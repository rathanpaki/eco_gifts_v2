interface CheckoutStepActionsProps {
  continueLabel: string;
  onBack?: () => void;
  onContinue: () => void;
}

export function CheckoutStepActions({
  continueLabel,
  onContinue,
}: CheckoutStepActionsProps) {
  return (
    <button
      type="button"
      onClick={onContinue}
      className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-[22px] text-sm font-semibold text-white sm:min-h-11"
    >
      {continueLabel}
    </button>
  );
}
