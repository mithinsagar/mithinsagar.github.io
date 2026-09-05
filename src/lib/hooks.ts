"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

/** Locks page scroll (works alongside Lenis via the .lenis-stopped class). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [locked]);
}

/**
 * A fade that can only fall.
 *
 * Mapping scroll progress straight onto opacity is fine with a mouse. On a
 * phone the browser chrome collapses mid-gesture, the viewport resizes, and
 * progress jumps — which read as the hero copy blinking out and back in.
 *
 * This holds the lowest value it has reached, so a jump can only ever be
 * ignored, never replayed. It restores itself — smoothly, not with a snap —
 * once you are genuinely back at the top of the section.
 */
export function useOneWayFade(
  progress: MotionValue<number>,
  from = 0,
  to = 0.35
) {
  const opacity = useMotionValue(1);
  const restoring = useRef<ReturnType<typeof animate> | null>(null);

  useMotionValueEvent(progress, "change", (v) => {
    if (v <= from + 0.02) {
      if (opacity.get() < 1 && !restoring.current) {
        const a = animate(opacity, 1, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
        restoring.current = a;
        a.then(() => {
          restoring.current = null;
        });
      }
      return;
    }

    if (restoring.current) {
      restoring.current.stop();
      restoring.current = null;
    }

    const target = Math.min(1, Math.max(0, 1 - (v - from) / (to - from)));
    if (target < opacity.get()) opacity.set(target);
  });

  return opacity;
}
