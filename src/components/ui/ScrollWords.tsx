"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Editorial statement where each word lifts out of the dark as the block
 * crosses the viewport. Used once per page at most — it stops being special
 * the second time you see it.
 */
export default function ScrollWords({
  text,
  className = "",
  highlight = [],
}: {
  text: string;
  className?: string;
  /** words rendered in ember, matched case-insensitively without punctuation */
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");
  const hi = new Set(highlight.map((w) => w.toLowerCase()));

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const clean = w.replace(/[^a-zA-Z-]/g, "").toLowerCase();
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[start, end]}
            ember={hi.has(clean)}
            reduced={reduced}
          />
        );
      })}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  ember,
  reduced,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  ember: boolean;
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span
      style={{ opacity: reduced ? 1 : opacity }}
      className={`inline-block ${ember ? "text-flame" : ""}`}
    >
      {word}
      {" "}
    </motion.span>
  );
}
