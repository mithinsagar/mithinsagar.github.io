"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Lightbox, { type LightboxItem } from "@/components/ui/Lightbox";
import { EASE } from "@/lib/motion";

export default function ProjectGallery({
  images,
  name,
}: {
  images: { src: string; w: number; h: number; lqip: string }[];
  name: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const items: LightboxItem[] = images.map((im, i) => ({
    ...im,
    title: `${name} — screen ${String(i + 1).padStart(2, "0")}`,
  }));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
        {images.map((im, i) => (
          <motion.button
            key={im.src}
            onClick={() => setOpen(i)}
            data-cursor="View"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.08 }}
            className={`group relative overflow-hidden rounded-xl border border-bone/[0.08] bg-ink ${
              i === 0 ? "sm:col-span-2" : ""
            }`}
            style={{ aspectRatio: i === 0 ? "16 / 9" : `${im.w} / ${im.h}` }}
            aria-label={`Open screen ${i + 1} of ${name}`}
          >
            <Image
              src={im.src}
              alt={`${name} interface, screen ${i + 1}`}
              fill
              sizes="(max-width: 640px) 92vw, 46vw"
              placeholder="blur"
              blurDataURL={im.lqip}
              className="object-cover object-top sepia-[0.1] saturate-[0.9] brightness-[0.86] transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-hover:sepia-0 group-hover:saturate-100 group-hover:brightness-100"
            />
            <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-inset ring-flame/40 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="label-sm pointer-events-none absolute bottom-3 left-3 rounded-full bg-void/75 px-2.5 py-1.5 text-bone/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.button>
        ))}
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
