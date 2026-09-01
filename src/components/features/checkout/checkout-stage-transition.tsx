"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import type { CheckoutStage } from "./checkout-progress";

export function CheckoutStageTransition({ children, stage }: { children: ReactNode; stage: CheckoutStage }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ filter: "blur(0px)", opacity: 1, x: 0 }}
        exit={{ filter: reduced ? "blur(0px)" : "blur(4px)", opacity: 0, x: -18 }}
        initial={{ filter: reduced ? "blur(0px)" : "blur(5px)", opacity: 0, x: 24 }}
        key={stage}
        transition={{ damping: 25, stiffness: 230, type: "spring" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
