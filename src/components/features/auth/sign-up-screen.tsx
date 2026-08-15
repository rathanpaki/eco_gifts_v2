"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { AuthButton, AuthField, AuthNotice } from "@/components/features/auth/auth-primitives";
import { AuthNavbar } from "@/components/features/auth/auth-navbar";
import { useAuthAction } from "@/hooks/use-auth-action";
import { signUp } from "@/services/auth.service";
import type { SessionUser } from "@/types/auth";

const benefits = ["Track every order in plain language", "Reuse saved addresses securely", "See verified impact receipts over time"];

export function SignUpScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { error, pending, run } = useAuthAction();
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const created = await run(() => signUp({ fullName: String(values.fullName), email: String(values.email), password: String(values.password), marketingOptIn }));
    if (created) {
      queryClient.clear();
      router.push(destination(created));
    }
  };
  return <main><AuthNavbar /><div className="account-layout">
    <section className="account-form"><p className="auth-kicker">Create your account</p><h1 className="serif">Make thoughtful giving easier</h1><p>Save addresses, track gifts, and keep your impact history in one place.</p>
      <form onSubmit={submit} noValidate>
        <AuthField autoComplete="name" hint="Used for receipts and support." label="Full name" name="fullName" placeholder="Your name" />
        <AuthField autoComplete="email" hint="We’ll send a verification link." label="Email address" name="email" placeholder="you@example.com" type="email" />
        <AuthField autoComplete="new-password" hint="Use 12+ characters with a number." label="Create password" name="password" placeholder="••••••••••••" type="password" />
        <label className="marketing-consent"><input checked={marketingOptIn} onChange={(event) => setMarketingOptIn(event.target.checked)} type="checkbox" />Email me gift inspiration and product updates. Optional; unsubscribe anytime.</label>
        <AuthNotice>{error}</AuthNotice><AuthButton disabled={pending}>{pending ? "Creating account…" : "Create account"}</AuthButton>
      </form><p className="auth-switch"><Link href="/sign-in">Already have an account? Sign in</Link></p>
    </section>
    <aside className="account-aside"><section className="benefit-card"><p className="auth-kicker">Why create an account?</p><h2 className="serif">A clearer record of every thoughtful moment.</h2>{benefits.map((benefit) => <p className="benefit" key={benefit}><Check aria-hidden="true" size={18} />{benefit}</p>)}</section>
      <section className="recovery-preview"><p className="auth-kicker">Password recovery</p><h2 className="serif">Need a reset?</h2><p>Send a secure password-reset link to your account email.</p><Link href="/forgot-password">Reset your password</Link></section>
    </aside>
  </div></main>;
}

function destination(user: SessionUser) {
  return user.role === "ADMIN" ? "/admin" : "/";
}
