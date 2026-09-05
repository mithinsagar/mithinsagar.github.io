import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import { awards, certifications } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards, research milestones and verifiable certifications — Figma × Apple Vision Pro Design Challenge, ICANDIT 2026, the IGCAR internship, Google Cloud and University of Michigan coursework.",
};

const kindTone: Record<string, string> = {
  award: "from-ember/25",
  research: "from-glow/20",
  internship: "from-rust/25",
};

/** Small link that opens a certificate PDF in a new tab. */
function ViewCertificate({ href, label = "View certificate" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open"
      className="group/c inline-flex shrink-0 items-center gap-1.5 rounded-full border border-bone/[0.13] px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-bone/55 transition-all duration-400 hover:border-flame/45 hover:text-flame"
    >
      {label}
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 transition-transform duration-400 group-hover/c:translate-x-0.5 group-hover/c:-translate-y-0.5" aria-hidden>
        <path
          d="M3 9L9 3M9 3H4.2M9 3v4.8"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

export default function AchievementsPage() {
  const tracks = Array.from(new Set(certifications.map((c) => c.track ?? c.issuer)));
  const verifiable = certifications.filter((c) => c.file).length;

  return (
    <>
      <PageHeader
        index="07"
        eyebrow="Achievements"
        title={"Recognitions\nand receipts."}
        variant="achievements"
        lead="A short list, kept honest. Three things that were awarded or accepted by someone other than me, and six certifications — each one you can open and read for yourself."
        meta={[
          { label: "Awards", value: "1" },
          { label: "Milestones", value: "2" },
          { label: "Certifications", value: String(certifications.length) },
          { label: "Verifiable", value: `${verifiable} PDFs` },
        ]}
      />

      {/* ---------------- awards ---------------- */}
      <Section>
        <SectionHeading index="—" eyebrow="Highlights" title="The three that count." />
        <div className="mt-14 grid gap-5 md:mt-18 lg:grid-cols-3">
          {awards.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.07}>
              <article className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-bone/[0.09] p-8 transition-colors duration-500 hover:border-flame/25 md:p-9">
                <div
                  aria-hidden
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${kindTone[a.kind]} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="label text-flame">{a.kind}</span>
                  <span className="font-mono text-[0.95rem] text-dust">{a.year}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[1.35rem] font-semibold leading-[1.18] tracking-[-0.035em] text-bone md:text-[1.6rem]">
                    {a.title}
                  </h3>
                  <p className="text-[0.92rem] leading-[1.6] text-linen">{a.detail}</p>
                  <p className="text-[0.82rem] leading-relaxed text-mute">{a.org}</p>
                  {a.file && (
                    <div className="mt-3">
                      <ViewCertificate href={a.file} />
                    </div>
                  )}
                </div>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-ember to-transparent transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- certifications ---------------- */}
      <Section className="border-t border-bone/[0.07]">
        <SectionHeading
          index="—"
          eyebrow="Certifications"
          title="Coursework that stuck."
          lead="Google Cloud, University of Michigan and the Google UX Design track — the last one is why I care about how a model's output is presented, not only what it is. Open any of them to read the certificate."
        />
        <div className="mt-14 flex flex-col md:mt-18">
          {tracks.map((track, ti) => {
            const items = certifications.filter((c) => (c.track ?? c.issuer) === track);
            return (
              <Reveal
                key={track}
                delay={ti * 0.05}
                className="grid gap-5 border-t border-bone/[0.09] py-7 last:border-b md:grid-cols-[18rem_1fr] md:gap-10 md:py-9"
              >
                <h3 className="flex items-baseline gap-4 text-[1rem] font-medium tracking-[-0.02em] text-bone">
                  <span className="label-sm text-flame/70">{String(ti + 1).padStart(2, "0")}</span>
                  {track}
                </h3>
                <ul className="flex flex-col divide-y divide-bone/[0.06]">
                  {items.map((c) => (
                    <li
                      key={c.id}
                      className="group flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      {c.file ? (
                        <a
                          href={c.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="Open"
                          className="text-[0.94rem] leading-snug tracking-tight text-linen transition-colors duration-300 hover:text-bone"
                        >
                          <span className="link-underline">{c.name}</span>
                        </a>
                      ) : (
                        <span className="text-[0.94rem] leading-snug tracking-tight text-linen">
                          {c.name}
                        </span>
                      )}
                      <span className="flex shrink-0 items-center gap-4">
                        <span className="label-sm text-mute">{c.issuer}</span>
                        {c.file && <ViewCertificate href={c.file} label="View" />}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <ContactCTA index="—" eyebrow="Next" />
    </>
  );
}
