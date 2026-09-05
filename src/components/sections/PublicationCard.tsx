"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Publication } from "@/data/publications";
import ArrowLink from "@/components/ui/ArrowLink";
import { EASE } from "@/lib/motion";

export default function PublicationCard({
  pub,
  index,
}: {
  pub: Publication;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0 && !pub.placeholder);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`group relative overflow-hidden rounded-2xl border transition-colors duration-500 ${
        pub.placeholder
          ? "border-dashed border-bone/12 bg-transparent"
          : "border-bone/[0.09] bg-ink hover:border-flame/25"
      }`}
    >
      {!pub.placeholder && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full flex-col gap-6 p-7 text-left md:p-10"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="label-sm text-flame/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`label-sm rounded-full border px-2.5 py-1.5 ${
              pub.placeholder ? "border-bone/15 text-mute" : "border-flame/30 text-flame"
            }`}
          >
            {pub.venueShort}
          </span>
          <span className="label-sm text-mute">{pub.year}</span>
          <span className="ml-auto flex items-center gap-3">
            <span className="label-sm hidden text-dust sm:inline">
              {open ? "Collapse" : "Read abstract"}
            </span>
            <span
              className={`grid h-8 w-8 place-items-center rounded-full border border-bone/15 transition-all duration-500 ${
                open ? "rotate-45 border-flame/50 text-flame" : "text-bone/60"
              }`}
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </div>

        <h3
          className={`max-w-[30ch] text-[clamp(1.25rem,1rem+1.1vw,2rem)] font-semibold leading-[1.2] tracking-[-0.035em] ${
            pub.placeholder ? "text-mute" : "text-bone"
          }`}
        >
          {pub.title}
        </h3>

        <div className="flex flex-col gap-1">
          <span className="text-[0.9rem] tracking-tight text-linen/85">{pub.venue}</span>
          <span className="text-[0.85rem] text-dust">{pub.host}</span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-7 border-t border-bone/[0.09] px-7 py-8 md:px-10 md:py-10">
              <div className="grid gap-8 md:grid-cols-[1fr_14rem]">
                <div className="flex flex-col gap-4">
                  <span className="label text-dust">Abstract</span>
                  <p className="max-w-[64ch] text-[0.94rem] leading-[1.74] text-linen">
                    {pub.abstract}
                  </p>
                </div>
                <dl className="flex flex-col gap-5 md:border-l md:border-bone/10 md:pl-8">
                  <div className="flex flex-col gap-1.5">
                    <dt className="label-sm text-mute">Authors</dt>
                    <dd className="text-[0.88rem] text-bone/85">{pub.authors.join(", ")}</dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="label-sm text-mute">Status</dt>
                    <dd className="text-[0.88rem] text-bone/85">{pub.status}</dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="label-sm text-mute">DOI</dt>
                    <dd className="font-mono text-[0.8rem] text-dust">
                      {pub.doi ?? "[PENDING]"}
                    </dd>
                  </div>
                </dl>
              </div>

              {pub.keywords.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {pub.keywords.map((k) => (
                    <li
                      key={k}
                      className="rounded-full border border-bone/[0.11] px-3 py-2 text-[0.78rem] tracking-tight text-bone/65"
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              )}

              {(pub.codeUrl || pub.paperUrl) && (
                <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-bone/[0.09] pt-6">
                  {pub.paperUrl && (
                    <ArrowLink href={pub.paperUrl} external tone="ember" cursor="Read">
                      Read the paper
                    </ArrowLink>
                  )}
                  {pub.codeUrl && (
                    <ArrowLink href={pub.codeUrl} external cursor="GitHub">
                      Implementation on GitHub
                    </ArrowLink>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
