"use client";

import Image from "next/image";
import Link from "next/link";
import { useStoreSettings } from "@/hooks/use-store-settings";

export function AuthLogo() {
  const store = useStoreSettings();
  return (
    <Link className="auth-logo" href="/">
      <Image alt="" height={22} src="/images/auth/leaf.svg" width={22} />
      {store.data?.storeName ?? "EcoGifts"}
    </Link>
  );
}

export function AuthSplitBrand() {
  return (
    <aside className="brand-story">
      <AuthLogo />
      <div className="brand-quote">
        <p className="serif">
          “The saved addresses and gift notes make thoughtful gifting feel
          effortless.”
        </p>
        <small>Maya Thompson · Verified customer</small>
      </div>
    </aside>
  );
}
