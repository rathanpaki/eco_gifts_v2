"use client";

import { useEffect, useRef, useState } from "react";
import { deliveryAddressSchema } from "@/lib/schemas/checkout.schema";
import type { AccountAddress } from "@/types/account-profile";
import type { DeliveryAddress } from "@/types/checkout";
import type { AddressErrors, AddressFormValues } from "./checkout-address-form";
import { fieldErrors, normalizeAddress } from "./checkout-address-values";

const EMPTY_ADDRESS: AddressFormValues = { fullName: "", addressLine1: "", addressLine2: "", city: "", region: "", postalCode: "", countryCode: "GB", phone: "" };

function toForm(address: AccountAddress): AddressFormValues {
  return {
    fullName: address.fullName,
    addressLine1: address.line1,
    addressLine2: address.line2 ?? "",
    city: address.city,
    region: address.region ?? "",
    postalCode: address.postalCode,
    countryCode: address.countryCode,
    phone: address.phone ?? "",
  };
}

export function useCheckoutAddress(addresses: AccountAddress[]) {
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<AddressErrors>({});
  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current || !addresses.length) return;
    const preferred = addresses.find((item) => item.primary) ?? addresses[0];
    initialized.current = true;
    setSelectedAddressId(preferred.id);
    setAddress(toForm(preferred));
  }, [addresses]);
  function change(value: AddressFormValues) {
    setSelectedAddressId(undefined);
    setAddress(value);
  }
  function select(value: AccountAddress) {
    setSelectedAddressId(value.id);
    setAddress(toForm(value));
    setErrors({});
  }
  function parse(): DeliveryAddress | null {
    const result = deliveryAddressSchema.safeParse(normalizeAddress(address));
    if (!result.success) {
      setErrors(fieldErrors(result.error.flatten().fieldErrors));
      return null;
    }
    setErrors({});
    return result.data;
  }
  return { address, errors, selectedAddressId, change, select, parse };
}