"use client";
import type { AccountAddress } from "@/types/account-profile";
import type { SavedPaymentMethod } from "@/types/account-saved";
import type {
  ContributionCause,
  RewardVoucher,
} from "@/types/contribution.types";
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
import { CheckoutNextDisclosure } from "./checkout-next-disclosure";
import { CheckoutStageHeading } from "./checkout-stage-heading";
import { CheckoutSavedAddresses } from "./checkout-saved-addresses";
import { CheckoutPaymentStage } from "./checkout-payment-stage";
import { CheckoutReviewPanel } from "./checkout-review-panel";
import { CheckoutStepActions } from "./checkout-step-actions";
import { CheckoutVoucherSelector } from "./checkout-voucher-selector";
import { EcoContributionSelector } from "./eco-contribution-selector";
import { GreenLogisticsSelector } from "./green-logistics-selector";
import { PackagingSelectorV2 } from "./packaging-selector-v2";
import type {
  CheckoutPaymentChoice,
  PaymentPresentation,
} from "./payment-method-panel";
import type { CheckoutStage } from "./checkout-progress";
import { PhoneVerificationCard } from "@/components/features/profile/phone-verification-card";

export interface CheckoutFormStageV2Props {
  address: DeliveryAddress;
  addressForm: AddressFormValues;
  addresses: AccountAddress[];
  cards: SavedPaymentMethod[];
  confirmed: boolean;
  contribution: { cause: ContributionCause; amountCents: number } | null;
  errors: AddressErrors;
  payment: PaymentPresentation;
  paymentChoice: CheckoutPaymentChoice;
  pending: boolean;
  quote: CheckoutQuote;
  reviewError?: string;
  selectedAddressId?: string;
  selectedCard?: SavedPaymentMethod;
  selectedDelivery: DeliveryOptionId;
  selectedPackaging: PackagingOptionId;
  selectedVoucherId?: string;
  stage: CheckoutStage;
  vouchers: RewardVoucher[];
  onAddressChange: (value: AddressFormValues) => void;
  onAddressSelect: (address: AccountAddress) => void;
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
  onVoucherChange: (value: string | undefined) => void;
}

export function CheckoutFormStageV2(props: CheckoutFormStageV2Props) {
  if (props.stage === "shipping") return <ShippingStage {...props} />;
  if (props.stage === "packaging") return <PackagingStage {...props} />;
  if (props.stage === "impact") return <ImpactStage {...props} />;
  if (props.stage === "payment")
    return (
      <CheckoutPaymentStage
        cards={props.cards}
        choice={props.paymentChoice}
        currency={props.quote.currency}
        onCardAdded={props.onCardAdded}
        onChange={props.onPaymentChange}
        onContinue={props.onContinue}
        selectedCard={props.selectedCard}
        totalCents={props.quote.totalCents}
      />
    );
  return (
    <CheckoutReviewPanel
      address={props.address}
      confirmed={props.confirmed}
      currency={props.quote.currency}
      error={props.reviewError}
      onConfirmed={props.onConfirmed}
      onEdit={props.onStageChange}
      payment={props.payment}
      pending={props.pending}
      quote={props.quote}
    />
  );
}

function ShippingStage(props: CheckoutFormStageV2Props) {
  return (
    <div className="flex flex-col gap-[18px]">
      <CheckoutStageHeading title="Where should we send it?" />
      <CheckoutSavedAddresses
        addresses={props.addresses}
        onSelect={props.onAddressSelect}
        selectedId={props.selectedAddressId}
      />
      <CheckoutAddressForm
        errors={props.errors}
        onChange={props.onAddressChange}
        value={props.addressForm}
      />
      <PhoneVerificationCard compact phone={props.addressForm.phone} />
      {props.reviewError ? (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
          {props.reviewError}
        </p>
      ) : null}
      <CheckoutNextDisclosure />
      <CheckoutStepActions
        continueLabel="Continue to packaging & delivery"
        onContinue={props.onContinue}
      />
    </div>
  );
}

function PackagingStage(props: CheckoutFormStageV2Props) {
  return (
    <div className="flex flex-col gap-6">
      <CheckoutStageHeading
        copy="Reduce impact without hiding cost or slowing delivery."
        title="Choose packaging and delivery"
      />
      <PackagingSelectorV2
        currency={props.quote.currency}
        onSelect={(option) => props.onPackagingChange(option.id)}
        options={props.quote.packagingOptions}
        selectedId={props.selectedPackaging}
      />
      <GreenLogisticsSelector
        currency={props.quote.currency}
        onSelect={(option) => props.onDeliveryChange(option.id)}
        options={props.quote.deliveryOptions}
        selectedId={props.selectedDelivery}
      />
      <div className="flex h-16 items-center justify-between gap-4 rounded-[14px] border border-[var(--line)] bg-[var(--subtle)] px-[14px]">
        <div>
          <p className="text-xs font-semibold">
            Estimated impact for this choice
          </p>
          <p className="mt-[3px] text-[11px] text-[var(--muted)]">
            {props.quote.impact.co2SavedKg} kg CO₂e estimate · packaging and
            carrier factors
          </p>
        </div>
        <p className="shrink-0 text-xs font-semibold text-[var(--brand)]">
          +{props.quote.packaging.ecoBonusPoints} EcoPoints
        </p>
      </div>
      <CheckoutStepActions
        continueLabel="Continue to impact"
        onBack={() => props.onStageChange("shipping")}
        onContinue={props.onContinue}
      />
    </div>
  );
}

function ImpactStage(props: CheckoutFormStageV2Props) {
  return (
    <div className="flex flex-col gap-6">
      <CheckoutStageHeading
        copy="Support a cause or apply an EcoPoints reward. Both choices stay separate from shipping and packaging."
        title="Choose your impact"
      />
      <EcoContributionSelector
        currency={props.quote.currency}
        onChange={props.onContributionChange}
        value={props.contribution}
      />
      <CheckoutVoucherSelector
        currency={props.quote.currency}
        onSelect={props.onVoucherChange}
        selectedId={props.selectedVoucherId}
        vouchers={props.vouchers}
      />
      <CheckoutStepActions
        continueLabel="Continue to payment"
        onBack={() => props.onStageChange("packaging")}
        onContinue={props.onContinue}
      />
    </div>
  );
}
