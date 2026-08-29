import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/features/product-detail/product-detail-page";
import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import {
  getPublicProductBySlug,
  getPublicProductReviews,
} from "@/services/catalog.service";

type ShopProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cartItemId?: string; customizationId?: string }>;
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

export default async function ShopProductPage({ params, searchParams }: ShopProductPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const product = await getPublicProductBySlug(slug);

  if (!product) notFound();
  const [cookieStore, reviews] = await Promise.all([
    cookies(),
    getPublicProductReviews(product.id),
  ]);

  return (
    <>
      <StorefrontHeader />
      <ProductDetailPage
        product={product}
        reviews={reviews}
        signedIn={cookieStore.has(process.env.SESSION_COOKIE_NAME ?? "session")}
        initialCartItemId={safeId(query.cartItemId)}
        initialCustomizationId={safeId(query.customizationId)}
      />
    </>
  );
}

function safeId(value?: string) {
  return value && /^[A-Za-z0-9_-]{1,128}$/.test(value) ? value : undefined;
}
