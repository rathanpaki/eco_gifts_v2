"use client";
import type { SavedPaymentMethod } from "@/types/account-saved";
import type { ContributionCause } from "@/types/contribution.types";
import type {
  CheckoutQuote,
  DeliveryAddress,
  DeliveryOptionId,
  PackagingOptionId,
} from "@/types/checkout";
import {
  CheckoutAddressForm,
  type AddressErrors,
  type AddressFormValues,
} from "./checkout-address-form";
import { EcoContributionSelector } from "./eco-contribution-selector";
import { GreenLogisticsSelector } from "./green-logistics-selector";
import { PackagingSelector } from "./packaging-selector";
import { CheckoutPaymentStage } from "./checkout-payment-stage";
import type {
  CheckoutPaymentChoice,
  PaymentPresentation,
} from "./payment-method-panel";
import { type CheckoutStage } from "./checkout-progress";
import { CheckoutReviewPanel } from "./checkout-review-panel";
import { CheckoutStepActions } from "./checkout-step-actions";

interface CheckoutFormStageProps {
  address: DeliveryAddress;
  cardLastFour?: string;

  addressForm: AddressFormValues;
  confirmed: boolean;
  contribution: { cause: ContributionCause; amountCents: number } | null;
  errors: AddressErrors;
  payment: PaymentPresentation;
  paymentChoice: CheckoutPaymentChoice;
  pending: boolean;
  quote: CheckoutQuote;
  reviewError?: string;
  selectedDelivery: DeliveryOptionId;
  selectedPackaging: PackagingOptionId;
  stage: CheckoutStage;
  onAddressChange: (value: AddressFormValues) => void;
  onCardAdded: (card: SavedPaymentMethod) => void;

  onConfirmed: (value: boolean) => void;
  onContinue: () => void;
  onContributionChange: (
    value: { cause: ContributionCause; amountCents: number } | null,
  ) => void;
  onDeliveryChange: (value: DeliveryOptionId) => void;
  onPackagingChange: (value: PackagingOptionId) => void;
  onPaymentChange: (value: CheckoutPaymentChoice) => void;
  onStageChange: (value: CheckoutStage) => void;
}

export function CheckoutFormStage(props: CheckoutFormStageProps) {
  if (props.stage === "shipping")
    return (
      <>
        <StageHeading
          eyebrow="Step 1 of 4"
          title="Where should we send your gift?"
          copy="Add the recipient and delivery address before choosing packaging."
        />
        <CheckoutAddressForm
          value={props.addressForm}
          errors={props.errors}
          onChange={props.onAddressChange}
        />
        <CheckoutStepActions
          continueLabel="Continue to packaging"
          onContinue={props.onContinue}
        />
      </>
    );
  if (props.stage === "packaging")
    return (
      <>
        <StageHeading
          title="Choose packaging and delivery"
          copy="Reduce impact without hiding cost or slowing delivery."
        />
        <PackagingSelector
          currency={props.quote.currency}
          options={props.quote.packagingOptions}
          selectedId={props.selectedPackaging}
          onSelect={(option) => props.onPackagingChange(option.id)}
        />
        <GreenLogisticsSelector
          currency={props.quote.currency}
          options={props.quote.deliveryOptions}
          selectedId={props.selectedDelivery}
          onSelect={(option) => props.onDeliveryChange(option.id)}
        />
        <p className="rounded-xl bg-[var(--subtle)] px-4 py-3 text-xs text-[var(--muted)]">
          {props.quote.impact.co2SavedKg} kg CO₂e estimate • packaging and
          carrier factors
        </p>
        <EcoContributionSelector
          currency={props.quote.currency}
          value={props.contribution}
          onChange={props.onContributionChange}
        />
        <CheckoutStepActions
          continueLabel="Continue to payment"
          onBack={() => props.onStageChange("shipping")}
          onContinue={props.onContinue}
        />
      </>
    );
  if (props.stage === "payment")
    return (
      <CheckoutPaymentStage
        choice={props.paymentChoice}
        currency={props.quote.currency}
        onCardAdded={props.onCardAdded}
        onChange={props.onPaymentChange}
        totalCents={props.quote.totalCents}
        onContinue={props.onContinue}
      />
    );
  return (
    <CheckoutReviewPanel
      address={props.address}
      confirmed={props.confirmed}
      currency={props.quote.currency}
      error={props.reviewError}
      payment={props.payment}
      pending={props.pending}
      quote={props.quote}
      onConfirmed={props.onConfirmed}
      onEdit={props.onStageChange}
    />
  );
}

function StageHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy: string;
}) {
  return (
    <header>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="serif mt-2 text-3xl">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{copy}</p>
    </header>
  );
}
