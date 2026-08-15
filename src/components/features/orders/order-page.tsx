"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrder } from "@/hooks/use-order";
import { OrderConfirmationView } from "@/components/features/checkout/order-confirmation-view";

export function OrderPage({ orderId, userId }: { orderId: string; userId: string }) {
  const router = useRouter();
  const order = useOrder(orderId, userId);
  if (order.isLoading) {
    return <main className="min-h-[60vh] bg-slate-50 px-5 py-12"><div className="mx-auto h-96 max-w-2xl animate-pulse rounded-2xl bg-slate-200" /></main>;
  }
  if (order.isError || !order.data) {
    return <main className="grid min-h-[60vh] place-items-center bg-slate-50 px-5"><section className="max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center"><h1 className="text-xl font-bold">Order unavailable</h1><p className="mt-2 text-sm text-slate-600">{order.error?.message ?? "This order could not be loaded."}</p><div className="mt-5 flex justify-center gap-3"><button type="button" onClick={() => void order.refetch()} className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Try again</button><Link href="/shop" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Shop</Link></div></section></main>;
  }
  return <div className="min-h-screen bg-slate-50 px-4 py-10"><OrderConfirmationView order={order.data} onContinueShopping={() => router.push("/shop")} /></div>;
}
