"use client";

import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useActivePromotions } from "@/hooks/use-promotions";

export function PromotionBubble({ onOpen }: { onOpen: () => void }) {
  const promotions = useActivePromotions();
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const items = hydrated ? promotions.data ?? [] : [];
  if (!items.length) return null;
  return (
    <div className="promotion-bubble">
      <motion.button
        animate={reduced ? undefined : { scale: [1, 1.035, 1] }}
        aria-controls="promotion-modal"
        aria-haspopup="dialog"
        className="promotion-bubble-trigger"
        onClick={onOpen}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4 }}
        type="button"
      >
        <span className="promotion-bubble-spark"><Sparkles size={18} /></span>
        <span><strong>{items.length === 1 ? "Special offer" : `${items.length} special offers`}</strong><small>Explore what is available</small></span>
        <span className="promotion-bubble-count">{items.length}</span>
      </motion.button>
    </div>
  );
}
