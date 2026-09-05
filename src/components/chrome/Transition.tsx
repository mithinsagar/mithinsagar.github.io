"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { EASE, EASE_IN_OUT } from "@/lib/motion";
import { flatNav } from "@/data/site";
import { useReducedMotion } from "@/lib/hooks";

type Phase = "idle" | "cover" | "reveal";

const Ctx = createContext<{ navigate: (href: string) => void; busy: boolean }>({
  navigate: () => {},
  busy: false,
});

export const useTransitionRouter = () => useContext(Ctx);

const labelFor = (href: string) => {
  const exact = flatNav.find((n) => n.href === href);
  if (exact) return exact.label;
  if (href.startsWith("/projects/")) return "Project";
  return "";
};

const COVER_MS = 420;

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const first = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (reduced) {
        router.push(href);
        return;
      }
      setLabel(labelFor(href));
      setPhase("cover");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => router.push(href), COVER_MS);
    },
    [pathname, reduced, router]
  );

  // Intercept internal anchor clicks so every navigation plays the wipe.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const last = href.split("?")[0].split("#")[0].split("/").pop() ?? "";
      if (last.includes(".")) return; // static file
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPhase((p) => (p === "cover" ? "reveal" : p));
  }, [pathname]);

  return (
    <Ctx.Provider value={{ navigate, busy: phase !== "idle" }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="curtain"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[110]"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={
              phase === "cover"
                ? { clipPath: "inset(0% 0% 0% 0%)" }
                : { clipPath: "inset(0% 0% 100% 0%)" }
            }
            transition={{
              duration: phase === "cover" ? COVER_MS / 1000 : 0.72,
              ease: phase === "cover" ? EASE_IN_OUT : EASE,
            }}
            onAnimationComplete={() => {
              if (phase === "reveal") setPhase("idle");
            }}
          >
            <div className="relative h-full w-full overflow-hidden bg-ink">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #060402 0%, #140a05 38%, #451103 70%, #b5350a 90%, #ff8a3d 100%)",
                }}
              />
              <div
                className="absolute inset-x-0 top-0 h-40 opacity-70 blur-2xl"
                style={{
                  background:
                    "radial-gradient(60% 100% at 50% 100%, rgba(255,170,90,0.85), transparent 70%)",
                }}
              />
              <div className="grain absolute inset-0" />
              <motion.span
                className="label absolute bottom-[12vh] left-1/2 -translate-x-1/2 text-glow/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: phase === "cover" ? 1 : 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {label}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
