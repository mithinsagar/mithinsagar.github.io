"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Section";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { Arrow } from "@/components/ui/ArrowLink";
import Grain from "@/components/chrome/Grain";
import Embers from "@/components/chrome/Embers";
import { EASE, viewportSoft } from "@/lib/motion";

export default function ContactCTA({
  index = "08",
  eyebrow = "Contact",
}: {
  index?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative" style={{ padding: "var(--page-inset)" }}>
      <div
        className="relative overflow-hidden py-24 md:py-32 lg:py-36"
        style={{ borderRadius: "var(--page-radius)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(95% 110% at 50% 118%, #ff6a22 0%, #d13c09 22%, #8a1a05 42%, #34090300 74%), linear-gradient(180deg, #090503 0%, #0d0604 100%)",
          }}
        />
        <Embers density={0.7} />
        <Grain />

        <Container className="relative flex flex-col items-center gap-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportSoft}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex items-center gap-4"
          >
            {index !== "—" && <span className="label text-flame">{index}</span>}
            <span className="h-px w-10 bg-flame/40" />
            <span className="label text-bone/60">{eyebrow}</span>
          </motion.div>

          <h2 className="display text-[clamp(2.4rem,1.2rem+5.4vw,6.4rem)] text-bone">
            <RevealText text={"Let’s build something"} stagger={0.06} />
            <RevealText
              text={"meaningful."}
              delay={0.12}
              lineClassName="accent font-normal tracking-[-0.02em] text-glow"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSoft}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="max-w-[46ch] text-[0.98rem] leading-[1.65] text-bone/70 md:text-[1.05rem]"
          >
            Open to internships and AI/ML roles, research collaborations, or a conversation about
            something you are trying to make work. I reply to everything.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSoft}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <MagneticButton strength={0.3}>
              <Link
                href="/contact"
                data-cursor="Talk"
                className="group relative flex h-14 items-center gap-4 overflow-hidden rounded-full bg-bone pl-7 pr-2 text-[0.95rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-500 hover:text-bone md:h-16 md:pl-9 md:text-[1.02rem]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-blood via-rust to-ember transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <span className="relative">Start a conversation</span>
                <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-ember text-bone transition-colors duration-500 group-hover:bg-bone group-hover:text-ink md:h-12 md:w-12">
                  <Arrow className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-8" />
                  <Arrow className="absolute h-4 w-4 -translate-x-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </span>
              </Link>
            </MagneticButton>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { l: "Email", h: `mailto:${site.email}` },
                { l: "GitHub", h: site.github },
                { l: "LinkedIn", h: site.linkedin },
                { l: "Instagram", h: site.instagram },
                { l: "Résumé", h: site.resume },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.h}
                  target={s.h.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="label text-bone/55 transition-colors duration-300 hover:text-flame"
                >
                  {s.l}
                </a>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
