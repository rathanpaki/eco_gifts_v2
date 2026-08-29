import { ProductCard } from "./product-card";
import type { PublicProduct } from "@/types/catalog";

export function ProductGrid({
  products,
  columns = 4,
  signedIn = false,
}: {
  products: PublicProduct[];
  columns?: 3 | 4;
  signedIn?: boolean;
}) {
  const layout =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <section aria-label="Gifts" className={`-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 ${layout}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} eager={index === 0} signedIn={signedIn} />
      ))}
    </section>
  );
}
