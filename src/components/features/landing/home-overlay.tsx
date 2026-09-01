"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PromotionBubble } from "@/components/features/promotions/promotion-bubble";
import { PromotionModal } from "@/components/features/promotions/promotion-modal";

export function HomeOverlay() {
  const path = usePathname();
  const [promotionOpen, setPromotionOpen] = useState(false);
  if (path !== "/") return null;
  return (
    <>
      <PromotionModal onOpenChange={setPromotionOpen} open={promotionOpen} />
      <div className="home-overlay">
        <PromotionBubble onOpen={() => setPromotionOpen(true)} />
        <ScrollToTop />
      </div>
    </>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          animate={{ opacity: 1, scale: 1, y: 0 }}
          aria-label="Scroll back to the top"
          className="scroll-top-button"
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          onClick={() => window.scrollTo({ behavior: reduced ? "auto" : "smooth", top: 0 })}
          transition={{ damping: 20, stiffness: 260, type: "spring" }}
          type="button"
        >
          <ArrowUp aria-hidden="true" size={19} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
