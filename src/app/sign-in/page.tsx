import { SignInScreen } from "@/components/features/auth/sign-in-screen-v2";
import { redirect } from "next/navigation";
import { optionalSession } from "@/services/server-api";

export default async function SignInPage({
  searchParams,
}: PageProps<"/sign-in">) {
  const user = await optionalSession();
  if (user) redirect(user.role === "ADMIN" ? "/admin" : "/account");
  const { next } = await searchParams;
  return (
    <SignInScreen nextPath={typeof next === "string" ? next : undefined} />
  );
}
