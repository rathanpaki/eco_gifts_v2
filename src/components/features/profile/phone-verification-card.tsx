"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  useAccountProfile,
  useRequestPhoneVerification,
  useVerifyPhoneNumber,
} from "@/hooks/use-account-profile";

export function PhoneVerificationCard({
  phone,
  compact = false,
}: {
  phone: string;
  compact?: boolean;
}) {
  const profile = useAccountProfile();
  const request = useRequestPhoneVerification();
  const verify = useVerifyPhoneNumber();
  const [code, setCode] = useState("");
  const normalized = normalize(phone);
  const verified =
    Boolean(normalized) &&
    profile.data?.phoneVerified === true &&
    normalize(profile.data.phone ?? "") === normalized;
  const requested =
    request.data?.phone === phone.trim() && !request.data.alreadyVerified;
  const validPhone = /^\+?[0-9 ()-]{7,24}$/.test(phone.trim());

  if (verified) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-[#eef4ee] px-4 py-3 text-sm text-[var(--brand)]">
        <CheckCircle2 aria-hidden="true" size={18} />
        <span className="font-semibold">Phone number verified</span>
      </div>
    );
  }

  return (
    <section
      aria-label="Phone verification"
      className={compact ? "rounded-xl bg-[#f7eee7] p-4" : "rounded-2xl border border-[var(--line)] p-5"}
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 shrink-0 text-[var(--brand)]" size={20} />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold">Verify your phone number</h3>
          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
            Verification is required once for this number before an order can be placed.
          </p>
        </div>
      </div>
      {!requested ? (
        <button
          type="button"
          disabled={!validPhone || request.isPending}
          onClick={() => request.mutate(phone.trim())}
          className="mt-4 h-10 rounded-[10px] bg-[var(--brand)] px-4 text-xs font-semibold text-white disabled:opacity-50"
        >
          {request.isPending ? "Sending code..." : "Send verification code"}
        </button>
      ) : (
        <div className="mt-4">
          <label className="text-xs font-semibold">
            Six-digit code
            <div className="mt-2 flex flex-wrap gap-2">
              <input
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                autoComplete="one-time-code"
                className="h-11 min-w-0 flex-1 rounded-[10px] border border-[var(--line)] bg-[var(--page)] px-3 text-sm tracking-[0.28em]"
                aria-describedby="phone-code-help"
              />
              <button
                type="button"
                disabled={code.length !== 6 || verify.isPending}
                onClick={() => verify.mutate({ phone: phone.trim(), code })}
                className="h-11 rounded-[10px] bg-[var(--brand)] px-4 text-xs font-semibold text-white disabled:opacity-50"
              >
                {verify.isPending ? "Verifying..." : "Verify"}
              </button>
            </div>
          </label>
          <p id="phone-code-help" className="mt-2 text-[11px] text-[var(--muted)]">
            For now, use 123456.
          </p>
        </div>
      )}
      {request.error || verify.error ? (
        <p className="mt-3 text-xs text-red-700" role="alert">
          {request.error?.message ?? verify.error?.message}
        </p>
      ) : null}
    </section>
  );
}

function normalize(value: string) {
  return value.replace(/[\s()-]/g, "");
}
