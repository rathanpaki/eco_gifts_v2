"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAccountProfile } from "@/hooks/use-account-profile";
import { useSavedPaymentMethods } from "@/hooks/use-account-saved";
import { useCheckoutQuote, usePlaceOrder } from "@/hooks/use-checkout";
import { useEcoImpactSummary } from "@/hooks/use-eco-contributions";
import type { ContributionCause } from "@/types/contribution.types";
import type { DeliveryOptionId, PackagingOptionId } from "@/types/checkout";
import { CheckoutFormStageV2 } from "./checkout-form-stage-v2";
import { CheckoutHeader } from "./checkout-header";
import { CheckoutLoading, CheckoutUnavailable } from "./checkout-states";
import { CheckoutSummary } from "./checkout-summary-v2";
import { CheckoutStageTransition } from "./checkout-stage-transition";
import { getOrderPaymentMethod, getPaymentPresentation } from "./payment-method-panel";
import { CheckoutProgress, type CheckoutStage } from "./checkout-progress";
import { normalizeAddress } from "./checkout-address-values";
import { useCheckoutAddress } from "./use-checkout-address";
import { useCheckoutPayment } from "./use-checkout-payment";

const NEXT_STAGE: Record<Exclude<CheckoutStage, "review">, CheckoutStage> = { shipping: "packaging", packaging: "impact", impact: "payment", payment: "review" };

export function CheckoutPage({ initialPromoCode }: { initialPromoCode?: string }) {
  const router = useRouter();
  const profile = useAccountProfile();
  const savedCards = useSavedPaymentMethods();
  const addressFlow = useCheckoutAddress(profile.data?.addresses ?? []);
  const paymentFlow = useCheckoutPayment(savedCards.data ?? []);
  const [packagingId, setPackagingId] = useState<PackagingOptionId>();
  const [deliveryId, setDeliveryId] = useState<DeliveryOptionId>();
  const [contribution, setContribution] = useState<{ cause: ContributionCause; amountCents: number } | null>(null);
  const [voucherId, setVoucherId] = useState<string>();
  const [promoCode, setPromoCode] = useState(initialPromoCode);
  const [stage, setStage] = useState<CheckoutStage>("shipping");
  const [confirmed, setConfirmed] = useState(false);
  const [reviewError, setReviewError] = useState<string>();
  const idempotencyKey = useRef<string | null>(null);
  const wallet = useEcoImpactSummary();
  const quote = useCheckoutQuote({ packagingId, deliveryId, contributionCause: contribution?.cause, contributionAmountCents: contribution?.amountCents, voucherId, promoCode });
  const place = usePlaceOrder();

  if (quote.isLoading) return <CheckoutLoading />;
  if (quote.isError || !quote.data) return <CheckoutUnavailable message={quote.error?.message ?? "Your live checkout quote could not be loaded."} retry={() => void quote.refetch()} />;

  const selectedPackaging = packagingId ?? quote.data.packaging.id;
  const selectedDelivery = deliveryId ?? quote.data.delivery.id;
  const payment = getPaymentPresentation(paymentFlow.choice, paymentFlow.selectedCard);
  function advance() {
    if (stage === "shipping") {
      const address = addressFlow.parse();
      if (!address) return;
      const verifiedPhone = normalizePhone(profile.data?.phone ?? "");
      if (
        profile.data?.phoneVerified !== true ||
        verifiedPhone !== normalizePhone(address.phone)
      ) {
        setReviewError("Verify this phone number before continuing.");
        return;
      }
    }
    setReviewError(undefined);
    if (stage !== "review") setStage(NEXT_STAGE[stage]);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (stage !== "review") return advance();
    const address = addressFlow.parse();
    if (!address) return;
    if (!confirmed) { setReviewError("Confirm your order details before placing it."); return; }
    idempotencyKey.current ??= crypto.randomUUID();
    place.mutate({ idempotencyKey: idempotencyKey.current, packagingId: selectedPackaging, deliveryId: selectedDelivery, paymentMethod: getOrderPaymentMethod(paymentFlow.choice), address, ...(contribution ? { contributionCause: contribution.cause, contributionAmountCents: contribution.amountCents } : {}), ...(voucherId ? { voucherId } : {}), ...(promoCode ? { promoCode } : {}) }, { onSuccess: (created) => router.replace(`/orders/${created.id}`) });
  }
  return (
    <><CheckoutHeader /><main className="min-h-[calc(100vh-64px)] bg-[var(--page)] px-5 pb-16 pt-4 sm:min-h-[calc(100vh-76px)] sm:px-6 sm:pt-9"><div className="mx-auto max-w-[1200px]">
      <CheckoutProgress stage={stage} onStageChange={setStage} />
      <form onSubmit={submit} noValidate className="mt-5 grid gap-7 sm:mt-8 sm:gap-10 lg:grid-cols-[minmax(0,680px)_minmax(340px,420px)] lg:gap-14">
        <div className="space-y-6">
          <CheckoutStageTransition stage={stage}><CheckoutFormStageV2 address={normalizeAddress(addressFlow.address)} addressForm={addressFlow.address} addresses={profile.data?.addresses ?? []} cards={paymentFlow.cards} confirmed={confirmed} contribution={contribution} errors={addressFlow.errors} payment={payment} paymentChoice={paymentFlow.choice} pending={place.isPending} quote={quote.data} reviewError={reviewError ?? place.error?.message} selectedAddressId={addressFlow.selectedAddressId} selectedCard={paymentFlow.selectedCard} selectedDelivery={selectedDelivery} selectedPackaging={selectedPackaging} selectedVoucherId={voucherId} stage={stage} vouchers={wallet.data?.vouchers ?? []} onAddressChange={addressFlow.change} onAddressSelect={addressFlow.select} onCardAdded={paymentFlow.addCard} onConfirmed={setConfirmed} onContinue={advance} onContributionChange={setContribution} onDeliveryChange={setDeliveryId} onPackagingChange={setPackagingId} onPaymentChange={paymentFlow.setChoice} onStageChange={setStage} onVoucherChange={(value) => { setVoucherId(value); if (value) setPromoCode(undefined); }} /></CheckoutStageTransition>
          {stage !== "review" && place.error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{place.error.message}</p> : null}
        </div>
        <div className="lg:w-[420px]"><div className="sticky top-6"><CheckoutSummary payment={payment} quote={quote.data} stage={stage} /></div></div>
      </form>
    </div></main></>
  );
}

function normalizePhone(value: string) {
  return value.replace(/[\s()-]/g, "");
}
