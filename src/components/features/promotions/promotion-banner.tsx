"use client";

import Link from 'next/link';
import { useActivePromotions } from '@/hooks/use-promotions';
import { promotionCopy } from './promotion-copy';

export function PromotionBanner() {
  const promotions = useActivePromotions();
  const promotion = promotions.data?.[0];
  if (!promotion) return null;
  return (
    <div className="bg-[#35543c] px-4 py-2 text-center text-[11px] text-white">
      <Link href="/shop" className="font-medium">{promotionCopy(promotion)} <span className="ml-2 rounded-full bg-white/15 px-2 py-1 font-bold tracking-[0.08em]">{promotion.code}</span></Link>
    </div>
  );
}