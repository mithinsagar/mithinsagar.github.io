"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { gradeFor, photos, seriesInfo } from "@/data/photos";
import Lightbox, { type LightboxItem } from "@/components/ui/Lightbox";
import { EASE } from "@/lib/motion";

export default function PhotoGallery() {
  const [series, setSeries] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(
    () => (series === "all" ? photos : photos.filter((p) => p.series === series)),
    [series]
  );

  const items: LightboxItem[] = list.map((p) => ({
    src: p.src,
    w: p.w,
    h: p.h,
    lqip: p.lqip,
    title: p.title,
    caption: p.caption,
    meta: p.meta,
  }));

  return (
    <>
      {/* series switch */}
      <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {[{ id: "all", name: "Everything", note: `${photos.length} frames` }, ...seriesInfo].map(
            (s) => {
              const active = series === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSeries(s.id)}
                  className={`relative rounded-full px-4 py-2.5 text-[0.84rem] font-medium tracking-tight transition-colors duration-300 ${
                    active ? "text-ink" : "text-bone/60 hover:text-bone"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="series-pill"
                      className="absolute inset-0 rounded-full bg-bone"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative">{s.name}</span>
                </button>
              );
            }
          )}
        </div>
        <p className="max-w-[46ch] text-[0.88rem] leading-relaxed text-dust">
          {series === "all"
            ? "Two series. Available light in both — no flash, no reshoots."
            : seriesInfo.find((s) => s.id === series)?.blurb}
        </p>
      </div>

      {/* asymmetric masonry */}
      <div className="columns-1 gap-4 sm:columns-2 md:gap-6 xl:columns-3">
        {list.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => setOpen(i)}
            data-cursor="View"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.06 }}
            className="group relative mb-4 block w-full overflow-hidden rounded-xl border border-bone/[0.08] bg-ink md:mb-6"
            style={{ aspectRatio: `${p.w} / ${p.h}`, breakInside: "avoid" }}
            aria-label={`Open ${p.title}`}
          >
            <Image
              src={p.src}
              alt={p.title}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 30vw"
              placeholder="blur"
              blurDataURL={p.lqip}
              className={`object-cover transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.055] ${gradeFor(p.series)}`}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-100"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-1 p-5 text-left opacity-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-[0.95rem] font-medium tracking-tight text-bone">{p.title}</span>
              <span className="label-sm text-flame/85">{p.meta}</span>
            </figcaption>
          </motion.button>
        ))}
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
