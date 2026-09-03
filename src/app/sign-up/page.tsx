import { SignUpScreen } from "@/components/features/auth/sign-up-screen-v2";
import { redirect } from "next/navigation";
import { optionalSession } from "@/services/server-api";

export default async function SignUpPage() {
  const user = await optionalSession();
  if (user) redirect(user.role === "ADMIN" ? "/admin" : "/account");
  return <SignUpScreen />;
}
