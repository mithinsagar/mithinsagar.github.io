import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { books, currently } from "@/data/currently";
import PoemSlider from "@/components/sections/PoemSlider";

export const metadata: Metadata = {
  title: "Currently",
  description:
    "What Mithin Sagar is building, learning, exploring and shooting right now — updated September 2026.",
};

export default function CurrentlyPage() {
  return (
    <>
      <PageHeader
        index="09"
        eyebrow="Currently"
        title={"What I’m on\nright now."}
        variant="currently"
        compact
        lead={`A living page rather than an archive. Last updated ${currently.updated}.`}
        meta={[
          { label: "Status", value: currently.availability.status },
          { label: "Based in", value: "Chennai, India" },
        ]}
      />

      <Section>
        <ol className="flex flex-col">
          {currently.blocks.map((b, i) => (
            <Reveal
              key={b.n}
              delay={i * 0.06}
              className="group grid gap-6 border-t border-bone/[0.09] py-10 last:border-b md:grid-cols-[10rem_1fr] md:gap-12 md:py-14"
            >
              <div className="flex items-baseline gap-4 md:flex-col md:gap-3">
                <span className="label-sm text-flame/70">{b.n}</span>
                <span className="label text-flame">{b.label}</span>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="display max-w-[20ch] text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] text-bone transition-colors duration-500 group-hover:text-flame">
                  {b.title}
                </h2>
                <p className="max-w-[58ch] text-[0.98rem] leading-[1.72] text-linen">{b.body}</p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {b.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-bone/[0.12] px-3.5 py-2 text-[0.8rem] tracking-tight text-bone/65 transition-colors duration-500 group-hover:border-flame/30 group-hover:text-bone/85"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------------- verse ---------------- */}
      <Section className="border-t border-bone/[0.07]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <span className="label text-flame">Reading</span>
              <h2 className="display text-[clamp(1.7rem,1.2rem+1.8vw,2.7rem)] text-bone">
                Lines I keep
                <br />
                coming back to.
              </h2>
              <p className="max-w-[38ch] text-[0.92rem] leading-[1.7] text-dust">
                Five poems, five centuries apart, all saying something about carrying on.
                They rotate on their own — or push them along yourself.
              </p>
              <p className="text-[0.75rem] leading-relaxed text-mute">
                All public domain, quoted in excerpt and attributed.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <PoemSlider />
          </Reveal>
        </div>
      </Section>

      {/* ---------------- shelf ---------------- */}
      <Section className="border-t border-bone/[0.07]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-[clamp(1.7rem,1.2rem+1.8vw,2.7rem)] text-bone">
              On the shelf.
            </h2>
          </Reveal>
          <div className="flex flex-col lg:col-span-8">
            {books.map((b, i) => (
              <Reveal
                key={b.id}
                delay={i * 0.05}
                className="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-bone/[0.09] py-7 last:border-b md:gap-8 md:py-8"
              >
                <span className="label-sm pt-1.5 text-flame/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-[1.05rem] font-medium tracking-[-0.028em] text-bone transition-colors duration-400 group-hover:text-flame md:text-[1.18rem]">
                      {b.title}
                    </h3>
                    <span className="label-sm shrink-0 text-mute">{b.tag}</span>
                  </div>
                  <p className="text-[0.85rem] tracking-tight text-flame/80">{b.author}</p>
                  <p className="max-w-[56ch] text-[0.9rem] leading-[1.68] text-dust">{b.note}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.1} className="mt-10 flex flex-col gap-4">
              <p className="text-[0.95rem] leading-relaxed text-dust">
                {currently.availability.detail}
              </p>
              <ArrowLink href="/contact" tone="ember" cursor="Talk">
                Say hello
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <ContactCTA index="—" eyebrow="Reach out" />
    </>
  );
}
