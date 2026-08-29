import type { DeliveryAddress } from "@/types/checkout";
import type { AddressErrors, AddressFormValues } from "./checkout-address-form";

export function normalizeAddress(value: AddressFormValues): DeliveryAddress {
  return {
    fullName: value.fullName,
    addressLine1: value.addressLine1,
    ...(value.addressLine2.trim() ? { addressLine2: value.addressLine2 } : {}),
    city: value.city,
    ...(value.region.trim() ? { region: value.region } : {}),
    postalCode: value.postalCode,
    countryCode: value.countryCode,
    phone: value.phone,
  };
}

export function fieldErrors(
  errors: Record<string, string[] | undefined>,
): AddressErrors {
  return Object.fromEntries(
    Object.entries(errors).map(([key, messages]) => [
      key,
      messages?.[0] ?? "Invalid value",
    ]),
  ) as AddressErrors;
}
