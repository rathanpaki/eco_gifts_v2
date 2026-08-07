export type AdminDashboard = {
  generatedAt: string;
  periodDays: number;
  operator: { email: string | null; displayName: string | null };
  kpis: {
    revenueCents: number;
    revenueChangePercent: number | null;
    orderCount: number;
    orderChangePercent: number | null;
    averageOrderCents: number;
    averageChangePercent: number | null;
    openIssues: number;
  };
  attention: { paymentFailures: number; lowStockProducts: number; readyToShip: number };
  revenueTrend: RevenuePoint[];
  recentOrders: RecentOrder[];
};

export type RevenuePoint = { date: string; label: string; revenueCents: number };

export type RecentOrder = {
  id: string;
  orderNumber: string;
  customerName: string | null;
  totalCents: number;
  currency: string | null;
  status: string | null;
};
