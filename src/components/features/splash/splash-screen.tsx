"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { SplashBrand } from "./splash-brand";
import { SplashLoader } from "./splash-loader";

export function SplashScreen({ className = "" }: { className?: string }) {
  const reduced = Boolean(useReducedMotion());
  return (
    <section
      aria-label="EcoGifts is loading"
      aria-live="polite"
      role="status"
      className={
        "relative isolate grid min-h-dvh overflow-hidden bg-gradient-to-b from-[#030b09] via-[#05110c] via-[58%] to-[#081c12] " +
        className
      }
    >
      <Image
        alt=""
        src="/figma/splash/ambient-top.svg"
        width={680}
        height={680}
        priority
        unoptimized
        className="absolute -left-64 -top-52 size-[560px] sm:size-[680px]"
      />
      <Image
        alt=""
        src="/figma/splash/ambient-logo.svg"
        width={500}
        height={500}
        priority
        unoptimized
        className="absolute left-1/2 top-[14%] size-[min(92vw,500px)] -translate-x-1/2"
      />
      <Image
        alt=""
        src="/figma/splash/ambient-bottom.svg"
        width={680}
        height={680}
        priority
        unoptimized
        className="absolute -bottom-52 -right-60 size-[560px] sm:size-[680px]"
      />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 py-8">
        <SplashBrand reduced={reduced} />
        <SplashLoader reduced={reduced} />
      </div>
    </section>
  );
}
