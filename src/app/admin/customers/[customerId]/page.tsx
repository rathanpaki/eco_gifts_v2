import type { Metadata } from "next";
import { CustomerDetailPage } from "@/components/features/admin-customers/customer-detail-page";

export const metadata: Metadata = {
  title: "Customer | EcoGifts Admin",
  description: "Review customer fulfillment, consent, and support records.",
};

export default async function CustomerDetailRoute({
  params,
}: PageProps<"/admin/customers/[customerId]">) {
  const { customerId } = await params;
  return <CustomerDetailPage customerId={customerId} />;
}
