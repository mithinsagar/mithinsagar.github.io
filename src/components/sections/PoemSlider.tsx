"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { poems } from "@/data/currently";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import Grain from "@/components/chrome/Grain";

const INTERVAL = 9000;

export default function PoemSlider() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setI((v) => (v + d + poems.length) % poems.length);
    },
    []
  );

  const jump = (n: number) => {
    setDir(n > i ? 1 : -1);
    setI(n);
  };

  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(t);
  }, [i, paused, reduced, go]);

  const poem = poems[i];

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-bone/[0.09]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Poems"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 120% at 8% 0%, rgba(196,60,12,0.26), transparent 58%), linear-gradient(158deg, #17100c 0%, #0a0705 68%)",
        }}
      />
      <Grain />

      {/* header */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-bone/[0.08] px-6 py-4 md:px-9">
        <div className="flex items-center gap-4">
          <span className="label text-flame">Verse</span>
          <span className="h-px w-8 bg-flame/35" />
          <span className="label-sm text-dust">{poem.form}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="label-sm text-mute">
            <span className="text-flame">{String(i + 1).padStart(2, "0")}</span> /{" "}
            {String(poems.length).padStart(2, "0")}
          </span>
          <span className="label-sm rounded-full border border-bone/12 px-2.5 py-1.5 text-bone/60">
            {poem.theme}
          </span>
        </div>
      </div>

      {/* stage */}
      <div className="relative min-h-[19rem] px-6 py-10 md:min-h-[17rem] md:px-9 md:py-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={poem.id}
            initial={{ opacity: 0, y: reduced ? 0 : dir * 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : dir * -14 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col gap-7"
          >
            <div className="flex flex-col gap-1.5">
              {poem.lines.map((line, li) => (
                <motion.span
                  key={li}
                  initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 + li * 0.07 }}
                  className="accent block text-[clamp(1.15rem,0.95rem+0.9vw,1.75rem)] leading-[1.5] text-linen"
                >
                  {line}
                </motion.span>
              ))}
            </div>
            <footer className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <cite className="not-italic text-[0.95rem] font-medium tracking-tight text-bone">
                {poem.author}
              </cite>
              <span className="label-sm text-mute">{poem.years}</span>
              <span className="label-sm text-mute">· {poem.title}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* controls */}
      <div className="relative flex items-center justify-between gap-6 border-t border-bone/[0.08] px-6 py-4 md:px-9">
        <div className="flex items-center gap-2">
          {poems.map((pm, n) => (
            <button
              key={pm.id}
              onClick={() => jump(n)}
              aria-label={`Show poem ${n + 1}: ${pm.title}`}
              aria-current={n === i}
              className="group/d relative h-6 w-6 shrink-0"
            >
              <span
                className={`absolute left-1/2 top-1/2 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                  n === i
                    ? "w-6 bg-flame"
                    : "w-1.5 bg-bone/25 group-hover/d:bg-bone/50"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous poem"
            className="grid h-9 w-9 place-items-center rounded-full border border-bone/12 text-bone/70 transition-colors duration-300 hover:border-flame/50 hover:text-flame"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rotate-180" aria-hidden>
              <path d="M5 12h13M12 5.5 18.5 12 12 18.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next poem"
            className="grid h-9 w-9 place-items-center rounded-full border border-bone/12 text-bone/70 transition-colors duration-300 hover:border-flame/50 hover:text-flame"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
              <path d="M5 12h13M12 5.5 18.5 12 12 18.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* autoplay progress */}
      {!reduced && (
        <motion.span
          key={`${i}-${paused}`}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-rust via-ember to-glow"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paused ? 0 : 1 }}
          transition={{ duration: paused ? 0.3 : INTERVAL / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}
