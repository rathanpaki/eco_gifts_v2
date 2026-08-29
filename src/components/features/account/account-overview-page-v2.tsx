"use client";

import Link from "next/link";
import { useAccountSession } from "@/components/providers/account-session-provider";
import { useEcoImpactSummary } from "@/hooks/use-eco-contributions";
import { useOrderHistory } from "@/hooks/use-order-history";
import { useWishlist } from "@/hooks/use-wishlist";
import { RecentOrdersCarousel } from "./recent-orders-carousel";
import { useAccountProfile } from "@/hooks/use-account-profile";
import { DashboardPhoneVerification } from "@/components/features/profile/dashboard-phone-verification";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";

export function AccountOverviewPage() {
  const user = useAccountSession();
  const history = useOrderHistory(user.uid);
  const impact = useEcoImpactSummary();
  const wishlist = useWishlist();
  const profile = useAccountProfile();
  if (
    history.isLoading ||
    impact.isLoading ||
    wishlist.isLoading ||
    profile.isPending
  )
    return <LogoDrawLoader label="Loading your dashboard" />;
  const orders = history.data?.pages.flatMap((page) => page.items) ?? [];
  const active = orders.filter(
    (order) => !["delivered", "cancelled"].includes(order.fulfillmentStatus),
  );
  const recentOrders = (active.length ? active : orders).slice(0, 6);
  const name =
    user.displayName?.trim().split(/\s+/)[0] ??
    user.email?.split("@")[0] ??
    "there";
  return (
    <section aria-labelledby="account-title">
      <header>
        <p className="text-[11px] font-semibold uppercase text-[var(--brand)] sm:hidden">Your EcoGifts account</p>
        <h1 id="account-title" className="serif mt-2 text-[31px] leading-none sm:mt-0 sm:text-[40px]">
          Good morning, {name}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Here’s what’s happening with your gifts.
        </p>
      </header>

      {profile.data && !profile.data.phoneVerified ? (
        <DashboardPhoneVerification
          initialPhone={profile.data.phone ?? ""}
          key={profile.data.phone ?? "new-phone"}
        />
      ) : null}

      <section className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-[var(--ink)] p-4 text-white sm:mt-6 sm:gap-4 sm:bg-transparent sm:p-0 sm:text-[var(--ink)]">
        <Metric
          label="Active orders"
          value={history.isLoading ? "—" : active.length}
          tone="green"
        />
        <Metric
          label="Saved gifts"
          value={wishlist.isLoading ? "—" : (wishlist.data?.length ?? 0)}
        />
        <Metric
          label="EcoPoints"
          value={impact.isLoading ? "—" : (impact.data?.rewardPoints ?? 0)}
          tone="peach"
        />
      </section>

      <section className="mt-6">
        <RecentOrdersCarousel orders={recentOrders} />
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <article className="min-h-28 rounded-2xl bg-[var(--subtle)] p-4 sm:min-h-32 sm:p-5">
          <h2 className="serif text-lg">Saved gift profiles</h2>
          <p className="mt-3 text-xs leading-4 text-[var(--muted)]">
            Keep recipients, occasions, and gift preferences together.
          </p>
          <Link
            href="/account/gift-profiles"
            className="mt-3 inline-block text-xs font-semibold text-[var(--brand)]"
          >
            View details
          </Link>
        </article>
        <article className="min-h-28 rounded-2xl bg-[#eef4ee] p-4 sm:min-h-32 sm:p-5">
          <h2 className="serif text-lg">Your impact</h2>
          <p className="mt-3 text-xs leading-4 text-[var(--muted)]">
            {impact.data?.contributions.length ?? 0} verified contributions
            <br />
            {impact.data?.trees.length ?? 0} tree records supported
          </p>
          <Link
            href="/account/impact"
            className="mt-3 inline-block text-xs font-semibold text-[var(--brand)]"
          >
            View details
          </Link>
        </article>
      </section>
    </section>
  );
}

function Metric({
  label,
  tone,
  value,
}: {
  label: string;
  tone?: "green" | "peach";
  value: number | string;
}) {
  const background =
    tone === "green"
      ? "sm:bg-[#eef4ee]"
      : tone === "peach"
        ? "sm:bg-[#f7eee7]"
        : "sm:bg-[var(--subtle)]";
  return (
    <article className={`flex h-[72px] min-w-0 flex-col justify-center rounded-2xl p-0 sm:h-[102px] sm:p-5 ${background}`}>
      <p className="truncate text-[10px] text-white/80 sm:text-[11px] sm:text-[var(--muted)]">{label}</p>
      <p className="serif mt-2 text-[23px] leading-none sm:mt-3 sm:text-[26px]">{value}</p>
    </article>
  );
}

