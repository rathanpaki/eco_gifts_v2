"use client";

import { motion, useReducedMotion } from "motion/react";
import { PremiumLogoMark } from "@/components/ui/premium-logo-mark";

type LoaderSize = "inline" | "section" | "page";

const sizeClass: Record<LoaderSize, string> = {
  inline: "min-h-24 py-2",
  section: "min-h-[260px] py-8",
  page: "min-h-[calc(100dvh-72px)] px-5 py-12",
};

export function LogoDrawLoader({
  className = "",
  label = "Loading",
  size = "section",
}: {
  className?: string;
  label?: string;
  size?: LoaderSize;
}) {
  const reduced = Boolean(useReducedMotion());
  return (
    <div
      aria-label={label}
      aria-live="polite"
      aria-busy="true"
      role="status"
      className={`grid place-items-center ${sizeClass[size]} ${className}`}
    >
      <div className="flex flex-col items-center text-center">
        <PremiumLogoMark reduced={reduced} />
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: [0, 0, 1, 1], y: [5, 5, 0, 0] }}
          transition={{
            duration: reduced ? 0.01 : 2.4,
            times: [0, 0.3583, 0.4917, 1],
            ease: ["linear", "easeOut", "linear"],
            repeat: reduced ? 0 : Infinity,
          }}
          className="mt-1 text-xs font-semibold tracking-[0.08em] text-[var(--muted)]"
        >
          {label}
        </motion.p>
      </div>
    </div>
  );
}
