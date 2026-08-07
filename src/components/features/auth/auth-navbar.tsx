import Link from "next/link";
import Image from "next/image";

export function AuthNavbar() {
  return (
    <header className="auth-navbar">
      <Link className="auth-logo" href="/"><Image alt="" height={22} src="/images/auth/leaf.svg" width={22} />EcoGifts</Link>
      <nav aria-label="Main navigation">
        <Link href="/">Home</Link><Link href="/#shop">Shop</Link><Link href="/#occasions">Occasions</Link>
        <Link href="/#customize">Customize</Link><Link href="/#sustainability">Sustainability</Link><Link href="/#about">About</Link>
      </nav>
      <Link className="auth-nav-link" href="/sign-in">Sign in</Link>
    </header>
  );
}
