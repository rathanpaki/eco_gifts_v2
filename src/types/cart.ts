export interface CartImage {
  url: string;
  alt: string;
}

export interface CartItem {
  itemId: string;
  productId: string;
  slug: string;
  name: string;
  image: CartImage | null;
  priceCents: number;
  currency: string;
  quantity: number;
  lineTotalCents: number;
  stockQuantity: number;
  available: boolean;
  exceedsStock: boolean;
  personalizationAvailable: boolean;
  ecoScore: number;
  customization: CartCustomization | null;
}

export interface CartCustomization {
  id: string;
  previewPath: string;
  text: string | null;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  subtotalCents: number;
  personalizationCents: number;
  totalCents: number;
  currency: string | null;
  readyForCheckout: boolean;
  updatedAt: string | null;
}

export interface AddCartItemInput {
  productId: string;
  quantity: number;
  customizationId?: string;
}

export interface UpdateCartItemInput {
  itemId: string;
  quantity: number;
}
