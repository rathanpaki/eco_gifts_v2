import type { AdminProduct, ProductFormValues, ProductWritePayload } from "@/types/admin-product";
import { STORE_CURRENCY } from "@/constants/store";

export function formValues(product?: AdminProduct): ProductFormValues {
  return {
    name: product?.name ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "",
    sku: product?.sku ?? "",
    price: product ? (product.priceCents / 100).toFixed(2) : "",
    currency: product?.currency ?? STORE_CURRENCY,
    stockQuantity: product ? String(product.stockQuantity) : "0",
    lowStockThreshold: product ? String(product.lowStockThreshold) : "5",
    ecoScore: product ? String(product.ecoScore) : "0",
    personalizationAvailable: product?.personalizationAvailable ?? false,
    materialsVerified: product?.ecoEvidence.materialsVerified ?? false,
    packagingVerified: product?.ecoEvidence.packagingVerified ?? false,
    contributionVerified: product?.ecoEvidence.contributionVerified ?? false,
  };
}

export function productPayload(
  values: ProductFormValues,
  status: "active" | "draft",
): ProductWritePayload {
  return {
    name: values.name,
    shortDescription: values.shortDescription,
    description: values.description,
    category: values.category,
    sku: values.sku,
    priceCents: Math.round(Number(values.price) * 100),
    currency: values.currency,
    stockQuantity: Number(values.stockQuantity),
    lowStockThreshold: Number(values.lowStockThreshold),
    ecoScore: Number(values.ecoScore),
    personalizationAvailable: values.personalizationAvailable,
    materialsVerified: values.materialsVerified,
    packagingVerified: values.packagingVerified,
    contributionVerified: values.contributionVerified,
    status,
  };
}
