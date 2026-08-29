"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SplashSprout } from "@/components/features/splash/splash-sprout";

const particles = [
  ["particle-1.svg", "left-2 top-8", 0.1458, 0.7083],
  ["particle-2.svg", "right-5 top-3", 0.2083, 0.7583],
  ["particle-3.svg", "left-0 top-[78px]", 0.2708, 0.8083],
  ["particle-4.svg", "right-0 top-[82px]", 0.3333, 0.7083],
  ["particle-5.svg", "bottom-3 left-8", 0.1458, 0.7583],
  ["particle-6.svg", "bottom-1 right-7", 0.2083, 0.8083],
  ["particle-7.svg", "left-[54px] top-0", 0.2708, 0.7083],
  ["particle-8.svg", "right-[48px] top-10", 0.3333, 0.7583],
] as const;

export function PremiumLogoMark({ reduced }: { reduced: boolean }) {
  const duration = reduced ? 0.01 : 2.4;
  const repeat = reduced ? 0 : Infinity;
  return (
    <div className="relative grid size-36 place-items-center">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.04, scale: 0.92 }}
        animate={{
          opacity: [0.04, 0.04, 0.2, 0.08, 0.04],
          scale: [0.92, 0.92, 1.06, 1, 0.92],
        }}
        transition={{
          duration,
          times: [0, 0.3, 0.4917, 0.7417, 1],
          ease: ["linear", "easeOut", "easeInOut", "linear"],
          repeat,
        }}
      >
        <Image
          alt=""
          fill
          unoptimized
          src="/figma/splash/loader-glow.svg"
          className="object-contain"
        />
      </motion.div>
      <motion.div
        className="absolute size-[116px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: reduced ? 0 : 360 }}
        transition={{ duration, ease: "linear", repeat }}
      >
        <Image
          alt=""
          fill
          unoptimized
          src="/figma/splash/loader-ring.svg"
          className="object-contain opacity-75"
        />
      </motion.div>
      <div className="relative z-10 grid size-24 place-items-center rounded-full bg-[var(--page)]/90 shadow-[0_10px_35px_rgba(45,78,57,.14)] backdrop-blur-sm">
        <SplashSprout color="var(--brand)" reduced={reduced} />
      </div>
      <motion.div
        className="absolute bottom-[25px] left-[39px] size-2"
        initial={{ opacity: 0, scale: 0.55 }}
        animate={{
          opacity: [0, 0, 1, 0.55, 0, 0],
          scale: [0.55, 0.55, 1.25, 1, 1, 1],
        }}
        transition={{
          duration,
          times: [0, 0.0167, 0.075, 0.1583, 0.2417, 1],
          ease: ["linear", "easeOut", "easeInOut", "easeOut", "linear"],
          repeat,
        }}
      >
        <Image alt="" fill unoptimized src="/figma/splash/loader-seed.svg" />
      </motion.div>
      {particles.map(([asset, position, start, end]) => (
        <motion.div
          key={asset}
          className={`absolute size-1.5 ${position}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: [0, 0, 0.9, 0, 0],
            y: [8, 8, -10, -10, -10],
          }}
          transition={{
            duration,
            times: [0, start, start + 0.125, end, 1],
            ease: ["linear", "easeOut", "easeInOut", "linear"],
            repeat,
          }}
        >
          <Image
            alt=""
            fill
            unoptimized
            src={`/figma/splash/${asset}`}
          />
        </motion.div>
      ))}
    </div>
  );
}
