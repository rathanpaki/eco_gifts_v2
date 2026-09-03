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
import { signIn, signInWithGoogle } from "@/services/auth.service";
import type { SessionUser } from "@/types/auth";
import { GoogleMark } from "./google-mark";

export function SignInScreen({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { error, pending, run } = useAuthAction();
  const [rememberMe, setRememberMe] = useState(true);
  const finish = (user: SessionUser) => {
    queryClient.clear();
    router.replace(destination(user, nextPath));
    router.refresh();
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const user = await run(() =>
      signIn({
        email: String(values.email),
        password: String(values.password),
        rememberMe,
      }),
    );
    if (user) finish(user);
  };
  const google = async () => {
    const user = await run(() => signInWithGoogle(rememberMe));
    if (user) finish(user);
  };
  return (
    <main className="sign-in-layout">
      <AuthSplitBrand />
      <section className="auth-split-panel">
        <AuthLogo />
        <div className="auth-form-content">
          <h1 className="serif">Welcome back</h1>
          <p className="auth-lead">
            Track gifts, saved details, rewards, and verified impact receipts.
          </p>
          <AuthTabs active="sign-in" />
          <form className="auth-main-form" onSubmit={submit} noValidate>
            <AuthField
              autoComplete="email"
              label="Email"
              name="email"
              placeholder="sarah@example.com"
              type="email"
            />
            <AuthField
              autoComplete="current-password"
              label="Password"
              name="password"
              placeholder="••••••••••"
              type="password"
            />
            <div className="remember-row">
              <label>
                <input checked={rememberMe} name="remember" onChange={(event) => setRememberMe(event.target.checked)} type="checkbox" /> Remember me
              </label>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
            <AuthNotice>{error}</AuthNotice>
            <AuthButton disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
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
          <Link className="auth-account-link" href="/sign-up">New to EcoGifts? Create an account →</Link>
          <p className="auth-legal">
            Your bag stays saved while you sign in. We never share account activity.
          </p>
        </div>
      </section>
    </main>
  );
}

function destination(user: SessionUser, next?: string) {
  if (user.role === "ADMIN") return "/admin";
  if (
    next?.startsWith("/") &&
    !next.startsWith("//") &&
    !next.startsWith("/admin")
  )
    return next;
  return "/account";
}
