"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { useScrollLock } from "@/lib/hooks";
import Grain from "@/components/chrome/Grain";

export type LightboxItem = {
  src: string;
  w: number;
  h: number;
  lqip?: string;
  title?: string;
  caption?: string;
  meta?: string;
};

export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  useScrollLock(open);

  // Move focus into the viewer on open and hand it back on close.
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      window.clearTimeout(t);
      restoreRef.current?.focus?.();
    };
  }, [open]);

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        // simple trap: everything focusable lives inside the dialog
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>('[role="dialog"] button')
        ).filter((n) => n.offsetParent !== null);
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[118] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label={item.title ?? "Image viewer"}
        >
          <div className="absolute inset-0 bg-void/94 backdrop-blur-xl" onClick={onClose} />
          <Grain />

          {/* chrome */}
          <div className="relative z-10 flex items-center justify-between px-5 py-5 md:px-8">
            <span className="label-sm text-dust">
              <span className="text-flame">{String(index + 1).padStart(2, "0")}</span> /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone transition-colors duration-300 hover:border-flame/60 hover:text-flame"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* stage */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-4 md:px-16">
            <AnimatePresence mode="wait">
              <motion.figure
                key={item.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative flex max-h-full max-w-full flex-col items-center gap-5"
              >
                <div
                  className="relative overflow-hidden rounded-lg border border-bone/10"
                  style={{
                    width: "min(92vw, calc((78svh) * " + item.w / item.h + "))",
                    aspectRatio: `${item.w} / ${item.h}`,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.title ?? ""}
                    fill
                    sizes="92vw"
                    placeholder={item.lqip ? "blur" : undefined}
                    blurDataURL={item.lqip}
                    className="object-contain"
                  />
                </div>
              </motion.figure>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-bone/12 bg-void/60 text-bone transition-all duration-300 hover:border-flame/50 hover:text-flame md:left-5"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-180" aria-hidden>
                    <path d="M5 12h13M12 5.5 18.5 12 12 18.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-bone/12 bg-void/60 text-bone transition-all duration-300 hover:border-flame/50 hover:text-flame md:right-5"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d="M5 12h13M12 5.5 18.5 12 12 18.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* caption */}
          <div className="relative z-10 flex min-h-[5.5rem] items-start justify-center px-6 py-6">
            <motion.div
              key={item.src + "-cap"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="flex max-w-[62ch] flex-col items-center gap-2 text-center"
            >
              {item.title && (
                <span className="text-[0.98rem] font-medium tracking-tight text-bone">
                  {item.title}
                </span>
              )}
              {item.caption && (
                <span className="text-[0.85rem] leading-relaxed text-dust">{item.caption}</span>
              )}
              {item.meta && <span className="label-sm text-mute">{item.meta}</span>}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
