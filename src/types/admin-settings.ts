export interface AdminSettings {
  storeName: string;
  supportEmail: string;
  storefrontActive: boolean;
  newOrderAlerts: boolean;
  paymentFailureAlerts: boolean;
  lowStockDigest: boolean;
  handlingDays: number;
  carbonNeutralDelivery: boolean;
  requireAddressValidation: boolean;
  sessionTimeoutMinutes: number;
}

export type AdminSettingsSection =
  | "Store profile"
  | "Notifications"
  | "Fulfilment"
  | "Security";
