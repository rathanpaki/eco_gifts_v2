import { StorefrontHeader } from "@/components/features/storefront/storefront-header";
import { LogoDrawLoader } from "@/components/ui/logo-draw-loader";

export function CatalogSkeleton() {
  return (
    <>
      <StorefrontHeader />
      <LogoDrawLoader label="Loading gifts" size="page" />
    </>
  );
}
