"use client";

import { motion } from "motion/react";
import { SplashSprout } from "./splash-sprout";

const particles = [
  ["particle-1.svg", "-left-44 top-4", 0.1458, 0.7083],
  ["particle-2.svg", "left-64 -top-5", 0.2083, 0.7583],
  ["particle-3.svg", "-left-60 top-40", 0.2708, 0.8083],
  ["particle-4.svg", "left-80 top-40", 0.3333, 0.7083],
  ["particle-5.svg", "-left-20 top-52", 0.1458, 0.7583],
  ["particle-6.svg", "left-52 top-52", 0.2083, 0.8083],
  ["particle-7.svg", "-left-4 -top-1", 0.2708, 0.7083],
  ["particle-8.svg", "left-40 top-1", 0.3333, 0.7583],
] as const;

export function SplashLoader({ reduced }: { reduced: boolean }) {
  const duration = reduced ? 0.01 : 2.4;
  const repeat = reduced ? 0 : Infinity;
  return (
    <div className="relative mt-10 flex flex-col items-center sm:mt-12">
      <div className="relative grid size-[124px] place-items-center">
        <motion.img
          alt=""
          src="/figma/splash/loader-glow.svg"
          className="absolute inset-0 size-full"
          initial={{ opacity: 0.035 }}
          animate={{ opacity: [0.035, 0.035, 0.16, 0.065, 0.065] }}
          transition={{
            opacity: { duration, times: [0, 0.3, 0.4917, 0.7417, 1], ease: ["linear", "easeOut", "easeInOut", "linear"], repeat },
          }}
        />
        <motion.img
          alt=""
          src="/figma/splash/loader-ring.svg"
          className="absolute size-24"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration, ease: "linear", repeat }}
        />
        <motion.img
          alt=""
          src="/figma/splash/loader-seed.svg"
          className="absolute left-[36px] top-[85px] size-1.5"
          initial={{ opacity: 0, scaleX: 0.55, scaleY: 0.55 }}
          animate={{
            opacity: [0, 0, 1, 0.55, 0, 0],
            scaleX: [0.55, 0.55, 1.25, 1, 1],
            scaleY: [0.55, 0.55, 1.25, 1, 1],
          }}
          transition={{
            opacity: { duration, times: [0, 0.0167, 0.0667, 0.15, 0.2417, 1], ease: ["linear", "easeOut", "easeInOut", "easeOut", "linear"], repeat },
            scaleX: { duration, times: [0, 0.0167, 0.075, 0.1583, 1], ease: ["linear", [0.45, 1.45, 0.8, 1], "easeOut", "linear"], repeat },
            scaleY: { duration, times: [0, 0.0167, 0.075, 0.1583, 1], ease: ["linear", [0.45, 1.45, 0.8, 1], "easeOut", "linear"], repeat },
          }}
        />
        <SplashSprout reduced={reduced} />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{
          opacity: { duration, times: [0, 0.3583, 0.4917, 1], ease: ["linear", "easeOut", "linear"], repeat },
        }}
        className="mt-4 text-xs font-medium text-[#c7ed61] sm:text-[13px]"
      >
        Preparing something beautiful…
      </motion.p>
      {particles.map(([asset, position, start, end]) => (
        <motion.img
          alt=""
          key={asset}
          src={"/figma/splash/" + asset}
          className={"absolute size-1 " + position}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0, 0, 0.9, 0, 0], y: [8, 8, -10, -10] }}
          transition={{
            opacity: { duration, times: [0, start, start + 0.125, end, 1], ease: ["linear", "easeOut", "easeInOut", "linear"], repeat },
            y: { duration, times: [0, start, end, 1], ease: ["linear", "easeInOut", "linear"], repeat },
          }}
        />
      ))}
    </div>
  );
}
