"use client";

import { motion } from "motion/react";

const paths = [
  {
    key: "stem",
    className: "left-[12.5%] top-[52.96%] h-[32.6%] w-[15%]",
    viewBox: "0 0 14.9334 28.8",
    d: "M2.66667 26.1334C2.66667 16 6.93333 8.53335 12.2667 2.66669",
    times: [0, 0.05, 0.175, 1],
  },
  {
    key: "upper",
    className: "left-[25.32%] top-[6.3%] h-[47.4%] w-[66.6%]",
    viewBox: "0 0 47.9535 39.4667",
    d: "M4.06213 36.2667C-0.204542 26.1334 5.66213 18.1334 16.8621 15.4667C27.5288 13.8667 36.5955 9.06671 44.0621 2.66671C47.2621 17.0667 44.0621 28.8 36.0621 36.8",
    times: [0, 0.142, 0.325, 1],
  },
  {
    key: "lower",
    className: "left-[27.5%] top-[52.96%] h-[9.54%] w-[50%]",
    viewBox: "0 0 37.3335 12.2016",
    d: "M34.6668 3.20012C26.6668 11.2001 14.9335 12.2668 2.66678 2.66678",
    times: [0, 0.283, 0.425, 1],
  },
  {
    key: "branch",
    className: "left-[24.17%] top-[59.63%] h-[19.26%] w-[32.5%]",
    viewBox: "0 0 26.1337 19.2004",
    d: "M2.66705 2.66705C8.53372 12.267 15.467 16.5337 23.4671 16.5337",
    times: [0, 0.358, 0.483, 1],
  },
] as const;

export function SplashSprout({
  color = "#b5c9b6",
  reduced,
}: {
  color?: string;
  reduced: boolean;
}) {
  const duration = reduced ? 0.01 : 2.4;
  const repeat = reduced ? 0 : Infinity;
  return (
    <motion.div
      initial={{ scaleX: 1, scaleY: 1 }}
      animate={{
        scaleX: [1, 1, 1.035, 1, 1],
        scaleY: [1, 1, 1.035, 1, 1],
      }}
      transition={{
        scaleX: { duration, times: [0, 0.475, 0.6083, 0.7417, 1], ease: ["linear", "easeInOut", "easeInOut", "linear"], repeat },
        scaleY: { duration, times: [0, 0.475, 0.6083, 0.7417, 1], ease: ["linear", "easeInOut", "easeInOut", "linear"], repeat },
      }}
      className="relative h-[72px] w-16"
    >
      {paths.map((path) => (
        <svg
          key={path.key}
          viewBox={path.viewBox}
          preserveAspectRatio="none"
          className={"absolute overflow-visible " + path.className}
        >
          <motion.path
            d={path.d}
            fill="none"
            pathLength={1}
            stroke={color}
            strokeWidth="5.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "0 1", strokeDashoffset: 0 }}
            animate={{
              strokeDasharray: reduced
                ? "1 1"
                : ["0 1", "0 1", "1 1", "1 1"],
            }}
            transition={{
              duration,
              ease: ["linear", [0.22, 1, 0.36, 1], "linear"],
              times: [...path.times],
              repeat,
            }}
          />
        </svg>
      ))}
    </motion.div>
  );
}
