"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { SplashScreen } from "./splash-screen";

export function AppSplash() {
  const [visible, setVisible] = useState(true);
  const reduced = Boolean(useReducedMotion());
  useBodyScrollLock(visible);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setVisible(false),
      reduced ? 450 : 2550,
    );
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.35, ease: "easeOut" }}
        >
          <SplashScreen />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
