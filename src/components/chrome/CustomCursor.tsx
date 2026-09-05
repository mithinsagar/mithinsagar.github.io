"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

/**
 * Two-part cursor: a small solid dot that tracks exactly, and a ring that lags
 * behind it. Interactive elements expand the ring and can name themselves with
 * data-cursor="View" so the ring carries a verb.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) {
      document.body.removeAttribute("data-custom-cursor");
      return;
    }
    document.body.setAttribute("data-custom-cursor", "on");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) setVisible(true);
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      ) as HTMLElement | null;
      if (el) {
        setActive(true);
        setLabel(el.dataset.cursor ?? null);
      } else {
        setActive(false);
        setLabel(null);
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
      document.body.removeAttribute("data-custom-cursor");
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      <div
        ref={ring}
        className="absolute left-0 top-0 -ml-[24px] -mt-[24px] grid h-12 w-12 place-items-center rounded-full border border-flame/45 transition-[opacity,width,height,margin,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: visible ? 1 : 0,
          width: label ? 88 : active ? 56 : 34,
          height: label ? 88 : active ? 56 : 34,
          marginLeft: label ? -44 : active ? -28 : -17,
          marginTop: label ? -44 : active ? -28 : -17,
          backgroundColor: label ? "rgba(255,90,31,0.14)" : "transparent",
        }}
      >
        <span
          className="label-sm text-[9px] tracking-[0.18em] text-glow transition-opacity duration-300"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-flame transition-opacity duration-300"
        style={{ opacity: visible && !label ? 1 : 0 }}
      />
    </div>
  );
}
