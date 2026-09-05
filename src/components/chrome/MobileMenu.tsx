"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { flatNav, site } from "@/data/site";
import { EASE, EASE_IN_OUT } from "@/lib/motion";
import { useScrollLock } from "@/lib/hooks";
import Grain from "./Grain";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  useScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[105] lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.62, ease: EASE_IN_OUT }}
        >
          <div className="absolute inset-0 bg-ink" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(90% 60% at 50% 105%, rgba(196,60,12,0.5), transparent 70%)",
            }}
          />
          <Grain />

          <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-6">
            <div className="flex items-center justify-between">
              <span className="label text-dust">Menu</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone transition-colors hover:border-flame/60 hover:text-flame"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                  <path
                    d="M2 2l12 12M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex min-h-0 flex-1 flex-col justify-center gap-0.5 overflow-y-auto py-6">
              {flatNav.map((item, i) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <div key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%", transition: { duration: 0.25, ease: EASE } }}
                      transition={{ duration: 0.75, ease: EASE, delay: 0.12 + i * 0.045 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-baseline gap-3 py-1"
                      >
                        <span className="label-sm w-6 shrink-0 text-flame/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`display text-[clamp(1.5rem,7.2vw,2.1rem)] transition-colors duration-300 ${
                            active ? "text-flame" : "text-bone group-hover:text-flame"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="flex flex-col gap-4 border-t border-bone/10 pt-6"
            >
              <a
                href={`mailto:${site.email}`}
                className="text-[0.95rem] tracking-tight text-bone/85"
              >
                {site.email}
              </a>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {[
                  { l: "GitHub", h: site.github },
                  { l: "LinkedIn", h: site.linkedin },
                  { l: "Hugging Face", h: site.huggingface },
                  { l: "Instagram", h: site.instagram },
                  { l: "X", h: site.x },
                  { l: "Résumé", h: site.resume },
                ].map((s) => (
                  <a
                    key={s.l}
                    href={s.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-sm text-dust transition-colors hover:text-flame"
                  >
                    {s.l}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
