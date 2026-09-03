"use client";

import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useHydrated } from "@/hooks/use-hydrated";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useActivePromotions } from "@/hooks/use-promotions";
import { promotionCopy } from "./promotion-copy";

type Props = { onOpenChange: (open: boolean) => void; open: boolean };

export function PromotionModal({ onOpenChange, open }: Props) {
  const promotions = useActivePromotions();
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const items = promotions.data ?? [];
  const [index, setIndex] = useState(0);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const visible = open && items.length > 0;
  const safeIndex = items.length ? index % items.length : 0;
  const offer = items[safeIndex];
  useBodyScrollLock(visible);

  useEffect(() => {
    if (!items.length) return;
    const timer = window.setTimeout(() => onOpenChange(true), 700);
    return () => window.clearTimeout(timer);
  }, [items.length, onOpenChange]);

  useEffect(() => {
    if (!visible || reduced || items.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => value + 1), 6500);
    return () => window.clearInterval(timer);
  }, [items.length, reduced, visible]);

  useEffect(() => {
    if (!visible) return;
    closeButton.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onOpenChange, visible]);

  if (!hydrated) return null;
  const move = (amount: number) => setIndex((value) => (value + amount + items.length) % items.length);
  return createPortal(
    <AnimatePresence>
      {visible && offer ? (
        <motion.div animate={{ opacity: 1 }} className="promotion-modal-layer" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}>
          <motion.section
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-labelledby="promotion-modal-title"
            aria-modal="true"
            className="promotion-modal-panel"
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            id="promotion-modal"
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            role="dialog"
            transition={{ damping: 24, stiffness: 250, type: "spring" }}
          >
            <button aria-label="Close offers" className="promotion-modal-close" onClick={() => onOpenChange(false)} ref={closeButton} type="button"><X size={18} /></button>
            <div className="promotion-modal-heading">
              <span><Sparkles size={19} /></span>
              <div><p className="eyebrow">Limited offers</p><h2 className="serif" id="promotion-modal-title">More joy in every gift</h2></div>
            </div>
            <div className="promotion-modal-viewport">
              <AnimatePresence initial={false} mode="wait">
                <motion.article animate={{ opacity: 1, x: 0 }} className="promotion-modal-slide" exit={{ opacity: 0, x: -24 }} initial={{ opacity: 0, x: 24 }} key={offer.id} transition={{ duration: reduced ? 0 : 0.28 }}>
                  <span className="promotion-carousel-kicker">Offer {safeIndex + 1} of {items.length}</span>
                  <h3 className="serif">{promotionCopy(offer)}</h3>
                  <p>Use code <strong>{offer.code}</strong> at checkout.</p>
                </motion.article>
              </AnimatePresence>
            </div>
            {items.length > 1 ? <ModalControls count={items.length} current={safeIndex} move={move} select={setIndex} /> : null}
            <div className="promotion-modal-actions">
              <button onClick={() => onOpenChange(false)} type="button">Maybe later</button>
              <Link className="premium-action" href="/shop" onClick={() => onOpenChange(false)}>Shop this offer</Link>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function ModalControls({ count, current, move, select }: { count: number; current: number; move: (amount: number) => void; select: (index: number) => void }) {
  return <div className="promotion-modal-controls"><button aria-label="Previous promotion" onClick={() => move(-1)} type="button"><ChevronLeft size={18} /></button><div>{Array.from({ length: count }, (_, index) => <button aria-current={index === current ? "true" : undefined} aria-label={`Show promotion ${index + 1}`} key={index} onClick={() => select(index)} type="button" />)}</div><button aria-label="Next promotion" onClick={() => move(1)} type="button"><ChevronRight size={18} /></button></div>;
}
