"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/data/projects";
import ProjectCover from "./ProjectCover";
import { EASE } from "@/lib/motion";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

export default function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const tilt = fine && !reduced;
  const [hover, setHover] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 180,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5.5, 5.5]), {
    stiffness: 180,
    damping: 22,
  });

  const onMove = (e: React.PointerEvent) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHover(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.95, ease: EASE, delay: (index % 3) * 0.08 }}
      className="group relative"
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={onLeave}
        style={
          tilt
            ? { rotateX: rx, rotateY: ry, transformPerspective: 1100 }
            : undefined
        }
        className="relative"
      >
        <Link
          href={`/projects/${project.slug}`}
          data-cursor="Open"
          className="block focus-visible:outline-none"
          aria-label={`${project.name} — ${project.subtitle}`}
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-[1.15rem] border border-bone/[0.08] bg-ink">
            <ProjectCover project={project} priority={priority} />

            {/* index + categories */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5">
              <span className="label-sm rounded-full bg-void/70 px-2.5 py-1.5 text-bone/75">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="label-sm rounded-full bg-void/70 px-2.5 py-1.5 text-flame">
                {project.categories[0]}
              </span>
            </div>

            {/* tech tags reveal */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t, i) => (
                  <motion.span
                    key={t}
                    initial={false}
                    animate={{
                      opacity: hover ? 1 : 0,
                      y: hover ? 0 : 10,
                    }}
                    transition={{ duration: 0.5, ease: EASE, delay: hover ? i * 0.045 : 0 }}
                    className="label-sm rounded-full border border-bone/15 bg-void/78 px-2.5 py-1.5 text-bone/85"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* glow border on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[1.15rem] opacity-0 ring-1 ring-inset ring-flame/45 transition-opacity duration-700 group-hover:opacity-100"
            />
          </div>
        </Link>

        <div className="mt-5 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="text-[1.28rem] font-semibold tracking-[-0.032em] text-bone transition-colors duration-300 group-hover:text-flame md:text-[1.42rem]"
            >
              {project.name}
            </Link>
            <span className="label-sm shrink-0 text-mute">{project.year}</span>
          </div>
          <p className="max-w-[46ch] text-[0.9rem] leading-relaxed text-dust">
            {project.subtitle}
          </p>

          <div className="mt-1.5 flex items-center gap-5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GitHub"
                className="label-sm text-bone/55 transition-colors duration-300 hover:text-flame"
              >
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Live"
                className="label-sm text-bone/55 transition-colors duration-300 hover:text-flame"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
