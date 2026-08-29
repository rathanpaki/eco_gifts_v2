import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";

export default function ProductDetailLoading() {
  return (
    <>
      <StorefrontHeader />
      <LogoDrawLoader label="Loading product details" size="page" />
    </>
  );
}
