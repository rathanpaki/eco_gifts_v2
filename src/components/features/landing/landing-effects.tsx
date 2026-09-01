"use client";

import { Gift, Leaf, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export function LandingEffects() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { damping: 30, stiffness: 150 });
  const leafY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const giftY = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const leafX = useTransform(scrollYProgress, [0, 1], [0, 84]);
  const giftX = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 140]);
  if (reduced) return null;
  return (
    <div aria-hidden="true" className="landing-effects">
      <motion.span className="landing-scroll-progress" style={{ scaleX: progress }} />
      <motion.span animate={{ scale: [1, 1.09, 1] }} className="landing-float landing-float-one" style={{ rotate: spin, x: leafX, y: leafY }} transition={{ duration: 5.2, ease: "easeInOut", repeat: Infinity }}><Leaf size={18} /></motion.span>
      <motion.span animate={{ scale: [1, 0.94, 1] }} className="landing-float landing-float-two" style={{ rotate: spin, x: giftX, y: giftY }} transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity }}><Gift size={17} /></motion.span>
      <motion.span animate={{ opacity: [0.6, 1, 0.6], scale: [0.96, 1.12, 0.96] }} className="landing-float landing-float-three" style={{ rotate: spin, x: leafX, y: leafY }} transition={{ duration: 4.6, ease: "easeInOut", repeat: Infinity }}><Sparkles size={16} /></motion.span>
    </div>
  );
}
