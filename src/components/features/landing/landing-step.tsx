"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { entranceSpring, hoverSpring } from "@/constants/motion";

export function LandingStep({ children, delay }: { children: ReactNode; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.li
      className="landing-process-step flex items-start gap-4 md:flex-col md:items-center"
      initial={reduced ? false : { filter: "blur(5px)", opacity: 0, rotateX: 7, scale: 0.94, y: 34 }}
      transition={{ ...entranceSpring, delay }}
      viewport={{ amount: 0.45, once: true }}
      whileHover={reduced ? undefined : { scale: 1.035, transition: hoverSpring, y: -6 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, rotateX: 0, scale: 1, y: 0 }}
    >
      {children}
    </motion.li>
  );
}
