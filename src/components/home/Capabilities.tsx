"use client";

import { motion } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import { EASE } from "@/lib/motion";

const capabilities = [
  {
    n: "01",
    title: "Machine Learning",
    body: "Classical models trained, cross-validated and calibrated until the reported confidence matches what actually happens. Seven classifiers benchmarked in one command; the best one persisted automatically.",
    tools: ["scikit-learn", "pandas", "Calibration"],
  },
  {
    n: "02",
    title: "Deep Learning & Vision",
    body: "Detection pipelines owned end to end — dataset curation, labelling, GPU training, then the honest part: diagnosing the gap between a 99% training score and a 74% held-out one.",
    tools: ["PyTorch", "YOLOv8", "OpenCV"],
  },
  {
    n: "03",
    title: "Generative AI & Agents",
    body: "Multi-agent graphs where each stage owns one responsibility, retrieval that cites what it found, and language models kept strictly downstream of the number they are describing.",
    tools: ["LangGraph", "RAG", "FAISS"],
  },
  {
    n: "04",
    title: "AI Engineering",
    body: "The part that makes a model a product: typed APIs, Docker images that carry their own weights, CI across a Python version matrix, and tests that fail when a claim stops being true.",
    tools: ["FastAPI", "Docker", "GitHub Actions"],
  },
];

export default function Capabilities() {
  return (
    <Section className="border-t border-bone/[0.07]">
      <SectionHeading
        index="03"
        eyebrow="What I do"
        title={"Four disciplines,\none habit."}
        lead={
          <>
            Different tools, same rule: if a number cannot be reproduced from the repository, it
            does not go in the README.
          </>
        }
        action={
          <ArrowLink href="/about" cursor="Read">
            Skills &amp; tools
          </ArrowLink>
        }
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-bone/[0.08] bg-bone/[0.06] md:mt-20 md:grid-cols-2 xl:grid-cols-4">
        {capabilities.map((c, i) => (
          <motion.article
            key={c.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: EASE, delay: i * 0.07 }}
            className="group relative flex flex-col gap-5 bg-ink p-7 transition-colors duration-500 hover:bg-char md:p-8"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-ember to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
            <span className="label text-flame/80">{c.n}</span>
            <h3 className="text-[1.15rem] font-semibold tracking-[-0.028em] text-bone">
              {c.title}
            </h3>
            <p className="flex-1 text-[0.88rem] leading-[1.62] text-dust">{c.body}</p>
            <ul className="flex flex-wrap gap-1.5 pt-1">
              {c.tools.map((t) => (
                <li
                  key={t}
                  className="label-sm rounded-full border border-bone/10 px-2.5 py-1.5 text-bone/60 transition-colors duration-500 group-hover:border-flame/25 group-hover:text-bone/80"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
