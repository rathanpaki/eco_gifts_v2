"use client";

import Link from "next/link";
import { ArrowRight, Package, Sparkles, Trees } from "lucide-react";
import { useAccountSession } from "@/components/providers/account-session-provider";
import { TreeTrackerCard } from "@/components/features/profile/tree-tracker-card";
import { useEcoImpactSummary, useRedeemRewardVoucher } from "@/hooks/use-eco-contributions";
import { useOrderHistory } from "@/hooks/use-order-history";
import { formatMoney } from "@/lib/format-money";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";

export function AccountOverviewPage() {
  const user = useAccountSession();
  const history = useOrderHistory(user.uid);
  const impact = useEcoImpactSummary();
  const redeem = useRedeemRewardVoucher();
  if (history.isLoading || impact.isLoading)
    return <LogoDrawLoader label="Loading your dashboard" />;
  const orders = history.data?.pages.flatMap((page) => page.items) ?? [];
  const activeOrders = orders.filter(
    (order) => !["delivered", "cancelled"].includes(order.fulfillmentStatus),
  );
  const name = user.email?.split("@")[0] ?? "there";

  return (
    <section aria-labelledby="account-title">
      <header className="border-b border-[var(--line)] pb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
          Your account
        </p>
        <h1 id="account-title" className="serif mt-2 text-4xl sm:text-5xl">
          Good to see you, {name}.
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Keep track of your thoughtful gifts and the impact they create.
        </p>
      </header>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Package} label="Active orders" value={activeOrders.length} />
        <StatCard icon={Trees} label="Tree records" value={impact.data?.trees.length ?? 0} />
        <StatCard icon={Sparkles} label="EcoPoints" value={impact.data?.rewardPoints ?? 0} />
      </div>

      <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-2xl border border-[var(--line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Recent orders</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Your latest orders and delivery status.
              </p>
            </div>
            <Link className="text-sm font-semibold text-[var(--brand)]" href="/account/orders">
              View all
            </Link>
          </div>

          {history.isError ? <p className="mt-6 text-sm text-red-700">Orders could not be loaded.</p> : null}
          {!history.isLoading && !history.isError && !orders.length ? (
            <EmptyOrders />
          ) : null}
          {orders.slice(0, 3).map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] p-4 transition hover:bg-[var(--subtle)]"
            >
              <div>
                <p className="text-sm font-semibold">{order.orderNumber}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {order.totalQuantity} item{order.totalQuantity === 1 ? "" : "s"} · {order.fulfillmentStatus.replaceAll("_", " ")}
                </p>
              </div>
              <span className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                {formatMoney(order.totalCents, order.currency)} <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </section>

        <div id="impact">
          <TreeTrackerCard
            rewardPoints={impact.data?.rewardPoints ?? 0}
            trees={impact.data?.trees ?? []}
            onRedeemVoucher={() => {
              if (!redeem.isPending) redeem.mutate();
            }}
          />
          {redeem.data ? <p className="mt-3 rounded-xl bg-[var(--subtle)] p-3 text-sm">Voucher {redeem.data.code} is ready to use.</p> : null}
          {redeem.error ? <p className="mt-3 text-sm text-red-700">{redeem.error.message}</p> : null}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: number }) {
  return <article className="rounded-2xl border border-[var(--line)] bg-white p-5"><Icon className="size-5 text-[var(--brand)]" /><p className="mt-5 text-3xl font-bold">{value}</p><p className="mt-1 text-sm text-[var(--muted)]">{label}</p></article>;
}

function EmptyOrders() {
  return <div className="mt-6 rounded-xl bg-[var(--subtle)] p-5"><p className="text-sm font-semibold">Your first thoughtful gift is waiting.</p><Link href="/shop" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">Explore gifts <ArrowRight size={16} /></Link></div>;
}
