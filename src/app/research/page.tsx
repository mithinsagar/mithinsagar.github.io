import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PublicationCard from "@/components/sections/PublicationCard";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { publications, researchWork, researchInterests } from "@/data/publications";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Publications and research work by Mithin Sagar — automated AWS resource cleanup (ICANDIT 2026), adversarial robustness of explanations, and explainable resume analysis.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        index="05"
        eyebrow="Research"
        title={"Papers, and the\nwork behind them."}
        variant="research"
        lead="One conference paper presented, two research frameworks with reproducible evaluations. Everything here has a repository; nothing here claims a number it cannot recompute."
        meta={[
          { label: "Publications", value: "1 presented" },
          { label: "Frameworks", value: "2" },
          { label: "Focus", value: "Explainability & robustness" },
        ]}
      />

      {/* ---------------- publications ---------------- */}
      <Section>
        <SectionHeading
          index="—"
          eyebrow="Publications"
          title="The archive."
          lead="Click a record to open its abstract."
        />
        <div className="mt-14 flex flex-col gap-5 md:mt-18">
          {publications.map((p, i) => (
            <PublicationCard key={p.id} pub={p} index={i} />
          ))}
        </div>
      </Section>

      {/* ---------------- research work ---------------- */}
      <Section className="border-t border-bone/[0.07]">
        <SectionHeading
          index="—"
          eyebrow="Research work"
          title={"Frameworks,\nnot findings."}
          lead="Two bodies of work that behave like research even though they live in a repository: a formal metric, a controlled comparison, and a result that can be re-run."
        />
        <div className="mt-14 grid gap-6 md:mt-18 lg:grid-cols-2">
          {researchWork.map((r) => (
            <Reveal key={r.id}>
              <article className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl border border-bone/[0.09] p-8 transition-colors duration-500 hover:border-flame/25 md:p-10">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(100% 80% at 100% 0%, rgba(196,60,12,0.2), transparent 62%)",
                  }}
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="label text-flame">{r.kind}</span>
                  <span className="label-sm text-mute">{r.year}</span>
                </div>
                <h3 className="max-w-[26ch] text-[1.2rem] font-semibold leading-[1.24] tracking-[-0.032em] text-bone md:text-[1.45rem]">
                  {r.title}
                </h3>
                <p className="flex-1 text-[0.92rem] leading-[1.7] text-dust">{r.summary}</p>
                <div className="flex items-end justify-between gap-6 border-t border-bone/10 pt-6">
                  <span className="flex flex-col gap-1.5">
                    <span className="font-mono text-[1.6rem] leading-none text-bone">
                      {r.stat.value}
                    </span>
                    <span className="label-sm text-mute">{r.stat.label}</span>
                  </span>
                  <span className="flex flex-col items-end gap-3">
                    <Link
                      href={r.href}
                      data-cursor="Open"
                      className="label-sm text-bone/60 transition-colors duration-300 hover:text-flame"
                    >
                      Case study →
                    </Link>
                    <a
                      href={r.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-sm text-bone/60 transition-colors duration-300 hover:text-flame"
                    >
                      Source ↗
                    </a>
                  </span>
                </div>
                {r.collaborators && (
                  <p className="text-[0.78rem] leading-relaxed text-mute">{r.collaborators}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- interests ---------------- */}
      <Section className="border-t border-bone/[0.07]">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-[clamp(1.9rem,1.3rem+2vw,3rem)] text-bone">
              What I keep
              <br />
              coming back to.
            </h2>
          </Reveal>
          <ol className="flex flex-col lg:col-span-7 lg:col-start-6">
            {researchInterests.map((r, i) => (
              <Reveal
                key={r.title}
                delay={i * 0.05}
                className="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-bone/[0.09] py-7 last:border-b md:gap-8 md:py-9"
              >
                <span className="label-sm pt-1.5 text-flame/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[1.05rem] font-medium tracking-[-0.028em] text-bone md:text-[1.18rem]">
                    {r.title}
                  </h3>
                  <p className="max-w-[54ch] text-[0.92rem] leading-[1.68] text-dust">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal delay={0.1} className="mt-14">
          <ArrowLink href="/projects" cursor="View" tone="ember">
            See how it shows up in the work
          </ArrowLink>
        </Reveal>
      </Section>

      <ContactCTA index="—" eyebrow="Collaborate" />
    </>
  );
}
