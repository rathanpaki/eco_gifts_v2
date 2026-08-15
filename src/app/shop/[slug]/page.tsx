import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/features/product-detail/product-detail-page";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { getPublicProductBySlug } from "@/services/catalog.service";

type ShopProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ShopProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);
  if (!product) return { title: "Product unavailable | EcoGifts" };
  return {
    title: `${product.name} | EcoGifts`,
    description: product.shortDescription,
  };
}

export default async function ShopProductPage({ params }: ShopProductPageProps) {
  const { slug } = await params;
  const [product, cookieStore] = await Promise.all([
    getPublicProductBySlug(slug),
    cookies(),
  ]);

  if (!product) notFound();

  return (
    <>
      <StorefrontHeader />
      <ProductDetailPage
        product={product}
        signedIn={cookieStore.has(process.env.SESSION_COOKIE_NAME ?? "session")}
      />
    </>
  );
}
