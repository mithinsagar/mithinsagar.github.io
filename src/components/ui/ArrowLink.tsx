"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 12h13M12 5.5 18.5 12 12 18.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Text link with an arrow that slides on hover. Handles internal + external. */
export default function ArrowLink({
  href,
  children,
  external = false,
  className = "",
  cursor,
  tone = "bone",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  cursor?: string;
  tone?: "bone" | "ember";
}) {
  const cls = `group/al inline-flex items-center gap-2.5 text-sm font-medium tracking-tight transition-colors duration-300 ${
    tone === "ember" ? "text-flame hover:text-glow" : "text-bone/85 hover:text-bone"
  } ${className}`;

  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <span className="relative grid h-4 w-4 shrink-0 place-items-center overflow-hidden">
        <Arrow className="absolute h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/al:translate-x-5" />
        <Arrow className="absolute h-3.5 w-3.5 -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/al:translate-x-0" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-cursor={cursor}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-cursor={cursor}>
      {inner}
    </Link>
  );
}
