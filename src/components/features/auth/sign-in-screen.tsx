"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthButton, AuthField, AuthNotice } from "@/components/features/auth/auth-primitives";
import { useAuthAction } from "@/hooks/use-auth-action";
import { signIn, signInWithGoogle } from "@/services/auth.service";
import type { SessionUser } from "@/types/auth";

export function SignInScreen({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { error, pending, run } = useAuthAction();
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const user = await run(() => signIn({ email: String(values.email), password: String(values.password) }));
    if (user) {
      queryClient.clear();
      router.push(destination(user, nextPath));
    }
  };
  const google = async () => {
    const user = await run(signInWithGoogle);
    if (user) {
      queryClient.clear();
      router.push(destination(user, nextPath));
    }
  };
  return (
    <main className="sign-in-layout">
      <aside className="brand-story">
        <Link className="auth-logo" href="/"><Image alt="" height={22} src="/images/auth/leaf.svg" width={22} />EcoGifts</Link>
        <div className="brand-quote"><p className="serif">“The saved addresses and gift notes make thoughtful gifting feel effortless.”</p><small>Maya Thompson · Verified customer</small></div>
      </aside>
      <section className="sign-in-panel">
        <div><h1 className="serif">Welcome back</h1><p>Sign in to view orders, saved gifts, and your impact.</p></div>
        <form onSubmit={submit} noValidate>
          <AuthField autoComplete="email" label="Email address" name="email" placeholder="you@example.com" type="email" />
          <AuthField autoComplete="current-password" label="Password" name="password" placeholder="••••••••••" type="password" />
          <div className="remember-row"><span>In-memory sign-in</span><Link href="/forgot-password">Forgot password?</Link></div>
          <AuthNotice>{error}</AuthNotice><AuthButton disabled={pending}>{pending ? "Signing in…" : "Sign in"}</AuthButton>
        </form>
        <div className="auth-divider"><span />or<span /></div>
        <button className="auth-secondary" disabled={pending} onClick={google} type="button">Continue with Google</button>
        <Link className="guest-link" href="/">Continue as guest</Link>
        <p className="auth-switch">New to EcoGifts? <Link href="/sign-up">Create an account</Link></p>
      </section>
    </main>
  );
}

function destination(user: SessionUser, next?: string) {
  if (user.role === "ADMIN") return "/admin";
  if (next?.startsWith("/") && !next.startsWith("//") && !next.startsWith("/admin")) return next;
  return "/";
}
