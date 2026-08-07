import { SignInScreen } from "@/components/features/auth/sign-in-screen";

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const { next } = await searchParams;
  return <SignInScreen nextPath={typeof next === "string" ? next : undefined} />;
}
