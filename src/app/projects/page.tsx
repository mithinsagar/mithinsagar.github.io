import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Nine projects by Mithin Sagar — agentic AI, computer vision, explainable machine learning, cloud automation and full-stack systems, each shipped with the measurement behind its claims.",
};

const liveCount = projects.filter((p) => p.demo).length;

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Projects"
        title={"Nine things\nI shipped."}
        variant="projects"
        lead="Every one of these is a public repository with a README that states what it measured and how. Filter by discipline, or search for a technology."
        meta={[
          { label: "Repositories", value: String(projects.length) },
          { label: "Live demos", value: String(liveCount) },
          { label: "Years", value: "2025 — 2026" },
        ]}
        aside={
          <ArrowLink href={site.github} external tone="ember" cursor="GitHub">
            github.com/{site.githubUser}
          </ArrowLink>
        }
      />

      <Section className="pt-16 md:pt-20">
        <ProjectsExplorer />
      </Section>

      {/* github strip */}
      <Section className="border-t border-bone/[0.07] py-20 md:py-24">
        <Reveal className="flex flex-col gap-8 rounded-2xl border border-bone/[0.09] p-8 md:flex-row md:items-center md:justify-between md:p-11">
          <div className="flex flex-col gap-3">
            <span className="label text-flame">Source</span>
            <h2 className="text-[1.35rem] font-semibold tracking-[-0.035em] text-bone md:text-[1.75rem]">
              Everything above is open.
            </h2>
            <p className="max-w-[52ch] text-[0.92rem] leading-relaxed text-dust">
              Models, datasets and Spaces live on Hugging Face; the code, tests and CI live on
              GitHub. If a number appears in a README, the script that produced it is in the same
              repository.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4">
            <ArrowLink href={site.github} external tone="ember" cursor="GitHub">
              GitHub
            </ArrowLink>
            <ArrowLink href={site.huggingface} external cursor="Open">
              Hugging Face
            </ArrowLink>
          </div>
        </Reveal>
      </Section>

      <ContactCTA index="—" eyebrow="Next" />
    </>
  );
}
