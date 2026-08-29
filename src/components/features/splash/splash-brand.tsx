"use client";

import { motion } from "motion/react";
import Image from "next/image";

const springEase = (value: number) =>
  1 -
  Math.exp(-value * 7.6657) *
    (Math.cos(value * 6.7605) + 1.1339 * Math.sin(value * 6.7605));

export function SplashBrand({ reduced }: { reduced: boolean }) {
  const duration = reduced ? 0.01 : 2.4;
  const repeat = reduced ? 0 : Infinity;
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.9, scaleY: 0.9 }}
        animate={{
          opacity: [0, 0, 1, 1],
          scaleX: [0.9, 0.9, 1, 1],
          scaleY: [0.9, 0.9, 1, 1],
        }}
        transition={{
          opacity: {
            duration,
            times: [0, 0.0208, 0.2583, 1],
            ease: ["linear", "easeOut", "linear"],
            repeat,
          },
          scaleX: {
            duration,
            times: [0, 0.0208, 0.2583, 1],
            ease: ["linear", springEase, "linear"],
            repeat,
          },
          scaleY: {
            duration,
            times: [0, 0.0208, 0.2583, 1],
            ease: ["linear", springEase, "linear"],
            repeat,
          },
        }}
        className="size-[142px] drop-shadow-[0_0_15px_rgba(140,209,56,.18)] sm:size-[180px] lg:size-[210px]"
      >
        <Image
          alt=""
          src="/figma/splash/sprout-hero.svg"
          width={210}
          height={210}
          priority
          unoptimized
          className="size-full"
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: [0, 0, 1, 1], y: [18, 18, 0, 0] }}
        transition={{
          opacity: {
            duration,
            times: [0, 0.1042, 0.2792, 1],
            ease: ["linear", "easeOut", "linear"],
            repeat,
          },
          y: {
            duration,
            times: [0, 0.1042, 0.2792, 1],
            ease: ["linear", "easeOut", "linear"],
            repeat,
          },
        }}
        className="serif -mt-1 bg-gradient-to-r from-[#fafaf2] via-[#f2f2e5] to-[#9ed145] bg-clip-text text-[52px] leading-none text-transparent sm:text-[64px] lg:text-[70px]"
      >
        EcoGifts
      </motion.h1>
      <Divider duration={duration} repeat={repeat} />
      <RevealText
        duration={duration}
        repeat={repeat}
        times={[0, 0.2, 0.375, 1]}
        className="mt-4 text-[10px] font-semibold tracking-[.32em] text-[#c7ed61] sm:text-xs"
      >
        SUSTAINABLE&nbsp;&nbsp; GIFTING
      </RevealText>
      <RevealText
        duration={duration}
        repeat={repeat}
        times={[0, 0.25, 0.425, 1]}
        className="mt-7 text-base leading-5 text-[#bdc7b8] sm:text-[22px] sm:leading-6"
      >
        Gifts that grow
        <br />
        beyond the moment.
      </RevealText>
    </div>
  );
}

function Divider({ duration, repeat }: { duration: number; repeat: number }) {
  return (
    <div className="mt-7 flex w-[280px] items-center gap-4 sm:w-[490px]">
      <span className="h-px flex-1 bg-[#789e4a]/40" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 0, 1, 1], y: [10, 10, 0, 0] }}
        transition={{
          opacity: { duration, times: [0, 0.175, 0.35, 1], ease: ["linear", "easeOut", "linear"], repeat },
          y: { duration, times: [0, 0.175, 0.35, 1], ease: ["linear", "easeOut", "linear"], repeat },
        }}
        className="size-8"
      >
        <Image
          alt=""
          src="/figma/splash/sprout-divider.svg"
          width={32}
          height={32}
          unoptimized
          className="size-full"
        />
      </motion.div>
      <span className="h-px flex-1 bg-[#789e4a]/40" />
    </div>
  );
}

function RevealText(props: {
  children: React.ReactNode;
  className: string;
  duration: number;
  repeat: number;
  times: number[];
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: [0, 0, 1, 1], y: [12, 12, 0, 0] }}
      transition={{
        opacity: { duration: props.duration, times: props.times, ease: ["linear", "easeOut", "linear"], repeat: props.repeat },
        y: { duration: props.duration, times: props.times, ease: ["linear", "easeOut", "linear"], repeat: props.repeat },
      }}
      className={props.className}
    >
      {props.children}
    </motion.p>
  );
}
