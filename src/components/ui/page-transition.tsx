"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const duration = reduced ? 0.01 : 0.48;
  const routeClass = pathname.startsWith("/admin") ? "admin-route" : "customer-route";
  return (
    <AnimatePresence initial mode="popLayout">
      <motion.div
        animate={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
        className={`site-route route-frame ${routeClass}`}
        exit={{ filter: reduced ? "blur(0px)" : "blur(5px)", opacity: 0, scale: 1.004, y: -8 }}
        initial={{ filter: reduced ? "blur(0px)" : "blur(7px)", opacity: 0, scale: 0.992, y: 16 }}
        key={pathname}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
