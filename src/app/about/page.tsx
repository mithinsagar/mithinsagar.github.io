import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import ScrollWords from "@/components/ui/ScrollWords";
import ArrowLink from "@/components/ui/ArrowLink";
import Grain from "@/components/chrome/Grain";
import { skillGroups, principles } from "@/data/skills";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mithin Sagar S — Computer Science undergraduate at VIT Chennai specialising in AI and machine learning. Engineering philosophy, skills, tools and current focus.",
};

const facts = [
  { k: "Based in", v: "Chennai, India" },
  { k: "Studying", v: "B.Tech CSE — AI & ML, VIT Chennai" },
  { k: "Graduating", v: "May 2027" },
  { k: "Focus", v: "Explainable, measurable AI systems" },
  { k: "Also", v: "Photography, live events, team leadership" },
  { k: "Open to", v: "Internships and AI/ML roles" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="About"
        title={"Engineer first,\ncurious always."}
        variant="about"
        lead="I’m a Computer Science undergraduate at VIT Chennai, specialising in AI and machine learning. Most of what I build starts as a question I couldn’t answer by reading — so I build the thing that answers it."
        meta={[
          { label: "Location", value: "Chennai, India" },
          { label: "Programme", value: "B.Tech CSE (AI & ML)" },
          { label: "Class of", value: "2027" },
        ]}
      />

      {/* ---------------- portrait + bio ---------------- */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <div className="relative overflow-hidden rounded-2xl border border-bone/[0.08]">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(78% 62% at 50% 46%, #ff7326 0%, #c93409 32%, #63120433 58%, #12040300 86%), linear-gradient(180deg, #200a04 0%, #0d0503 100%)",
                }}
              />
              <Grain />
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/portrait/mithin.webp"
                  alt="Portrait of Mithin Sagar"
                  fill
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="object-contain object-bottom"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.7) 88%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.7) 88%, transparent 100%)",
                  }}
                />
              </div>
              <div className="relative flex items-center justify-between gap-4 border-t border-bone/10 bg-void/70 px-5 py-4">
                <span className="label-sm text-bone/80">{site.name}</span>
                <span className="label-sm text-flame">AI / ML Engineer</span>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <span className="label text-dust">The short version</span>
            </Reveal>
            <ScrollWords
              className="text-[clamp(1.25rem,0.95rem+1.3vw,1.9rem)] font-medium leading-[1.34] tracking-[-0.032em] text-bone"
              text="I build machine learning systems that can be checked. The model is the easy half; the hard half is making its answer inspectable by someone who did not train it."
              highlight={["checked", "inspectable"]}
            />

            <Reveal delay={0.1} className="flex flex-col gap-5 text-[0.95rem] leading-[1.72] text-dust">
              <p>
                That habit came from a real failure. During an internship at IGCAR I fine-tuned a
                YOLOv8 detector for weld inspection and watched it score 99.1% on training data and
                74.3% on held-out. The interesting work was not the training run — it was diagnosing
                the overfit, revising the dataset and splits, and explaining the trade-off to
                scientific staff who needed a decision, not a metric.
              </p>
              <p>
                Since then almost everything I build has the same shape. A deterministic core that
                owns the number and always completes. A retrieval or language-model layer that can
                only describe the result, never move it. And a benchmark that fails loudly when a
                claim in the README stops being true.
              </p>
              <p>
                Outside the terminal I lead student teams and shoot live events. Both of those turn
                out to be the same skill as engineering: reduce the ambiguity, shorten the feedback
                loop, and make it obvious to the next person what is going on.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="grid gap-px overflow-hidden rounded-xl border border-bone/[0.08] bg-bone/[0.06] sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.k} className="flex flex-col gap-1.5 bg-ink px-5 py-4">
                    <dt className="label-sm text-mute">{f.k}</dt>
                    <dd className="text-[0.9rem] tracking-tight text-bone/90">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------- principles ---------------- */}
      <Section className="border-t border-bone/[0.07]">
        <SectionHeading
          index="—"
          eyebrow="How I work"
          title={"Four rules I\ndon’t break."}
          lead="Not a manifesto. Just the things that kept turning out to matter."
        />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-bone/[0.08] bg-bone/[0.06] md:mt-20 md:grid-cols-2">
          {principles.map((p) => (
            <li key={p.n} className="group flex flex-col gap-4 bg-ink p-8 transition-colors duration-500 hover:bg-char md:p-10">
              <span className="label text-flame/85">{p.n}</span>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.03em] text-bone md:text-[1.35rem]">
                {p.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.68] text-dust">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------- skills ---------------- */}
      <Section className="border-t border-bone/[0.07]">
        <SectionHeading
          index="—"
          eyebrow="Skills & tools"
          title="What I reach for."
          action={
            <ArrowLink href={site.resume} external cursor="Open">
              Download résumé
            </ArrowLink>
          }
        />
        <div className="mt-14 flex flex-col md:mt-20">
          {skillGroups.map((g, gi) => (
            <Reveal
              key={g.id}
              delay={gi * 0.05}
              className="grid gap-4 border-t border-bone/[0.09] py-7 md:grid-cols-[16rem_1fr] md:gap-10 md:py-9 last:border-b"
            >
              <h3 className="flex items-baseline gap-4 text-[1.02rem] font-medium tracking-[-0.02em] text-bone">
                <span className="label-sm text-flame/70">{String(gi + 1).padStart(2, "0")}</span>
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-bone/[0.11] px-3.5 py-2 text-[0.82rem] tracking-tight text-bone/70 transition-all duration-500 hover:-translate-y-0.5 hover:border-flame/40 hover:text-bone"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <ContactCTA index="—" eyebrow="Next" />
    </>
  );
}
