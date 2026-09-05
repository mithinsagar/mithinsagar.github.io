"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import RevealText from "./RevealText";
import { EASE, viewportSoft } from "@/lib/motion";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  action,
  className = "",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-7 ${
        align === "center" ? "items-center text-center" : ""
      } ${className}`}
    >
      {((index && index !== "—") || eyebrow) && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportSoft}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center gap-4"
        >
          {index && index !== "—" ? (
            <>
              <span className="label text-flame">{index}</span>
              <span className="h-px w-10 bg-flame/40" />
            </>
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-flame" />
          )}
          {eyebrow && <span className="label text-dust">{eyebrow}</span>}
        </motion.div>
      )}

      <div
        className={`flex flex-col gap-7 md:flex-row md:items-end md:justify-between ${
          align === "center" ? "md:flex-col md:items-center" : ""
        }`}
      >
        <h2 className="display max-w-[19ch] text-[clamp(2.1rem,1.15rem+4.1vw,4.6rem)]">
          <RevealText text={title} stagger={0.07} />
        </h2>
        {action && <div className="shrink-0 md:pb-2">{action}</div>}
      </div>

      {lead && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSoft}
          transition={{ duration: 0.95, ease: EASE, delay: 0.12 }}
          className={`body-lg max-w-[58ch] ${align === "center" ? "mx-auto" : ""}`}
        >
          {lead}
        </motion.div>
      )}
    </div>
  );
}
