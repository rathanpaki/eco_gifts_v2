"use client";

import { type ReactNode, useEffect, useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { entranceSpring, responsiveSpring } from "@/constants/motion";

type Preset = "fade-up" | "fade-left" | "fade-right" | "scale-up" | "blur-in";

function hiddenState(preset: Preset, distance: number) {
  if (preset === "scale-up") return { filter: "blur(5px)", opacity: 0, scale: 0.92, y: 18 };
  if (preset === "blur-in") return { filter: "blur(14px)", opacity: 0, rotateX: 5, scale: 0.985, y: 24 };
  const x = preset === "fade-left" ? distance : preset === "fade-right" ? -distance : 0;
  return { filter: "blur(3px)", opacity: 0, scale: 0.985, x, y: preset === "fade-up" ? distance : 0 };
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  distance = 30,
  preset = "fade-up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  preset?: Preset;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "-8% 0px", once: true });
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      animate={visible ? { filter: "blur(0px)", opacity: 1, rotateX: 0, scale: 1, x: 0, y: 0 } : undefined}
      className={className}
      initial={hiddenState(preset, distance)}
      ref={ref}
      style={{ transformPerspective: 1000 }}
      transition={{ ...entranceSpring, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Parallax({ children, className = "", speed = 0.3 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -110 * speed]), responsiveSpring);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  if (reduced) return <div className={className}>{children}</div>;
  return <motion.div className={className} ref={ref} style={{ scale, y }}>{children}</motion.div>;
}

export function FadeOnScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.58, 0.9], [1, 0.86, 0]);
  const y = useTransform(scrollYProgress, [0, 0.9], [0, -68]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.965]);
  const filter = useTransform(scrollYProgress, [0, 0.7, 0.9], ["blur(0px)", "blur(0px)", "blur(6px)"]);
  if (reduced) return <div className={className}>{children}</div>;
  return <motion.div className={className} ref={ref} style={{ filter, opacity, scale, y }}>{children}</motion.div>;
}

export function CountUp({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { margin: "-40px", once: true });
  const reduced = useReducedMotion();
  const parsed = useMemo(() => text.match(/^([\d,.]+)(.*)$/), [text]);
  const target = parsed ? Number(parsed[1].replaceAll(",", "")) : 0;
  const spring = useSpring(0, { damping: 24, stiffness: 65 });
  useEffect(() => {
    if (visible && !reduced && parsed) spring.set(target);
    return spring.on("change", (value) => {
      if (!number.current) return;
      const rounded = Math.round(value);
      number.current.textContent = parsed?.[1].includes(",") ? rounded.toLocaleString() : String(rounded);
    });
  }, [parsed, reduced, spring, target, visible]);
  if (reduced || !parsed) return <span className={className} ref={ref}>{text}</span>;
  return <span className={className} ref={ref}><span ref={number}>0</span>{parsed[2]}</span>;
}

export function TextReveal({ text, className = "", wordDelay = 0.055, as: Tag = "h1" }: { text: string; className?: string; wordDelay?: number; as?: "h1" | "h2" | "h3" | "p" | "span" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const visible = useInView(ref, { margin: "-40px", once: true });
  const words = useMemo(() => text.split(/\s+/), [text]);
  if (reduced) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag className={className} ref={ref as React.RefObject<never>} style={{ display: "flex", flexWrap: "wrap", gap: "0 .3em", justifyContent: "center" }}>
      {words.map((word, index) => (
        <motion.span animate={visible ? { filter: "blur(0px)", opacity: 1, rotateX: 0, scale: 1, y: 0 } : undefined} initial={{ filter: "blur(8px)", opacity: 0, rotateX: 12, scale: 0.975, y: 26 }} key={`${word}-${index}`} style={{ transformOrigin: "50% 100%" }} transition={{ ...entranceSpring, delay: 0.08 + index * wordDelay }}>
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

const blobs = [
  ["#1a3a1a", "-25%", "-20%", "80%", 0.55, 20],
  ["#0d2b1a", "55%", "55%", "70%", 0.45, 26],
  ["#2a4a2a", "30%", "25%", "50%", 0.35, 30],
] as const;

export function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 -z-10 overflow-hidden bg-[#0a0f0a] ${className}`}>
      {blobs.map(([color, top, left, size, opacity, duration]) => (
        <div className="absolute rounded-full" key={`${top}-${left}`} style={{ animation: `mesh-drift ${duration}s ease-in-out infinite`, background: `radial-gradient(circle,${color},transparent 70%)`, height: size, left, opacity, top, width: size }} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,.4)_100%)]" />
    </div>
  );
}
