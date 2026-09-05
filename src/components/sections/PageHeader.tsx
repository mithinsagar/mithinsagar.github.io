"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import RevealText from "@/components/ui/RevealText";
import { Container } from "@/components/ui/Section";
import Grain from "@/components/chrome/Grain";
import Embers from "@/components/chrome/Embers";
import { EASE } from "@/lib/motion";

/** Each page gets its own light, mixed from the same palette. */
const fields: Record<string, string> = {
  about:
    "radial-gradient(85% 95% at 18% 8%, #d8450d 0%, #91200612 55%, transparent 74%), linear-gradient(150deg, #1a0e07 0%, #0a0604 62%, #070403 100%)",
  projects:
    "radial-gradient(70% 90% at 88% 4%, #c4370a 0%, #6a12040f 52%, transparent 72%), linear-gradient(200deg, #150d08 0%, #090504 70%)",
  experience:
    "radial-gradient(120% 70% at 50% 0%, #b8330a 0%, #4a0e0310 48%, transparent 70%), linear-gradient(180deg, #130b06 0%, #080403 100%)",
  research:
    "radial-gradient(65% 100% at 8% 92%, #a82b08 0%, #3d0a0310 50%, transparent 72%), linear-gradient(160deg, #100a07 0%, #070403 100%)",
  leadership:
    "radial-gradient(95% 85% at 74% 96%, #d14a10 0%, #6b160410 52%, transparent 74%), linear-gradient(140deg, #150d08 0%, #080503 100%)",
  achievements:
    "radial-gradient(60% 80% at 50% 6%, #c9410c 0%, #55100310 52%, transparent 72%), linear-gradient(190deg, #120a06 0%, #070403 100%)",
  photography:
    "radial-gradient(90% 110% at 96% 40%, #b83309 0%, #480d0310 50%, transparent 74%), linear-gradient(120deg, #0e0806 0%, #060403 100%)",
  currently:
    "radial-gradient(80% 90% at 10% 20%, #e05412 0%, #7a180510 52%, transparent 74%), linear-gradient(170deg, #170e08 0%, #080503 100%)",
  contact:
    "radial-gradient(100% 120% at 50% 120%, #ff6a22 0%, #b8300a 26%, #58100340 52%, transparent 76%), linear-gradient(180deg, #090503 0%, #0b0504 100%)",
};

export default function PageHeader({
  index,
  eyebrow,
  title,
  lead,
  variant = "about",
  meta,
  aside,
  compact = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  variant?: keyof typeof fields;
  meta?: { label: string; value: string }[];
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section style={{ padding: "var(--page-inset)", paddingBottom: 0 }}>
      <div
        className={`relative flex flex-col justify-end overflow-hidden ${
          compact ? "min-h-[46svh]" : "min-h-[62svh]"
        }`}
        style={{ borderRadius: "var(--page-radius)" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: fields[variant] ?? fields.about }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 110% at 50% 40%, transparent 40%, rgba(6,3,1,0.6) 82%, rgba(5,2,1,0.92) 100%)",
          }}
        />
        <Embers density={0.6} />
        <Grain />

        <Container className="relative pb-12 pt-[calc(var(--nav-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--nav-h)+5rem)]">
          <div className="flex flex-col gap-7">
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            >
              <span className="label text-flame">{index}</span>
              <span className="h-px w-10 bg-flame/40" />
              <span className="label text-bone/60">{eyebrow}</span>
            </motion.div>

            <h1 className="display max-w-[16ch] text-[clamp(2.6rem,1.2rem+6vw,7rem)] text-bone">
              <RevealText text={title} immediate delay={0.35} stagger={0.08} />
            </h1>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              {lead && (
                <motion.div
                  className="body-lg max-w-[54ch]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.7 }}
                >
                  {lead}
                </motion.div>
              )}
              {aside && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.85 }}
                  className="shrink-0"
                >
                  {aside}
                </motion.div>
              )}
            </div>

            {meta && (
              <motion.dl
                className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-bone/10 pt-7 sm:flex sm:flex-wrap sm:gap-x-14"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.95 }}
              >
                {meta.map((m) => (
                  <div key={m.label} className="flex flex-col gap-2">
                    <dt className="label-sm text-mute">{m.label}</dt>
                    <dd className="text-[0.92rem] font-medium tracking-tight text-bone/90">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
