import type { Variants, Transition } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export const spring: Transition = { type: "spring", stiffness: 220, damping: 30, mass: 0.7 };

/** Vertical rise used for almost every entrance. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.06 * (i as number) },
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: EASE, delay: 0.08 * (i as number) },
  }),
};

/** Masked line reveal — the inner element slides up out of an overflow-hidden parent. */
export const maskLine: Variants = {
  hidden: { y: "112%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE, delay: 0.075 * (i as number) },
  }),
};

export const stagger = (gap = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportSoft = { once: true, amount: 0.12 } as const;
