"use client";

import { useState } from "react";
import { PhoneVerificationCard } from "./phone-verification-card";

export function DashboardPhoneVerification({
  initialPhone,
}: {
  initialPhone: string;
}) {
  const [phone, setPhone] = useState(initialPhone);
  return (
    <section className="mt-6 rounded-[18px] border border-[#dbcbbb] bg-[#f7eee7] p-5">
      <h2 className="serif text-xl">Verify your phone before checkout</h2>
      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
        Add the number you will use for delivery. You only need to verify it once unless it changes.
      </p>
      <label className="mt-4 block max-w-md text-xs font-semibold">
        Phone number
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+94 77 123 4567"
          className="mt-2 h-11 w-full rounded-[10px] border border-[var(--line)] bg-[var(--page)] px-3 text-sm font-normal"
        />
      </label>
      <div className="mt-4 max-w-md">
        <PhoneVerificationCard compact phone={phone} />
      </div>
    </section>
  );
}
