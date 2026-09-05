"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { EASE } from "@/lib/motion";

export default function ProjectsExplorer() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter((p) => {
      const inCat = cat === "All" || p.categories.includes(cat);
      if (!inCat) return false;
      if (!needle) return true;
      return [p.name, p.subtitle, p.hook, ...p.tech, ...p.categories]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [cat, q]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: projects.length };
    for (const c of CATEGORIES) {
      if (c === "All") continue;
      m[c] = projects.filter((p) => p.categories.includes(c)).length;
    }
    return m;
  }, []);

  return (
    <>
      {/* controls */}
      <div className="relative z-40 -mx-6 mb-12 px-6 md:sticky md:top-[calc(var(--nav-h)+0.75rem)] md:-mx-10 md:px-10">
        <div className="glass-strong flex flex-col gap-4 rounded-2xl p-3 md:flex-row md:items-center md:justify-between md:gap-6 md:p-3.5">
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible md:pb-0">
            {CATEGORIES.filter((c) => c === "All" || counts[c] > 0).map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`relative shrink-0 rounded-full px-3.5 py-2 text-[0.8rem] font-medium tracking-tight transition-colors duration-300 ${
                    active ? "text-ink" : "text-bone/60 hover:text-bone"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-bone"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative">
                    {c}
                    <span className={`ml-1.5 font-mono text-[0.68rem] ${active ? "text-ink/50" : "text-mute"}`}>
                      {counts[c]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <label className="relative flex shrink-0 items-center gap-2.5 rounded-full border border-bone/12 px-4 py-2.5 transition-colors duration-300 focus-within:border-flame/50 md:w-64">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-mute" aria-hidden>
              <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, tech…"
              aria-label="Search projects"
              className="w-full bg-transparent text-[0.82rem] tracking-tight text-bone placeholder:text-mute focus:outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="shrink-0 text-mute transition-colors hover:text-flame"
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </label>
        </div>
      </div>

      {/* grid */}
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <ProjectCard project={p} index={i} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {list.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <span className="label text-flame">No match</span>
          <p className="max-w-[36ch] text-[0.95rem] text-dust">
            Nothing here for &ldquo;{q}&rdquo;{cat !== "All" ? ` in ${cat}` : ""}.
          </p>
          <button
            onClick={() => {
              setQ("");
              setCat("All");
            }}
            className="label text-bone/70 underline underline-offset-4 transition-colors hover:text-flame"
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
