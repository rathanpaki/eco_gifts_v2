"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useActivePromotions } from "@/hooks/use-promotions";
import { promotionCopy } from "./promotion-copy";

type Announcement = { code?: string; href: string; label: string };
const evergreen: Announcement[] = [
  { label: "Complimentary delivery on gifts over $50", href: "/shop" },
  { label: "See the verified eco score on every gift", href: "/sustainability" },
  { label: "Thoughtful gifts, circular materials", href: "/#impact" },
];

export function PromotionBanner() {
  const promotions = useActivePromotions();
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const active = hydrated ? promotions.data ?? [] : [];
  const entries: Announcement[] = active.length
    ? active.map((item) => ({ code: item.code, href: "/shop", label: promotionCopy(item) }))
    : evergreen;
  const safeIndex = index % entries.length;
  const current = entries[safeIndex];

  useEffect(() => {
    if (reduced || entries.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => value + 1), 5200);
    return () => window.clearInterval(timer);
  }, [entries.length, reduced]);

  return (
    <div className="promotion-strip" aria-label={active.length ? "Current promotions" : "EcoGifts benefits"}>
      <div className="promotion-announcement-shell" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="promotion-announcement"
            exit={{ opacity: 0, y: -7 }}
            initial={{ opacity: 0, y: 7 }}
            key={`${current.label}-${safeIndex}`}
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            <Link href={current.href}>{current.label}</Link>
            {current.code ? <strong>{current.code}</strong> : <span className="promotion-discover">Discover more</span>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
