"use client";

import { motion } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import { timeline } from "@/data/experience";
import { publications } from "@/data/publications";
import { EASE } from "@/lib/motion";

export default function TrackPreview() {
  const rows = [...timeline].reverse().slice(0, 4);
  const paper = publications[0];

  return (
    <Section className="border-t border-bone/[0.07]">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        {/* timeline column */}
        <div className="lg:col-span-7">
          <SectionHeading
            index="04"
            eyebrow="Track record"
            title={"Where it\nhappened."}
            action={
              <ArrowLink href="/experience" cursor="View">
                Full timeline
              </ArrowLink>
            }
          />

          <ol className="mt-12 border-t border-bone/[0.09]">
            {rows.map((e, i) => (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
                className="group relative border-b border-bone/[0.09]"
              >
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1.5 py-5 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:grid-cols-[8.5rem_1fr] md:py-6">
                  <span className="label-sm text-mute transition-colors duration-500 group-hover:text-flame">
                    {e.period}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.98rem] font-medium tracking-[-0.02em] text-bone md:text-[1.08rem]">
                      {e.role}
                    </span>
                    <span className="text-[0.85rem] text-dust">{e.org}</span>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 h-px w-0 bg-ember transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />
              </motion.li>
            ))}
          </ol>
        </div>

        {/* research column */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-bone/[0.09] p-7 md:p-9">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(110% 80% at 90% 0%, rgba(196,60,12,0.24), transparent 62%), linear-gradient(160deg, #16100c, #0a0705)",
              }}
            />
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="label text-flame">05</span>
                <span className="h-px w-8 bg-flame/40" />
                <span className="label text-dust">Research</span>
              </div>
              <span className="label-sm w-fit rounded-full border border-flame/30 px-3 py-1.5 text-flame">
                {paper.venueShort}
              </span>
              <h3 className="text-[1.25rem] font-semibold leading-[1.24] tracking-[-0.03em] text-bone md:text-[1.5rem]">
                {paper.title}
              </h3>
              <p className="text-[0.88rem] leading-[1.62] text-dust">
                {paper.abstract.slice(0, 210)}…
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 border-t border-bone/10 pt-5">
                <span className="text-[0.85rem] text-bone/85">{paper.host}</span>
                <span className="label-sm text-mute">{paper.status}</span>
              </div>
              <ArrowLink href="/research" cursor="Read" tone="ember">
                Read the research
              </ArrowLink>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
