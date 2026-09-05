"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { gradeFor, photos } from "@/data/photos";
import { Container } from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import { useReducedMotion } from "@/lib/hooks";

const picks = ["live-01", "live-04", "live-02", "live-05", "live-03", "live-06"];

export default function PhotoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-34%"]);

  const list = picks
    .map((id) => photos.find((p) => p.id === id))
    .filter(Boolean) as typeof photos;

  return (
    <section ref={ref} className="relative border-t border-bone/[0.07] py-24 md:py-32 lg:py-40">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Off the clock"
          title={"Light, before\nit was data."}
          lead="I shoot live events and whatever the street offers. Concert lighting is the hardest exposure problem I know that has nothing to do with code — which is exactly why it’s a good break from it."
          action={
            <ArrowLink href="/photography" cursor="View">
              Open the gallery
            </ArrowLink>
          }
        />
      </Container>

      <div className="mt-14 overflow-hidden md:mt-20">
        <motion.div
          className="flex w-max gap-4 px-6 md:gap-6 md:px-10"
          style={{ x: reduced ? 0 : x }}
        >
          {list.map((p, i) => (
            <figure
              key={p.id}
              className="group relative shrink-0 overflow-hidden rounded-xl border border-bone/[0.08] bg-ink"
              style={{
                width: p.w >= p.h ? "clamp(19rem, 30vw, 30rem)" : "clamp(13rem, 20vw, 20rem)",
                aspectRatio: `${p.w} / ${p.h}`,
                marginTop: i % 2 === 1 ? "2.5rem" : 0,
              }}
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                placeholder="blur"
                blurDataURL={p.lqip}
                className={`object-cover transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${gradeFor(p.series)}`}
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-void/85 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-[0.82rem] font-medium tracking-tight text-bone">
                  {p.title}
                </span>
                <span className="label-sm text-dust">{p.meta}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
