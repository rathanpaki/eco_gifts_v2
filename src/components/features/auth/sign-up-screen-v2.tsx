"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AuthButton,
  AuthField,
  AuthNotice,
} from "@/components/features/auth/auth-primitives";
import {
  AuthLogo,
  AuthSplitBrand,
} from "@/components/features/auth/auth-split-brand";
import { AuthTabs } from "@/components/features/auth/auth-tabs";
import { useAuthAction } from "@/hooks/use-auth-action";
import { signInWithGoogle, signUp } from "@/services/auth.service";
import type { SessionUser } from "@/types/auth";
import { GoogleMark } from "./google-mark";

export function SignUpScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { error, pending, run } = useAuthAction();
  const [accepted, setAccepted] = useState(false);
  const [termsError, setTermsError] = useState<string>();
  const finish = (user: SessionUser) => {
    queryClient.clear();
    router.replace(user.role === "ADMIN" ? "/admin" : "/account");
    router.refresh();
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!accepted) {
      setTermsError("Accept the Terms and Privacy Policy to continue.");
      return;
    }
    setTermsError(undefined);
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const created = await run(() =>
      signUp({
        fullName: String(values.fullName),
        email: String(values.email),
        password: String(values.password),
        marketingOptIn: false,
      }),
    );
    if (created) finish(created);
  };
  const google = async () => {
    if (!accepted) {
      setTermsError("Accept the Terms and Privacy Policy to continue.");
      return;
    }
    const user = await run(signInWithGoogle);
    if (user) finish(user);
  };
  return (
    <main className="sign-in-layout">
      <AuthSplitBrand />
      <section className="auth-split-panel">
        <AuthLogo />
        <div className="auth-form-content auth-form-content--signup">
          <h1 className="serif">Create your account</h1>
          <p className="auth-lead">
            Save addresses, track gifts, and keep verified impact receipts
            together.
          </p>
          <AuthTabs active="sign-up" />
          <form className="auth-main-form" onSubmit={submit} noValidate>
            <AuthField
              autoComplete="name"
              label="Full name"
              name="fullName"
              placeholder="Sarah James"
            />
            <AuthField
              autoComplete="email"
              label="Email address"
              name="email"
              placeholder="sarah@example.com"
              type="email"
            />
            <AuthField
              autoComplete="new-password"
              label="Create password"
              name="password"
              placeholder="••••••••••••"
              type="password"
            />
            <div className="terms-row">
              <label>
                <input
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  type="checkbox"
                />
                I agree to the Terms and Privacy Policy
              </label>
              <span>Marketing emails optional</span>
            </div>
            <AuthNotice>{termsError ?? error}</AuthNotice>
            <AuthButton disabled={pending}>
              {pending ? "Creating account…" : "Create account"}
            </AuthButton>
          </form>
          <div className="auth-divider">
            <span />
            or
            <span />
          </div>
          <button
            className="auth-secondary"
            disabled={pending}
            onClick={google}
            type="button"
          >
            <GoogleMark />
            Continue with Google
          </button>
          <p className="auth-legal">
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
