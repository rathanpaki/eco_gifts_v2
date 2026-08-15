"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCheckoutQuote, usePlaceOrder } from "@/hooks/use-checkout";
import { deliveryAddressSchema } from "@/lib/schemas/checkout.schema";
import type { DeliveryAddress, DeliveryOptionId, PackagingOptionId } from "@/types/checkout";
import { CheckoutAddressForm, type AddressErrors, type AddressFormValues } from "./checkout-address-form";
import { CheckoutLoading, CheckoutUnavailable } from "./checkout-states";
import { CheckoutSummary } from "./checkout-summary";
import { GreenLogisticsSelector } from "./green-logistics-selector";
import { PackagingSelector } from "./packaging-selector";
import { PaymentMethodPanel } from "./payment-method-panel";

const EMPTY_ADDRESS: AddressFormValues = { fullName: "", addressLine1: "", addressLine2: "", city: "", region: "", postalCode: "", countryCode: "", phone: "" };

export function CheckoutPage() {
  const router = useRouter();
  const [packagingId, setPackagingId] = useState<PackagingOptionId>();
  const [deliveryId, setDeliveryId] = useState<DeliveryOptionId>();
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<AddressErrors>({});
  const idempotencyKey = useRef<string | null>(null);
  const quote = useCheckoutQuote({ packagingId, deliveryId });
  const place = usePlaceOrder();

  if (quote.isLoading) return <CheckoutLoading />;
  if (quote.isError || !quote.data) return <CheckoutUnavailable message={quote.error?.message ?? "Your live checkout quote could not be loaded."} retry={() => void quote.refetch()} />;

  const selectedPackaging = packagingId ?? quote.data.packaging.id;
  const selectedDelivery = deliveryId ?? quote.data.delivery.id;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const parsed = deliveryAddressSchema.safeParse(normalizeAddress(address));
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error.flatten().fieldErrors));
      return;
    }
    setErrors({});
    idempotencyKey.current ??= crypto.randomUUID();
    place.mutate(
      { idempotencyKey: idempotencyKey.current, packagingId: selectedPackaging, deliveryId: selectedDelivery, paymentMethod: "pay_on_delivery", address: parsed.data },
      { onSuccess: (created) => router.replace(`/orders/${created.id}`) },
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="border-b border-slate-200 pb-4"><h1 className="flex items-center gap-2 text-2xl font-black text-slate-900"><ShoppingBag className="size-6 text-emerald-700" />Eco checkout</h1><p className="mt-1 text-xs text-slate-500">Live pricing, stock validation and responsible delivery choices</p></header>
        <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <PackagingSelector currency={quote.data.currency} options={quote.data.packagingOptions} selectedId={selectedPackaging} onSelect={(option) => setPackagingId(option.id)} />
            <GreenLogisticsSelector currency={quote.data.currency} options={quote.data.deliveryOptions} selectedId={selectedDelivery} onSelect={(option) => setDeliveryId(option.id)} />
            <CheckoutAddressForm value={address} errors={errors} onChange={setAddress} />
            <PaymentMethodPanel totalCents={quote.data.totalCents} currency={quote.data.currency} pending={place.isPending} />
            {place.error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{place.error.message}</p> : null}
          </div>
          <div className="lg:col-span-5"><div className="sticky top-6"><CheckoutSummary quote={quote.data} /></div></div>
        </form>
      </div>
    </main>
  );
}

function normalizeAddress(value: AddressFormValues): DeliveryAddress {
  return { fullName: value.fullName, addressLine1: value.addressLine1, ...(value.addressLine2.trim() ? { addressLine2: value.addressLine2 } : {}), city: value.city, ...(value.region.trim() ? { region: value.region } : {}), postalCode: value.postalCode, countryCode: value.countryCode, ...(value.phone.trim() ? { phone: value.phone } : {}) };
}

function fieldErrors(errors: Record<string, string[] | undefined>): AddressErrors {
  return Object.fromEntries(Object.entries(errors).map(([key, messages]) => [key, messages?.[0] ?? "Invalid value"])) as AddressErrors;
}
