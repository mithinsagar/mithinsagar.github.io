"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** split into words instead of whole lines */
  words?: boolean;
  once?: boolean;
  /** animate immediately rather than on scroll */
  immediate?: boolean;
  amount?: number;
};

/**
 * Masked reveal: each line (or word) sits in an overflow-hidden box and slides
 * up into place. Used for headlines only — body copy just fades.
 */
export default function RevealText({
  text,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.08,
  words = false,
  once = true,
  immediate = false,
  amount = 0.5,
}: Props) {
  const parts = words ? text.split(" ") : text.split("\n");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once, amount } })}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          className={words ? "inline-block overflow-hidden align-bottom" : "block overflow-hidden"}
        >
          <motion.span
            variants={item}
            className={`${words ? "inline-block" : "block"} ${lineClassName}`}
          >
            {part}
            {words && i < parts.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
