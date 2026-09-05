import type { Metadata } from "next";
import Section, { Container } from "@/components/ui/Section";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Arrow } from "@/components/ui/ArrowLink";
import Grain from "@/components/chrome/Grain";
import Embers from "@/components/chrome/Embers";
import LocalTime from "@/components/ui/LocalTime";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mithin Sagar S — AI/ML engineer based in Chennai. Open to internships, roles and research collaborations.",
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Fastest route. I read everything.",
  },
  {
    label: "GitHub",
    value: `@${site.githubUser}`,
    href: site.github,
    note: "Every project on this site, with its tests.",
  },
  {
    label: "LinkedIn",
    value: "in/mithinsagar",
    href: site.linkedin,
    note: "For roles, referrals and introductions.",
  },
  {
    label: "Hugging Face",
    value: `@${site.githubUser}`,
    href: site.huggingface,
    note: "Models, datasets and a live Space.",
  },
  {
    label: "Instagram",
    value: site.instagramHandle,
    href: site.instagram,
    note: "Photography, events and everything off the clock.",
  },
  {
    label: "X",
    value: site.xHandle,
    href: site.x,
    note: "Occasional notes on what I am building.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ---------------- finale ---------------- */}
      <section style={{ padding: "var(--page-inset)", paddingBottom: 0 }}>
        <div
          className="relative flex min-h-[86svh] flex-col justify-end overflow-hidden"
          style={{ borderRadius: "var(--page-radius)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(110% 90% at 50% 122%, #ff7a2a 0%, #e0480e 16%, #a52306 32%, #4d0d03 54%, #150403 78%, #080302 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(130% 110% at 50% 60%, transparent 38%, rgba(6,3,1,0.55) 78%, rgba(5,2,1,0.9) 100%)",
            }}
          />
          <Embers density={1.1} />
          <Grain />

          <Container className="relative pb-14 pt-[calc(var(--nav-h)+5rem)] md:pb-20">
            <Reveal
              delay={0.95}
              y={10}
              className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-6 text-right md:right-10 lg:flex"
            >
              <span className="flex flex-col items-end gap-2">
                <span className="label-sm text-mute">Local time</span>
                <LocalTime className="font-mono text-[1.6rem] leading-none text-bone/85" />
              </span>
              <span className="h-px w-16 bg-flame/40" />
              <span className="flex flex-col items-end gap-2">
                <span className="label-sm text-mute">Based in</span>
                <span className="text-[0.95rem] tracking-tight text-bone/80">{site.location}</span>
              </span>
              <span className="flex flex-col items-end gap-2">
                <span className="label-sm text-mute">Status</span>
                <span className="flex items-center gap-2.5 text-[0.95rem] tracking-tight text-bone/80">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame" />
                  </span>
                  Open to work
                </span>
              </span>
            </Reveal>

            <div className="flex flex-col gap-9">
              <Reveal y={12}>
                <div className="flex items-center gap-4">
                  <span className="label text-flame">10</span>
                  <span className="h-px w-10 bg-flame/40" />
                  <span className="label text-bone/60">Contact</span>
                </div>
              </Reveal>

              <h1 className="display max-w-[14ch] text-[clamp(2.6rem,1.1rem+6.6vw,7.6rem)] text-bone">
                <RevealText text={"Let’s build"} immediate delay={0.3} />
                <RevealText text={"something"} immediate delay={0.42} />
                <RevealText
                  text={"meaningful."}
                  immediate
                  delay={0.54}
                  lineClassName="accent font-normal tracking-[-0.02em] text-glow"
                />
              </h1>

              <Reveal delay={0.7} className="max-w-[52ch]">
                <p className="text-[1rem] leading-[1.68] text-bone/75 md:text-[1.1rem]">
                  Open to internships and AI/ML roles, research collaborations, or a conversation
                  about something you are trying to make work. Tell me what the problem is and what
                  you have tried — that is enough to start.
                </p>
              </Reveal>

              <Reveal delay={0.82}>
                <MagneticButton strength={0.28} className="w-fit">
                  <a
                    href={`mailto:${site.email}`}
                    data-cursor="Email"
                    className="group relative flex h-14 items-center gap-4 overflow-hidden rounded-full bg-bone pl-7 pr-2 text-[0.95rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-500 hover:text-bone md:h-16 md:pl-9 md:text-[1.05rem]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-blood via-rust to-ember transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <span className="relative">{site.email}</span>
                    <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-ember text-bone transition-colors duration-500 group-hover:bg-bone group-hover:text-ink md:h-12 md:w-12">
                      <Arrow className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-8" />
                      <Arrow className="absolute h-4 w-4 -translate-x-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                    </span>
                  </a>
                </MagneticButton>
              </Reveal>
            </div>
          </Container>
        </div>
      </section>

      {/* ---------------- channels ---------------- */}
      <Section className="py-20 md:py-28">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-bone/[0.08] bg-bone/[0.06] md:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-cursor="Open"
                className="group flex h-full items-center justify-between gap-6 bg-ink p-8 transition-colors duration-500 hover:bg-char md:p-10"
              >
                <span className="flex flex-col gap-2.5">
                  <span className="label text-flame/80">{c.label}</span>
                  <span className="text-[1.1rem] font-medium tracking-[-0.03em] text-bone md:text-[1.3rem]">
                    {c.value}
                  </span>
                  <span className="text-[0.85rem] text-dust">{c.note}</span>
                </span>
                <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-bone/12 text-bone/70 transition-colors duration-500 group-hover:border-flame/50 group-hover:text-flame">
                  <Arrow className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-9" />
                  <Arrow className="absolute h-4 w-4 -translate-x-9 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] text-bone">
              Before you write.
            </h2>
          </Reveal>
          <div className="grid gap-8 lg:col-span-7 lg:col-start-6 sm:grid-cols-2">
            {[
              {
                t: "Résumé",
                b: "The one-page version with education, the IGCAR internship, three projects and the publication.",
                a: { l: "Download PDF", h: site.resume },
              },
              {
                t: "Where I am",
                b: `${site.location}. Comfortable working remote across time zones, and available for on-site in Chennai.`,
              },
              {
                t: "What I’m looking for",
                b: "Internships and AI/ML roles from 2026 onward, and research collaborations any time.",
              },
              {
                t: "Response",
                b: "I reply to everything, usually within a couple of days. If it takes longer, it is not a filter — just exams.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.05} className="flex flex-col gap-3">
                <span className="label text-dust">{x.t}</span>
                <p className="text-[0.9rem] leading-[1.68] text-linen">{x.b}</p>
                {x.a && (
                  <a
                    href={x.a.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-sm w-fit text-flame transition-colors duration-300 hover:text-glow"
                  >
                    {x.a.l} ↗
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
