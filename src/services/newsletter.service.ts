import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { z } from "zod";
import { firestore } from "@/lib/firebase";

export const newsletterSchema = z.object({ email: z.email().max(254) });

export async function subscribeToNewsletter(email: string): Promise<void> {
  const value = newsletterSchema.parse({ email: email.trim().toLowerCase() });
  await addDoc(collection(firestore, "newsletterSubscriptions"), {
    email: value.email,
    consentSource: "landing-page-footer",
    subscribedAt: serverTimestamp(),
  });
}
