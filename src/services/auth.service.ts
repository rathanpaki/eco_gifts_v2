"use client";

import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut as clearClientAuth,
  updateProfile,
  type User,
} from "firebase/auth";
import { z } from "zod";
import { getFirebaseAuth } from "@/lib/firebase-client";
import { sessionUserSchema } from "@/lib/schemas/auth.schema";
import type { PasswordResetValues, SessionUser, SignInValues, SignUpValues } from "@/types/auth";

const email = z.string().trim().email("Enter a valid email address.");
export const signInSchema = z.object({ email, password: z.string().min(1, "Enter your password.") });
export const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email,
  password: z.string().min(12, "Use at least 12 characters.").regex(/\d/, "Include at least one number."),
  marketingOptIn: z.boolean(),
});
export const passwordResetSchema = z.object({ email });

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, "");

async function establishSession(user: User, marketingOptIn?: boolean): Promise<SessionUser> {
  const idToken = await user.getIdToken();
  const csrfResponse = await fetch(`${apiBaseUrl}/api/auth/csrf`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!csrfResponse.ok) throw new Error("We could not initialize a secure session. Please try again.");
  const { csrfToken } = z.object({ csrfToken: z.string().min(32) }).parse(await csrfResponse.json());
  const response = await fetch(`${apiBaseUrl}/api/auth/session`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
    body: JSON.stringify({ idToken, marketingOptIn }),
  });
  if (!response.ok) throw new Error("We could not start your secure session. Please try again.");
  return sessionUserSchema.parse((await response.json()).user);
}

async function exchangeAndClear(user: User, marketingOptIn?: boolean): Promise<SessionUser> {
  try {
    return await establishSession(user, marketingOptIn);
  } finally {
    await clearClientAuth(await getFirebaseAuth());
  }
}

export async function signIn(values: SignInValues): Promise<SessionUser> {
  const data = signInSchema.parse(values);
  const auth = await getFirebaseAuth();
  const credential = await signInWithEmailAndPassword(auth, data.email, data.password);
  return exchangeAndClear(credential.user);
}

export async function signUp(values: SignUpValues): Promise<SessionUser> {
  const data = signUpSchema.parse(values);
  const auth = await getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  await updateProfile(credential.user, { displayName: data.fullName });
  await sendEmailVerification(credential.user);
  return exchangeAndClear(credential.user, data.marketingOptIn);
}

export async function signInWithGoogle(): Promise<SessionUser> {
  const auth = await getFirebaseAuth();
  const credential = await signInWithPopup(auth, new GoogleAuthProvider());
  return exchangeAndClear(credential.user);
}

export async function requestPasswordReset(values: PasswordResetValues): Promise<true> {
  const { email: accountEmail } = passwordResetSchema.parse(values);
  await sendPasswordResetEmail(await getFirebaseAuth(), accountEmail);
  return true;
}
