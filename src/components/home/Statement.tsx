"use client";

import ScrollWords from "@/components/ui/ScrollWords";
import ArrowLink from "@/components/ui/ArrowLink";
import Marquee from "@/components/ui/Marquee";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Statement() {
  return (
    <>
      <Section className="pb-16 pt-28 md:pb-20 md:pt-40 lg:pt-48">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex items-start gap-4 lg:col-span-3">
            <span className="label text-flame">01</span>
            <span className="mt-[3px] h-px w-10 shrink-0 bg-flame/40" />
            <span className="label text-dust">Introduction</span>
          </div>

          <div className="lg:col-span-9">
            <ScrollWords
              className="text-[clamp(1.4rem,1rem+1.9vw,2.6rem)] font-medium leading-[1.28] tracking-[-0.035em] text-bone"
              text="I’m a Computer Science undergraduate at VIT Chennai specialising in AI and machine learning. I build systems that put the evidence in front of you instead of asking to be trusted — a weld detector you can interrogate, a recovery pipeline graded against ground truth, a matcher whose score you can reproduce by hand."
              highlight={["evidence", "reproduce"]}
            />

            <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              <ArrowLink href="/about" cursor="Read">
                More about me
              </ArrowLink>
              <ArrowLink href="/projects" cursor="View" tone="ember">
                See the work
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <div className="relative border-y border-bone/[0.07] py-7 md:py-9">
        <Marquee
          items={["Data", "Ideas", "Models", "Impact"]}
          baseVelocity={1.6}
          className="edge-fade-x display text-[clamp(2.2rem,6vw,5rem)] text-bone/[0.14]"
        />
      </div>
    </>
  );
}
