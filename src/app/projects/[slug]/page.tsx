import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, galleryFor } from "@/data/projects";
import ProjectCover from "@/components/projects/ProjectCover";
import ProjectGallery from "@/components/projects/ProjectGallery";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import ArrowLink, { Arrow } from "@/components/ui/ArrowLink";
import MagneticButton from "@/components/ui/MagneticButton";
import Grain from "@/components/chrome/Grain";
import ContactCTA from "@/components/sections/ContactCTA";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return { title: p.name, description: `${p.subtitle}. ${p.hook}` };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const gallery = galleryFor(project);
  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section style={{ padding: "var(--page-inset)", paddingBottom: 0 }}>
        <div
          className="group relative flex min-h-[68svh] flex-col justify-end overflow-hidden"
          style={{ borderRadius: "var(--page-radius)" }}
        >
          <div className="absolute inset-0">
            <ProjectCover project={project} priority sizes="100vw" />
          </div>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,3,2,0.97) 0%, rgba(5,3,2,0.8) 26%, rgba(5,3,2,0.44) 55%, rgba(5,3,2,0.62) 82%, rgba(5,3,2,0.88) 100%)",
            }}
          />
          <Grain />

          <Container className="relative pb-11 pt-[calc(var(--nav-h)+3.5rem)] md:pb-14">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="label-sm text-bone/50 transition-colors duration-300 hover:text-flame"
                >
                  ← All projects
                </Link>
                <span className="h-3 w-px bg-bone/20" />
                <span className="label-sm text-flame">
                  {project.categories.join(" · ")}
                </span>
                <span className="h-3 w-px bg-bone/20" />
                <span className="label-sm text-dust">{project.year}</span>
              </div>

              <h1 className="display max-w-[15ch] text-[clamp(2.5rem,1.4rem+5.4vw,6rem)] text-bone">
                <RevealText text={project.name} immediate delay={0.25} words />
              </h1>

              <p className="max-w-[52ch] text-[1.05rem] leading-[1.5] tracking-[-0.02em] text-bone/80 md:text-[1.2rem]">
                {project.subtitle}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                {project.demo && (
                  <MagneticButton strength={0.2}>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Live"
                      className="group/b relative flex h-12 items-center gap-3 overflow-hidden rounded-full bg-bone pl-5 pr-1.5 text-[0.86rem] font-semibold tracking-tight text-ink transition-colors duration-500 hover:text-bone"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-rust to-ember transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/b:scale-x-100"
                      />
                      <span className="relative">{project.demoLabel ?? "Live demo"}</span>
                      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-ember text-bone transition-colors duration-500 group-hover/b:bg-bone group-hover/b:text-ink">
                        <Arrow className="absolute h-3.5 w-3.5 transition-transform duration-500 group-hover/b:translate-x-7" />
                        <Arrow className="absolute h-3.5 w-3.5 -translate-x-7 transition-transform duration-500 group-hover/b:translate-x-0" />
                      </span>
                    </a>
                  </MagneticButton>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="GitHub"
                    className="flex h-12 items-center gap-2.5 rounded-full border border-bone/18 px-5 text-[0.86rem] font-medium tracking-tight text-bone/85 transition-all duration-400 hover:border-flame/50 hover:text-bone"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                    </svg>
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ---------------- metrics ---------------- */}
      <Section className="py-16 md:py-20">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/[0.08] bg-bone/[0.06] md:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-2 bg-ink px-6 py-7 md:px-8 md:py-9">
                <dt className="font-mono text-[clamp(1.5rem,1.1rem+1.4vw,2.4rem)] leading-none text-bone">
                  {m.value}
                </dt>
                <dd className="label-sm text-dust">{m.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ---------------- problem / solution ---------------- */}
      <Section className="border-t border-bone/[0.07] py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="accent text-[clamp(1.35rem,1rem+1.5vw,2.1rem)] leading-[1.34] text-linen">
              &ldquo;{project.hook}&rdquo;
            </p>
          </Reveal>

          <div className="flex flex-col gap-12 lg:col-span-6 lg:col-start-7">
            <Reveal className="flex flex-col gap-4">
              <span className="label text-flame">The problem</span>
              <p className="text-[0.98rem] leading-[1.72] text-linen">{project.problem}</p>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-4">
              <span className="label text-flame">The approach</span>
              <p className="text-[0.98rem] leading-[1.72] text-linen">{project.solution}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------- highlights ---------------- */}
      <Section className="border-t border-bone/[0.07] py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-[clamp(1.8rem,1.3rem+1.7vw,2.8rem)] text-bone">
              What makes it
              <br />
              work.
            </h2>
          </Reveal>
          <ol className="flex flex-col lg:col-span-7 lg:col-start-6">
            {project.highlights.map((h, hi) => (
              <Reveal
                key={hi}
                delay={hi * 0.05}
                className="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-bone/[0.09] py-6 last:border-b md:gap-6 md:py-7"
              >
                <span className="label-sm pt-1 text-flame/70">
                  {String(hi + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.95rem] leading-[1.7] text-linen">{h}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------- gallery ---------------- */}
      {gallery.length > 0 && (
        <Section className="border-t border-bone/[0.07] py-20 md:py-28">
          <Reveal className="mb-10 flex items-end justify-between gap-6 md:mb-14">
            <h2 className="display text-[clamp(1.8rem,1.3rem+1.7vw,2.8rem)] text-bone">
              In the interface.
            </h2>
            <span className="label-sm shrink-0 text-mute">
              {String(gallery.length).padStart(2, "0")} screens
            </span>
          </Reveal>
          <ProjectGallery images={gallery} name={project.name} />
        </Section>
      )}

      {/* ---------------- stack + note ---------------- */}
      <Section className="border-t border-bone/[0.07] py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-[clamp(1.8rem,1.3rem+1.7vw,2.8rem)] text-bone">
              Built with.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-8 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-bone/[0.12] px-4 py-2.5 text-[0.85rem] tracking-tight text-bone/75 transition-all duration-500 hover:-translate-y-0.5 hover:border-flame/45 hover:text-bone"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            {project.note && (
              <Reveal delay={0.08}>
                <p className="border-l-2 border-flame/40 pl-5 text-[0.88rem] leading-relaxed text-dust">
                  {project.note}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.12} className="flex flex-wrap gap-x-8 gap-y-3">
              {project.github && (
                <ArrowLink href={project.github} external tone="ember" cursor="GitHub">
                  View on GitHub
                </ArrowLink>
              )}
              {project.demo && (
                <ArrowLink href={project.demo} external cursor="Live">
                  {project.demoLabel ?? "Live demo"}
                </ArrowLink>
              )}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------- next ---------------- */}
      <Section className="border-t border-bone/[0.07] py-0">
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="Next"
          className="group flex flex-col gap-4 py-16 md:flex-row md:items-center md:justify-between md:py-24"
        >
          <div className="flex flex-col gap-3">
            <span className="label text-dust">Next project</span>
            <span className="display text-[clamp(2rem,1.3rem+2.6vw,4rem)] text-bone transition-colors duration-500 group-hover:text-flame">
              {next.name}
            </span>
            <span className="text-[0.92rem] text-dust">{next.subtitle}</span>
          </div>
          <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-bone/15 text-bone transition-colors duration-500 group-hover:border-flame/60 group-hover:text-flame md:h-20 md:w-20">
            <Arrow className="absolute h-5 w-5 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-12" />
            <Arrow className="absolute h-5 w-5 -translate-x-12 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
          </span>
        </Link>
      </Section>

      <ContactCTA index="—" eyebrow="Work together" />
    </>
  );
}
