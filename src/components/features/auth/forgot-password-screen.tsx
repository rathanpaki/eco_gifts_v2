"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthButton, AuthField, AuthNotice } from "@/components/features/auth/auth-primitives";
import { AuthNavbar } from "@/components/features/auth/auth-navbar";
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
  return <main><AuthNavbar /><div className="recovery-page"><section className="recovery-card"><p className="auth-kicker">Password recovery</p><h1 className="serif">Reset your password</h1><p>Enter your account email. We’ll send a secure link if it matches an account.</p>
    <form onSubmit={submit} noValidate><AuthField autoComplete="email" hint="The link expires after 30 minutes." label="Email address" name="email" placeholder="you@example.com" type="email" />
      <AuthNotice>{error}</AuthNotice><AuthNotice tone="success">{sent ? "Check your email. We sent a reset link if an account exists." : undefined}</AuthNotice><AuthButton disabled={pending}>{pending ? "Sending link…" : "Send reset link"}</AuthButton>
    </form><p className="auth-switch"><Link href="/sign-in">Back to sign in</Link></p></section></div></main>;
}
