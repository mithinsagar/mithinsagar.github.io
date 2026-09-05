"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

type P = { x: number; y: number; r: number; vy: number; drift: number; phase: number; a: number };

/**
 * Warm dust drifting upward. Deliberately near-invisible: you should notice it
 * a few seconds after you notice everything else, if at all.
 */
export default function Embers({
  density = 1,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: P[] = [];
    let raf = 0;
    let last = performance.now();

    const seed = () => {
      const base = Math.min(window.innerWidth, 1600) / 1600;
      const count = Math.round((window.innerWidth < 768 ? 16 : 42) * density * (0.55 + base * 0.45));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.35 + Math.random() * 1.15,
        vy: 5 + Math.random() * 16,
        drift: 6 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        a: 0.05 + Math.random() * 0.24,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.vy * dt;
        p.phase += dt * 0.55;
        const x = p.x + Math.sin(p.phase) * p.drift;
        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        const flicker = 0.72 + Math.sin(p.phase * 2.1) * 0.28;
        const alpha = p.a * flicker * 0.5;
        const g = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255,168,96,${alpha})`);
        g.addColorStop(0.45, `rgba(255,110,40,${alpha * 0.42})`);
        g.addColorStop(1, "rgba(255,90,31,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    let onScreen = true;
    let running = false;

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const onVisibility = () => sync();

    resize();
    // Only burn frames while the field is actually on screen.
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        sync();
      },
      { rootMargin: "120px" }
    );
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
