"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { nav, site } from "@/data/site";
import { EASE } from "@/lib/motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { Arrow } from "@/components/ui/ArrowLink";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [more, setMore] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 28));

  // Close the dropdown when the route changes, derived rather than in an effect.
  const [morePath, setMorePath] = useState(pathname);
  if (morePath !== pathname) {
    setMorePath(pathname);
    if (more) setMore(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // The CTA points at /contact — once you are there it has nothing left to say.
  const onContact = pathname.startsWith("/contact");

  const moreActive = nav
    .find((n) => n.children)
    ?.children?.some((c) => pathname.startsWith(c.href));

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[100]"
        style={{ padding: "var(--page-inset)" }}
      >
        <div
          className={`pointer-events-auto relative mx-auto flex items-center justify-between rounded-full pl-5 pr-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:pl-8 md:pr-3 ${
            scrolled
              ? "glass h-14 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)] md:h-16"
              : "h-14 border border-transparent bg-transparent md:h-[4.25rem]"
          }`}
        >
          {/* wordmark */}
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-2.5"
            aria-label="Mithin Sagar — home"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-ember opacity-70 blur-[3px] transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative h-2 w-2 rounded-full bg-flame" />
            </span>
            <span
              className={`font-semibold tracking-[-0.03em] transition-all duration-700 ${
                scrolled ? "text-[0.95rem]" : "text-base md:text-[1.05rem]"
              }`}
            >
              Mithin Sagar
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex xl:gap-2">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMore(true)}
                  onMouseLeave={() => setMore(false)}
                >
                  <button
                    onClick={() => setMore((v) => !v)}
                    aria-expanded={more}
                    className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.84rem] font-medium tracking-[-0.01em] transition-colors duration-300 xl:px-4 ${
                      moreActive || more ? "text-bone" : "text-bone/55 hover:text-bone/90"
                    }`}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 10 6"
                      className={`h-[5px] w-2.5 transition-transform duration-500 ${
                        more ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                    {moreActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-flame"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {more && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.34, ease: EASE }}
                        className="glass-strong absolute left-1/2 top-full w-64 origin-top -translate-x-1/2 rounded-2xl p-1.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)]"
                        style={{ marginTop: 10 }}
                      >
                        {item.children!.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className={`group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors duration-300 ${
                              pathname.startsWith(c.href)
                                ? "bg-flame/10 text-bone"
                                : "text-bone/70 hover:bg-bone/[0.045] hover:text-bone"
                            }`}
                          >
                            <span>
                              <span className="block text-[0.86rem] font-medium tracking-tight">
                                {c.label}
                              </span>
                              <span className="mt-0.5 block text-[0.7rem] text-dust">{c.note}</span>
                            </span>
                            <Arrow className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-flame opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-[0.84rem] font-medium tracking-[-0.01em] transition-colors duration-300 xl:px-4 ${
                    isActive(item.href) ? "text-bone" : "text-bone/55 hover:text-bone/90"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-flame"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* right cluster */}
          <div className="relative z-10 flex items-center gap-1.5 md:gap-3">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 px-3 text-[0.84rem] font-medium tracking-[-0.01em] text-bone/60 transition-colors duration-300 hover:text-bone sm:flex"
            >
              <span className="link-underline">Résumé</span>
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden>
                <path
                  d="M3 9L9 3M9 3H4.2M9 3v4.8"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <MagneticButton
              strength={0.22}
              className={onContact ? "hidden" : "hidden sm:block"}
            >
              <Link
                href="/contact"
                data-cursor="Talk"
                className="group relative flex h-11 items-center gap-3 overflow-hidden rounded-full bg-bone pl-5 pr-1.5 text-[0.86rem] font-semibold tracking-[-0.015em] text-ink transition-colors duration-500 hover:text-bone"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-rust to-ember transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <span className="relative">Let&rsquo;s talk</span>
                <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-ember text-bone transition-colors duration-500 group-hover:bg-bone group-hover:text-ink">
                  <Arrow className="absolute h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6" />
                  <Arrow className="absolute h-3.5 w-3.5 -translate-x-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </span>
              </Link>
            </MagneticButton>

            <button
              onClick={() => setOpenMenu(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-bone/12 text-bone transition-colors duration-300 hover:border-flame/50 hover:text-flame lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={openMenu} onClose={() => setOpenMenu(false)} />
    </>
  );
}
