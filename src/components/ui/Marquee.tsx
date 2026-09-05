"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  wrap,
} from "motion/react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Continuous typographic band. `baseVelocity` is percent of track width per
 * second, so it stays slow regardless of how wide the row is. Scroll velocity
 * nudges it along and flips its direction — the only reason it exists is to
 * make the scroll itself visible.
 */
export default function Marquee({
  items,
  baseVelocity = 1.8,
  className = "",
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1400], [0, 1.4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_t, delta) => {
    if (reduced) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap px-5 md:px-8">{it}</span>
          <span
            aria-hidden
            className="inline-block h-[0.13em] w-[0.13em] shrink-0 rounded-full bg-ember/45"
          />
        </span>
      ))}
    </span>
  );

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x: reduced ? "-25%" : x }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
