import Image from "next/image";
import Link from "next/link";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import { loadAdminProducts } from "@/services/admin-products.service";
import type { AdminProduct, AdminProductPage } from "@/types/admin-product";
import styles from "@/components/features/admin-products/admin-products.module.css";

type Query = Record<string, string | string[] | undefined>;

export async function AdminProductsPage({ query }: { query: Query }) {
  const result = await loadAdminProducts(query);
  if (result.kind === "unavailable") return <ProductsState />;
  const filter = typeof query.filter === "string" ? query.filter : "all";
  const search = typeof query.search === "string" ? query.search : "";
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div><h1>Products</h1><p>Manage availability, personalization, and eco evidence.</p></div>
        <Link className={styles.primary} href="/admin/products/new">Add product</Link>
      </header>
      <Metrics page={result.page} />
      <div className={styles.tools}>
        <nav aria-label="Product filters">
          {filters.map((item) => <FilterLink current={filter} item={item} search={search} key={item.value} />)}
        </nav>
        <form action="/admin/products" className={styles.search}>
          {filter !== "all" && <input name="filter" type="hidden" value={filter} />}
          <label htmlFor="product-search">Search products</label>
          <input defaultValue={search} id="product-search" name="search" placeholder="Name, SKU, or category" type="search" />
          <button type="submit">Search</button>
        </form>
      </div>
      <ProductsTable page={result.page} query={query} />
    </section>
  );
}

function Metrics({ page }: { page: AdminProductPage }) {
  const metrics = [
    ["Active products", page.metrics.active, "green"],
    ["Low stock", page.metrics.lowStock, "peach"],
    ["Drafts", page.metrics.drafts, "subtle"],
    ["Missing eco evidence", page.metrics.missingEcoEvidence, "plain"],
  ] as const;
  return <div className={styles.metrics}>{metrics.map(([label, value, tone]) => (
    <article className={styles[tone]} key={label}><span>{label}</span><strong>{value}</strong></article>
  ))}</div>;
}

function ProductsTable({ page, query }: { page: AdminProductPage; query: Query }) {
  if (!page.items.length) return <div className={styles.empty}><h2>No products found</h2><p>Create a product or adjust the current search and filters.</p></div>;
  return <>
    <div className={styles.tableWrap}><table>
      <thead><tr><th>Product</th><th>Stock</th><th>Price</th><th>Eco score</th><th>Status</th><th>Updated</th></tr></thead>
      <tbody>{page.items.map((product) => <ProductRow product={product} key={product.id} />)}</tbody>
    </table></div>
    {page.nextCursor && <Link className={styles.next} href={nextHref(query, page.nextCursor)}>Next page</Link>}
  </>;
}

function ProductRow({ product }: { product: AdminProduct }) {
  const image = product.images[0];
  const status = product.status === "archived" ? "Archived" : product.status === "draft" ? "Draft" : product.stockQuantity === 0 ? "Out of stock" : product.lowStock ? "Low stock" : "Active";
  const tone = status === "Active" ? "success" : status === "Out of stock" || status === "Archived" ? "error" : "warning";
  return <tr>
    <td><Link className={styles.product} href={`/admin/products/${product.id}/edit`}>
      {image ? <Image alt={image.alt} height={48} src={image.url} unoptimized={shouldBypassImageOptimization(image.url)} width={48} /> : <span className={styles.noImage}>No image</span>}
      <span><strong>{product.name}</strong><small>{product.sku}</small></span>
    </Link></td>
    <td>{product.stockQuantity}</td>
    <td>{money(product.priceCents, product.currency)}</td>
    <td className={styles.score}>{product.ecoScore}</td>
    <td><span className={`${styles.badge} ${styles[tone]}`}><i />{status}</span></td>
    <td>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(product.updatedAt))}</td>
  </tr>;
}

function FilterLink({ current, item, search }: { current: string; item: typeof filters[number]; search: string }) {
  const params = new URLSearchParams();
  if (item.value !== "all") params.set("filter", item.value);
  if (search) params.set("search", search);
  return <Link aria-current={current === item.value ? "page" : undefined} className={current === item.value ? styles.filterActive : styles.filter} href={`/admin/products?${params}`}>{item.label}</Link>;
}

function ProductsState() { return <section className={styles.state} role="alert"><h1>Products unavailable</h1><p>The live catalog could not be loaded. Please try again shortly.</p></section>; }
function money(cents: number, currency: string) { return new Intl.NumberFormat("en", { style: "currency", currency }).format(cents / 100); }
function nextHref(query: Query, cursor: string) { const params = new URLSearchParams(); Object.entries(query).forEach(([key, value]) => { if (typeof value === "string" && key !== "cursor") params.set(key, value); }); params.set("cursor", cursor); return `/admin/products?${params}`; }
const filters = [{ label: "All products", value: "all" }, { label: "Active", value: "active" }, { label: "Draft", value: "draft" }, { label: "Low stock", value: "low-stock" }] as const;
