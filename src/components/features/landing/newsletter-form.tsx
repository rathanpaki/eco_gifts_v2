"use client";

import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/services/newsletter.service";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const mutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      setEmail("");
      toast.success("You’re on the list", { description: "We’ll send thoughtful gifting ideas and occasional EcoGifts offers." });
    },
    onError: (error) => toast.error("We couldn’t add your email", { description: error.message }),
  });
  function submit(event: FormEvent) { event.preventDefault(); mutation.mutate(email); }
  return <form onSubmit={submit} className="flex w-full max-w-md gap-2"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email address" className="h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-white/45" /><button disabled={mutation.isPending} className="rounded-lg bg-[#718872] px-5 text-sm font-semibold disabled:opacity-60">{mutation.isPending ? "Joining…" : "Subscribe"}</button><span className="sr-only" aria-live="polite">{mutation.isSuccess ? "Subscription saved." : mutation.isError ? "Subscription failed. Please try again." : ""}</span></form>;
}
