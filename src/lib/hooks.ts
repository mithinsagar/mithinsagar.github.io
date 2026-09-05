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
 * Feed this a value that does not jump — window scrollY, not a measured scroll
 * *progress*. On a phone the browser chrome collapses mid-gesture and the
 * viewport resizes, which throws element-relative progress both forwards and
 * backwards; a backwards hop reads as the copy blinking back in, and a forwards
 * hop latches it straight to nothing. scrollY is unaffected by either.
 *
 * The ratchet is then just belt and braces: opacity can fall but never rise,
 * so nothing can replay. It restores smoothly once you are back at the top.
 *
 * `from`/`to` are in whatever units `value` carries — pixels here.
 */
export function useOneWayFade(
  value: MotionValue<number>,
  from: number,
  to: number,
  resetBelow = from + (to - from) * 0.05
) {
  const opacity = useMotionValue(1);
  const restoring = useRef<ReturnType<typeof animate> | null>(null);

  useMotionValueEvent(value, "change", (v) => {
    if (v <= resetBelow) {
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
