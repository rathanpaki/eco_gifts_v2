import { ProductCard } from "./product-card";
import type { PublicProduct } from "@/types/catalog";

export function ProductGrid({ products }: { products: PublicProduct[] }) {
  return (
    <section aria-label="Gifts" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} eager={index === 0} />
      ))}
    </section>
  );
}
