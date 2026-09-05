"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import Grain from "@/components/chrome/Grain";
import Embers from "@/components/chrome/Embers";

const FADE =
  "linear-gradient(to bottom, #000 0%, #000 64%, rgba(0,0,0,0.78) 82%, transparent 99%)";

const MASK = { maskImage: FADE, WebkitMaskImage: FADE } as const;

/* ------------------------------------------------------------------ *
 * The lit environment. Four stacked radial fields rather than one
 * gradient, so the falloff reads like a light source in a room.
 * ------------------------------------------------------------------ */
function Environment({ heat }: { heat: MotionValue<number> }) {
  return (
    <>
      {/* deep base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 105% at 44% 34%, #ff7a2a 0%, #f2510f 17%, #cd3208 33%, #8e1a05 51%, #3d0a03 71%, #120402 88%, #080302 100%)",
        }}
      />
      {/* hot core behind the subject */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: heat,
          background:
            "radial-gradient(42% 38% at 41% 27%, rgba(255,205,140,0.62) 0%, rgba(255,140,60,0.28) 45%, transparent 74%)",
        }}
        animate={{ scale: [1, 1.055, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* cool the right edge into deep red */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 90% at 108% 46%, rgba(88,10,4,0.85) 0%, rgba(52,6,3,0.45) 40%, transparent 72%)",
        }}
      />
      {/* floor shadow — grounds the portrait */}
      <div
        className="absolute inset-x-0 bottom-0 h-[52%]"
        style={{
          background:
            "linear-gradient(to top, #070302 0%, rgba(10,4,2,0.92) 22%, rgba(24,7,3,0.55) 52%, transparent 100%)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 110% at 50% 44%, transparent 42%, rgba(8,3,1,0.55) 78%, rgba(5,2,1,0.9) 100%)",
        }}
      />
    </>
  );
}

function Statement() {
  return (
    <>
      <p className="text-[1.08rem] font-semibold leading-[1.3] tracking-[-0.028em] text-bone md:text-[1.45rem] lg:text-[1.6rem]">
        {site.headline[0]}
        <br className="hidden lg:block" />{" "}
        <span className="lg:hidden"> </span>
        {site.headline[1].replace(/\.$/, "")}
        <span className="text-ember">.</span>
      </p>
      <p className="mt-3 max-w-[38ch] text-[0.85rem] leading-[1.62] text-bone/60 md:mt-5 md:text-[0.95rem]">
        {site.intro}
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const p = reduced ? undefined : scrollYProgress;
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const portraitFade = useTransform(scrollYProgress, [0, 0.75], [1, 0.12]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const nameFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const asideY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const rowY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rowFade = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const heatScroll = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const still = useTransform(scrollYProgress, () => 1);

  const s = (v: MotionValue<number> | MotionValue<string>) => (reduced ? undefined : v);

  return (
    <section
      ref={ref}
      className="relative isolate"
      style={{ padding: "var(--page-inset)", paddingBottom: 0 }}
      aria-label="Introduction"
    >
      <div
        className="hero-frame relative flex w-full flex-col overflow-hidden"
        style={{ borderRadius: "var(--page-radius)" }}
      >
        {/* ---------- environment ---------- */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.14 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.1, ease: EASE }}
        >
          <Environment heat={(p ? heatScroll : still) as MotionValue<number>} />
        </motion.div>

        <Embers density={0.9} className="z-[2]" />

        {/* ---------- portrait ---------- */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-[3] flex justify-center"
          style={{ y: s(portraitY), scale: s(portraitScale), opacity: s(portraitFade) }}
        >
          {/* Width is a share of the hero frame, not of the viewport, so a
              visible scrollbar can't change the figure's size or position. */}
          <motion.div
            className="relative w-[128%] shrink-0 sm:w-[88%] md:w-[78%] lg:w-[61%] xl:w-[53%] 2xl:w-[47%]"
            initial={{ opacity: 0, y: 34, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2.2, ease: EASE, delay: 0.55 }}
          >
            <div className="relative translate-x-[9%] translate-y-[1.5%] sm:translate-x-0">
              {/* Light wrap. Pre-blurred at build time on a canvas 18% larger than
                  the figure, so there is nothing for a mask or a filter region to
                  clip — the glow simply runs out of alpha before it runs out of box. */}
              <motion.img
                src="/portrait/mithin-glow.webp"
                aria-hidden
                alt=""
                className="pointer-events-none absolute max-w-none select-none"
                style={{
                  left: "-18%",
                  top: "-18%",
                  width: "136%",
                  height: "136%",
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.66 }}
                transition={{ duration: 2.6, ease: EASE, delay: 0.9 }}
              />
              <Image
                src="/portrait/mithin@2x.webp"
                alt="Portrait of Mithin Sagar"
                width={2558}
                height={2098}
                priority
                sizes="(max-width: 640px) 128vw, (max-width: 1024px) 78vw, 61vw"
                className="relative h-auto w-full select-none object-contain"
                style={MASK}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- atmosphere in front of the subject ---------- */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{
            background:
              "radial-gradient(60% 46% at 46% 62%, rgba(255,120,50,0.16), transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[38%]"
          style={{
            background:
              "linear-gradient(to top, rgba(6,3,1,0.94) 0%, rgba(8,3,1,0.6) 44%, transparent 100%)",
          }}
        />
        <Grain className="z-[5]" />

        {/* ---------- content ---------- */}
        <div
          className="relative z-10 flex flex-1 flex-col px-6 pb-6 md:px-10 md:pb-9"
          style={{ paddingTop: "calc(var(--nav-h) + 1.5rem)" }}
        >
          <div className="grid flex-1 grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:items-center">
            {/* name */}
            <motion.div
              className="lg:col-span-7 xl:col-span-6"
              style={{ y: s(nameY), opacity: s(nameFade) }}
            >
              <div className="overflow-hidden">
                <motion.p
                  className="text-[1.05rem] font-medium tracking-[-0.01em] text-bone/85 md:text-[1.25rem]"
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.5 }}
                >
                  Hey, I&rsquo;m
                </motion.p>
              </div>

              <h1 className="mt-1.5 md:mt-3">
                <span className="sr-only">Mithin Sagar — AI / ML Engineer</span>
                {[site.first, site.last].map((word, i) => (
                  <span key={word} aria-hidden className="block overflow-hidden">
                    <motion.span
                      className="display block text-[clamp(3.6rem,15.5vw,10.5rem)] text-bone lg:text-[clamp(4.5rem,9.6vw,10.5rem)]"
                      initial={{ y: "112%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.25, ease: EASE, delay: 0.62 + i * 0.12 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                aria-hidden
                className="mt-4 font-mono text-[0.72rem] uppercase text-bone/75 md:mt-5 md:text-[0.9rem]"
                initial={{ opacity: 0, letterSpacing: "0.9em" }}
                animate={{ opacity: 1, letterSpacing: "0.42em" }}
                transition={{ duration: 1.6, ease: EASE, delay: 1.1 }}
              >
                AI / ML Engineer
              </motion.p>
            </motion.div>

            {/* statement — desktop position */}
            <motion.div
              className="hidden max-w-[42ch] lg:col-span-4 lg:col-start-9 lg:block lg:max-w-none"
              style={{ y: s(asideY) }}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 1.25 }}
            >
              <Statement />
            </motion.div>
          </div>

          {/* ---------- bottom row ---------- */}
          <motion.div
            className="mt-8 flex flex-col gap-7 md:mt-10"
            style={{ y: s(rowY), opacity: s(rowFade) }}
          >
            {/* statement — mobile position, sitting on the dark base */}
            <motion.div
              className="max-w-[46ch] lg:hidden"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 1.2 }}
            >
              <Statement />
            </motion.div>

            <div className="flex items-end justify-between gap-6">
              <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:flex-1 sm:gap-0">
                {site.disciplines.map((d, i) => (
                  <motion.li
                    key={d.n}
                    className="group relative sm:flex-1 sm:border-l sm:border-bone/12 sm:pl-4 sm:first:border-l-0 sm:first:pl-0 md:pl-6"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 1.5 + i * 0.1 }}
                  >
                    <span className="label-sm block text-ember/90">#{d.n}</span>
                    <span className="mt-2 block text-[0.85rem] font-medium tracking-[-0.015em] text-bone/90 md:text-[0.95rem]">
                      {d.label}
                    </span>
                    <span className="absolute -bottom-2 left-0 h-px w-0 bg-ember transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full sm:left-4 sm:group-hover:w-[calc(100%-1rem)] md:left-6 md:group-hover:w-[calc(100%-1.5rem)]" />
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="hidden shrink-0 items-center gap-4 lg:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE, delay: 1.95 }}
              >
                <span className="h-px w-14 bg-ember" />
                <div className="flex flex-col gap-1.5 text-right">
                  {site.mantra.map((m) => (
                    <span key={m} className="label-sm text-bone/70">
                      {m}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
