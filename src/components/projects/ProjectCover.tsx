"use client";

import Image from "next/image";
import { coverFor, type Project } from "@/data/projects";

const accentRGB: Record<Project["accent"], string> = {
  ember: "255,90,31",
  rust: "196,60,12",
  blood: "110,16,4",
};

/**
 * Every project gets a cover. Where a real product screenshot exists it is used
 * and graded into the palette; where none does, a schematic cover is drawn in
 * code rather than faking a UI that doesn’t exist.
 */
export default function ProjectCover({
  project,
  priority = false,
  sizes = "(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 40vw",
  className = "",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const cover = coverFor(project);
  const rgb = accentRGB[project.accent];

  if (cover) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <Image
          src={cover.src}
          alt={`${project.name} interface`}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={cover.lqip}
          className="object-cover object-top sepia-[0.12] saturate-[0.85] brightness-[0.84] transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] group-hover:sepia-0 group-hover:saturate-100 group-hover:brightness-100"
        />
        {/* warm grade so screenshots belong to the same room */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-40"
          style={{
            background: `radial-gradient(120% 100% at 20% 0%, rgba(${rgb},0.34), transparent 62%)`,
            mixBlendMode: "overlay",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,3,2,0.92) 0%, rgba(6,3,2,0.35) 32%, rgba(6,3,2,0.05) 62%, transparent 100%)",
          }}
        />
      </div>
    );
  }

  // --- schematic cover ---------------------------------------------------
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-ink ${className}`}
      role="img"
      aria-label={`${project.name} — ${project.subtitle}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        style={{
          background: `radial-gradient(95% 85% at 82% 8%, rgba(${rgb},0.5) 0%, rgba(${rgb},0.16) 34%, transparent 68%), linear-gradient(155deg, #1a120d 0%, #0c0705 58%, #070403 100%)`,
        }}
      />
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,238,231,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,238,231,0.5) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(80% 70% at 30% 70%, #000, transparent 78%)",
          WebkitMaskImage: "radial-gradient(80% 70% at 30% 70%, #000, transparent 78%)",
        }}
      />
      {/* oversized monogram, cropped by the frame */}
      <span
        aria-hidden
        className="absolute -bottom-[14%] -right-[3%] select-none font-sans text-[13rem] font-bold leading-none tracking-[-0.06em] text-transparent transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 sm:text-[16rem]"
        style={{
          WebkitTextStroke: `1px rgba(${rgb},0.35)`,
        }}
      >
        {project.glyph}
      </span>
      {/* metric ticker */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6 md:p-7">
        <div className="flex flex-wrap items-end gap-x-7 gap-y-2">
          {project.metrics.slice(0, 2).map((m) => (
            <span key={m.label} className="flex flex-col gap-1">
              <span className="font-mono text-[1.15rem] leading-none text-bone/95">{m.value}</span>
              <span className="label-sm text-dust">{m.label}</span>
            </span>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,3,2,0.75) 0%, transparent 46%)",
        }}
      />
    </div>
  );
}
