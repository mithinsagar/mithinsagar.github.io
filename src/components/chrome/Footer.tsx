"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { site, flatNav } from "@/data/site";
import { EASE, viewportSoft } from "@/lib/motion";
import Grain from "./Grain";

const socials = [
  { l: "GitHub", h: site.github },
  { l: "LinkedIn", h: site.linkedin },
  { l: "Hugging Face", h: site.huggingface },
  { l: "Instagram", h: site.instagram },
  { l: "X", h: site.x },
  { l: "Résumé", h: site.resume },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/[0.07] bg-void">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "radial-gradient(75% 100% at 50% 130%, rgba(196,60,12,0.28), transparent 72%)",
        }}
      />
      <Grain />

      <div className="relative mx-auto w-full max-w-[88rem] px-6 pb-8 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-[1.25fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <span className="label text-dust">Get in touch</span>
            <a
              href={`mailto:${site.email}`}
              data-cursor="Email"
              className="group inline-flex w-fit items-center gap-3 text-[clamp(1.3rem,1rem+1.1vw,2rem)] font-medium tracking-[-0.035em] text-bone"
            >
              <span className="link-underline">{site.email}</span>
            </a>
            <p className="max-w-[34ch] text-sm leading-relaxed text-dust">
              {site.location} · open to internships and AI/ML roles. Graduating May 2027.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="label mb-2 text-dust">Index</span>
            {flatNav.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className="group flex items-baseline gap-3 text-sm text-bone/65 transition-colors duration-300 hover:text-bone"
              >
                <span className="label-sm text-mute transition-colors group-hover:text-flame">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="link-underline">{n.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="label mb-2 text-dust">Elsewhere</span>
            {socials.map((s) => (
              <a
                key={s.l}
                href={s.h}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-bone/65 transition-colors duration-300 hover:text-bone"
              >
                <span className="link-underline">{s.l}</span>
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-mute transition-colors group-hover:text-flame" aria-hidden>
                  <path d="M3 9L9 3M9 3H4.2M9 3v4.8" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* oversized wordmark, cropped by the page edge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSoft}
          transition={{ duration: 1.2, ease: EASE }}
          className="pointer-events-none mt-16 select-none md:mt-24"
        >
          <span
            className="display block whitespace-nowrap text-[clamp(3.4rem,13vw,13rem)] leading-[0.8] text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(244,238,231,0.14) 0%, rgba(244,238,231,0.03) 62%, transparent 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Mithin Sagar
          </span>
        </motion.div>

        <div className="mt-8 flex flex-col gap-3 border-t border-bone/[0.07] pt-6 text-[0.7rem] text-mute sm:flex-row sm:items-center sm:justify-between">
          <span className="label-sm">
            © {new Date().getFullYear()} Mithin Sagar S
          </span>
          <span className="label-sm">
            Designed &amp; built in Chennai · Next.js · Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
