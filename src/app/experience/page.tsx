import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import Timeline from "@/components/sections/Timeline";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "The timeline: B.Tech CSE (AI & ML) at VIT Chennai, a machine learning internship at IGCAR, two student leadership terms, and a paper presented at ICANDIT 2026.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        index="04"
        eyebrow="Experience"
        title={"Four years,\nin order."}
        variant="experience"
        lead="Education, an internship, two leadership terms and a conference paper — arranged the way they actually happened, including the part where a model scored 99% on training and 74% on everything else."
        meta={[
          { label: "Internship", value: "IGCAR, Kalpakkam" },
          { label: "Teams led", value: "65+ people" },
          { label: "Paper", value: "ICANDIT 2026" },
        ]}
        aside={
          <ArrowLink href={site.resume} external tone="ember" cursor="Open">
            Full résumé (PDF)
          </ArrowLink>
        }
      />

      <Section>
        <Timeline />
      </Section>

      <Section className="border-t border-bone/[0.07] py-20 md:py-24">
        <Reveal className="grid gap-8 rounded-2xl border border-bone/[0.09] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-11">
          <div className="flex flex-col gap-3">
            <span className="label text-flame">Availability</span>
            <h2 className="text-[1.35rem] font-semibold tracking-[-0.035em] text-bone md:text-[1.75rem]">
              Open to internships and AI/ML roles.
            </h2>
            <p className="max-w-[52ch] text-[0.92rem] leading-relaxed text-dust">
              Graduating May 2027, based in Chennai and comfortable remote. Happy to talk about
              applied ML, computer vision, explainability or anything adjacent.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <ArrowLink href="/contact" tone="ember" cursor="Talk">
              Get in touch
            </ArrowLink>
            <ArrowLink href={site.linkedin} external cursor="Open">
              LinkedIn
            </ArrowLink>
          </div>
        </Reveal>
      </Section>

      <ContactCTA index="—" eyebrow="Next" />
    </>
  );
}
