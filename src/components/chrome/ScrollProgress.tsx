"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import { flatNav } from "@/data/site";

export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const idx = flatNav.findIndex((n) =>
    n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)
  );
  const current = idx >= 0 ? idx : flatNav.length - 1;
  const label = pathname.startsWith("/projects/")
    ? "Project"
    : flatNav[current]?.label ?? "";

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[115] h-px origin-left bg-gradient-to-r from-rust via-ember to-glow"
        style={{ scaleX: width }}
      />
      {pathname !== "/" && (
        <div
          aria-hidden
          className="pointer-events-none fixed bottom-6 left-6 z-[95] hidden items-center gap-3 lg:flex"
        >
          <span className="label-sm text-flame">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-bone/20" />
          <span className="label-sm text-dust">{label}</span>
          <span className="label-sm text-mute">
            / {String(flatNav.length).padStart(2, "0")}
          </span>
        </div>
      )}
    </>
  );
}
