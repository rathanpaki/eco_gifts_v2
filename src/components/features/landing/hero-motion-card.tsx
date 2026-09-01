"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { hoverSpring, responsiveSpring } from "@/constants/motion";

export function HeroMotionCard({ children, className }: { children: ReactNode; className: string }) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, responsiveSpring);
  const smoothY = useSpring(pointerY, responsiveSpring);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);
    event.currentTarget.style.setProperty("--glass-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--glass-y", `${y * 100}%`);
  };
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    pointerX.set(0);
    pointerY.set(0);
    event.currentTarget.style.setProperty("--glass-x", "50%");
    event.currentTarget.style.setProperty("--glass-y", "18%");
  };
  return (
    <motion.div
      className={className}
      onPointerLeave={reset}
      onPointerMove={move}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      transition={hoverSpring}
      whileHover={reduced ? undefined : { y: -4 }}
    >
      {children}
    </motion.div>
  );
}
