import Link from "next/link";

export function AuthTabs({ active }: { active: "sign-in" | "sign-up" }) {
  return (
    <nav className="auth-tabs" aria-label="Authentication">
      <Link
        href="/sign-in"
        aria-current={active === "sign-in" ? "page" : undefined}
        className={active === "sign-in" ? "auth-tab-active" : ""}
      >
        Sign in
      </Link>
      <Link
        href="/sign-up"
        aria-current={active === "sign-up" ? "page" : undefined}
        className={active === "sign-up" ? "auth-tab-active" : ""}
      >
        Create account
      </Link>
    </nav>
  );
}
