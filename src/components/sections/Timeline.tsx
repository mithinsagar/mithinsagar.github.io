"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { timeline, type Entry } from "@/data/experience";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";

const kindLabel: Record<Entry["kind"], string> = {
  education: "Education",
  work: "Experience",
  leadership: "Leadership",
  research: "Research",
};

const kindTone: Record<Entry["kind"], string> = {
  education: "text-dust border-bone/18",
  work: "text-flame border-flame/40",
  leadership: "text-linen border-bone/25",
  research: "text-glow border-glow/35",
};

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.72", "end 0.6"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const scaleY = useTransform(fill, (v) => (reduced ? 1 : v));

  return (
    <div ref={ref} className="relative">
      {/* spine */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[0.4375rem] top-2 w-px bg-bone/10 md:left-[7.9375rem] lg:left-[10.4375rem]"
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-to-b from-ember via-flame to-glow"
          style={{ scaleY }}
        />
      </div>

      <ol className="flex flex-col">
        {timeline.map((e) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
            className="group relative grid grid-cols-[2rem_1fr] gap-x-4 pb-14 last:pb-0 md:grid-cols-[7.5rem_2rem_1fr] md:gap-x-6 md:pb-20 lg:grid-cols-[10rem_2rem_1fr]"
          >
            {/* period */}
            <span className="label-sm col-start-2 row-start-1 pb-3 text-flame md:col-start-1 md:row-start-1 md:pt-1.5 md:text-right md:text-dust md:transition-colors md:duration-500 md:group-hover:text-flame">
              {e.period}
            </span>

            {/* node */}
            <span className="col-start-1 row-start-1 flex justify-center pt-1 md:col-start-2">
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute h-3.5 w-3.5 rounded-full bg-void ring-1 ring-bone/25 transition-all duration-500 group-hover:ring-flame/70" />
                <span
                  className={`relative h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                    e.kind === "work" || e.kind === "research"
                      ? "bg-ember group-hover:scale-150"
                      : "bg-bone/40 group-hover:bg-flame group-hover:scale-150"
                  }`}
                />
                {e.ongoing && (
                  <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-ember/40" />
                )}
              </span>
            </span>

            {/* body */}
            <div className="col-span-2 col-start-1 row-start-2 flex flex-col gap-4 pl-8 md:col-span-1 md:col-start-3 md:row-start-1 md:pl-0">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`label-sm rounded-full border px-2.5 py-1.5 ${kindTone[e.kind]}`}
                >
                  {kindLabel[e.kind]}
                </span>
                {e.impact && <span className="label-sm text-mute">{e.impact}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-[1.15rem] font-semibold leading-[1.25] tracking-[-0.03em] text-bone md:text-[1.45rem]">
                  {e.role}
                </h3>
                <p className="text-[0.95rem] tracking-tight text-flame/90">{e.org}</p>
                <p className="label-sm text-mute">{e.place}</p>
              </div>

              <p className="max-w-[58ch] text-[0.95rem] leading-[1.7] text-linen">{e.summary}</p>

              <ul className="flex max-w-[62ch] flex-col gap-3 pt-1">
                {e.points.map((pt, pi) => (
                  <li key={pi} className="flex gap-3.5 text-[0.9rem] leading-[1.66] text-dust">
                    <span
                      aria-hidden
                      className="mt-[0.62em] h-px w-4 shrink-0 bg-flame/45 transition-all duration-500 group-hover:w-6"
                    />
                    {pt}
                  </li>
                ))}
              </ul>

              {e.tech && (
                <ul className="flex flex-wrap gap-1.5 pt-2">
                  {e.tech.map((t) => (
                    <li
                      key={t}
                      className="label-sm rounded-full border border-bone/[0.11] px-2.5 py-1.5 text-bone/60 transition-colors duration-500 group-hover:border-flame/25 group-hover:text-bone/85"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
