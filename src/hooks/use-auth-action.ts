"use client";

import { useCallback, useState } from "react";
import { FirebaseError } from "firebase/app";
import { ZodError } from "zod";

const firebaseMessages: Record<string, string> = {
  "auth/email-already-in-use": "An account already uses this email. Sign in or reset its password.",
  "auth/invalid-api-key": "Firebase Authentication is not configured correctly for this site.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/network-request-failed": "Firebase could not be reached. Check your connection and try again.",
  "auth/operation-not-allowed": "Email and password registration is not enabled for this Firebase project.",
  "auth/popup-blocked": "Allow pop-ups to continue with Google.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  "auth/too-many-requests": "Too many attempts were made. Wait a moment and try again.",
  "auth/weak-password": "The password does not satisfy the Firebase password policy.",
};

function readableError(error: unknown) {
  if (error instanceof ZodError) return error.issues[0]?.message ?? "Check the highlighted fields.";
  if (error instanceof FirebaseError) return firebaseMessages[error.code] ?? "Authentication failed. Please try again.";
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

export function useAuthAction() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const run = useCallback(async <T,>(action: () => Promise<T>): Promise<T | undefined> => {
    setPending(true);
    setError(undefined);
    try {
      return await action();
    } catch (cause) {
      setError(readableError(cause));
      return undefined;
    } finally {
      setPending(false);
    }
  }, []);
  return { error, pending, run };
}
