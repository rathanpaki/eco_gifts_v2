"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  AuthButton,
  AuthField,
  AuthNotice,
} from "@/components/features/auth/auth-primitives";
import {
  AuthLogo,
  AuthSplitBrand,
} from "@/components/features/auth/auth-split-brand";
import { useAuthAction } from "@/hooks/use-auth-action";
import { requestPasswordReset } from "@/services/auth.service";

export function ForgotPasswordScreen() {
  const { error, pending, run } = useAuthAction();
  const [sent, setSent] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email"));
    if (await run(() => requestPasswordReset({ email }))) setSent(true);
  };
  return (
    <main className="sign-in-layout">
      <AuthSplitBrand />
      <section className="auth-split-panel">
        <AuthLogo />
        <div className="auth-form-content recovery-split-content">
          <h1 className="serif">Reset your password</h1>
          <p className="auth-lead">
            Enter your account email. We’ll send a secure reset link if it
            matches an account.
          </p>
          <form className="auth-main-form" onSubmit={submit} noValidate>
            <AuthField
              autoComplete="email"
              label="Email address"
              name="email"
              placeholder="sarah@example.com"
              type="email"
            />
            <AuthNotice>{error}</AuthNotice>
            <AuthNotice tone="success">
              {sent
                ? "Check your email. We sent a reset link if an account exists."
                : undefined}
            </AuthNotice>
            <AuthButton disabled={pending}>
              {pending ? "Sending link…" : "Send reset link"}
            </AuthButton>
          </form>
          <p className="auth-recovery-note">
            After submitting, check your inbox and spam folder. Reset links
            expire automatically for your protection.
          </p>
          <p className="auth-legal">
            <Link href="/sign-in">Back to sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
