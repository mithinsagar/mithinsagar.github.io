"use client";

import { motion } from "motion/react";
import Section from "@/components/ui/Section";
import ArrowLink from "@/components/ui/ArrowLink";
import { currently } from "@/data/currently";
import { EASE } from "@/lib/motion";

export default function CurrentlyStrip() {
  return (
    <Section className="border-t border-bone/[0.07]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <span className="label text-flame">07</span>
          <span className="h-px w-10 bg-flame/40" />
          <span className="label text-dust">Currently</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
          </span>
          <span className="label-sm text-dust">Updated {currently.updated}</span>
        </div>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-bone/[0.08] bg-bone/[0.06] md:mt-16 md:grid-cols-2">
        {currently.blocks.map((b, i) => (
          <motion.div
            key={b.n}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: EASE, delay: i * 0.06 }}
            className="group flex flex-col gap-4 bg-ink p-7 transition-colors duration-500 hover:bg-char md:p-9"
          >
            <div className="flex items-center justify-between">
              <span className="label text-flame/85">{b.label}</span>
              <span className="label-sm text-mute">{b.n}</span>
            </div>
            <h3 className="text-[1.1rem] font-semibold tracking-[-0.028em] text-bone md:text-[1.22rem]">
              {b.title}
            </h3>
            <p className="text-[0.88rem] leading-[1.62] text-dust">{b.body}</p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {b.tags.map((t) => (
                <li
                  key={t}
                  className="label-sm rounded-full border border-bone/10 px-2.5 py-1.5 text-bone/55 transition-colors duration-500 group-hover:border-flame/25 group-hover:text-bone/80"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <ArrowLink href="/currently" cursor="Read">
          The full page
        </ArrowLink>
      </div>
    </Section>
  );
}
