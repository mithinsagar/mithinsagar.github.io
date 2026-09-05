"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { projects, type Project } from "@/data/projects";
import ProjectCover from "@/components/projects/ProjectCover";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import Section from "@/components/ui/Section";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";

function Row({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const flip = i % 2 === 1;

  return (
    <div
      ref={ref}
      className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <motion.div
        className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <Link
          href={`/projects/${project.slug}`}
          data-cursor="Open"
          className="relative block aspect-[16/11] overflow-hidden rounded-[1.25rem] border border-bone/[0.08] bg-ink"
        >
          <motion.div className="absolute inset-[-7%]" style={{ y: reduced ? 0 : y }}>
            <div className="relative h-full w-full">
              <ProjectCover
                project={project}
                sizes="(max-width: 1024px) 92vw, 58vw"
                priority={i === 0}
              />
            </div>
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 ring-1 ring-inset ring-flame/40 transition-opacity duration-700 group-hover:opacity-100"
          />
        </Link>
      </motion.div>

      <motion.div
        className={`flex flex-col gap-5 lg:col-span-4 ${
          flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"
        }`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: EASE, delay: 0.12 }}
      >
        <div className="flex items-center gap-3">
          <span className="label text-flame">{String(i + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-flame/35" />
          <span className="label text-dust">{project.categories.join(" · ")}</span>
        </div>

        <Link href={`/projects/${project.slug}`} className="group/t">
          <h3 className="display text-[clamp(1.9rem,1.3rem+2vw,3rem)] text-bone transition-colors duration-400 group-hover/t:text-flame">
            {project.name}
          </h3>
        </Link>

        <p className="accent max-w-[34ch] text-[1.15rem] leading-[1.42] text-linen/85 md:text-[1.28rem]">
          &ldquo;{project.hook}&rdquo;
        </p>

        <div className="grid grid-cols-3 gap-x-4 gap-y-4 border-t border-bone/10 pt-4">
          {project.metrics.slice(0, 3).map((m) => (
            <span key={m.label} className="flex flex-col gap-1.5">
              <span className="font-mono text-[1.02rem] leading-none text-bone">{m.value}</span>
              <span className="label-sm leading-[1.4] text-mute">{m.label}</span>
            </span>
          ))}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-7 gap-y-3">
          <ArrowLink href={`/projects/${project.slug}`} cursor="Open">
            Case study
          </ArrowLink>
          {project.demo && (
            <ArrowLink href={project.demo} external tone="ember" cursor="Live">
              Live demo
            </ArrowLink>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <Section id="work">
      <SectionHeading
        index="02"
        eyebrow="Selected work"
        title={"Systems, not\ndemos."}
        lead="Nine repositories, each one shipped with the measurement that justifies its claims. Three of them are below; the rest are one click away."
        action={
          <ArrowLink href="/projects" cursor="View">
            All {projects.length} projects
          </ArrowLink>
        }
      />
      <div className="mt-20 flex flex-col gap-24 md:mt-24 md:gap-32 lg:gap-40">
        {featured.map((p, i) => (
          <Row key={p.slug} project={p} i={i} />
        ))}
      </div>
    </Section>
  );
}
