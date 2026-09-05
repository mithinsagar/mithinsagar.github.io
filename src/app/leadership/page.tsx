import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { leadership, stats, philosophy } from "@/data/leadership";
import media from "@/data/media.json";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Student Welfare Outreach Head at TechnoVIT & Vibrance and Head of Visual Media at VOICE-IT — leading 65+ people across two organisations at VIT Chennai.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="Leadership & community"
        title={"People, ideas,\nimpact."}
        variant="leadership"
        lead="Two terms leading student teams at VIT Chennai — sixty-five people across sponsorship, publicity, media and production. Most of the job was making sure everyone knew what everyone else was doing."
        meta={[
          { label: "People led", value: "65+" },
          { label: "Organisations", value: "2" },
          { label: "Flagship events", value: "2" },
        ]}
      />

      {/* ---------------- philosophy chain ---------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <ol className="flex flex-col gap-2">
              {philosophy.chain.map((c, i) => (
                <li key={c} className="flex items-center gap-5">
                  <span className="label-sm w-6 text-flame/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="display text-[clamp(2.2rem,1.4rem+3.4vw,4.6rem)]"
                    style={{
                      color: i === 2 ? "var(--color-flame)" : "var(--color-bone)",
                      opacity: 1 - i * 0.14,
                    }}
                  >
                    {c}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-center gap-8 lg:col-span-6 lg:col-start-7">
            <p className="text-[1.05rem] leading-[1.72] text-linen md:text-[1.15rem]">
              {philosophy.body}
            </p>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-bone/[0.08] bg-bone/[0.06] sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 bg-ink px-5 py-6">
                  <dt className="font-mono text-[1.7rem] leading-none text-bone">{s.value}</dt>
                  <dd className="text-[0.78rem] leading-snug text-dust">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- roles ---------------- */}
      <Section className="border-t border-bone/[0.07]">
        <SectionHeading index="—" eyebrow="Roles" title="Two terms, back to back." />

        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
          {leadership.map((role, i) => {
            const shots = media.leadership as Record<
              string,
              { src: string; w: number; h: number; lqip: string }
            >;
            const pics = [
              { key: role.photos.main, span: true },
              { key: role.photos.left, span: false },
              { key: role.photos.right, span: false },
            ].map((x) => ({ ...x, ...shots[x.key] }));
            return (
              <article key={role.id} className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <div className="flex flex-col gap-6">
                    <span className="label-sm w-fit rounded-full border border-flame/30 px-3 py-1.5 text-flame">
                      {role.period}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="display text-[clamp(1.7rem,1.2rem+1.8vw,2.7rem)] text-bone">
                        {role.role}
                      </h3>
                      <p className="text-[1rem] tracking-tight text-flame/90">{role.org}</p>
                      <p className="text-[0.85rem] text-dust">{role.orgNote}</p>
                    </div>
                    <p className="max-w-[46ch] text-[0.95rem] leading-[1.7] text-linen">
                      {role.body}
                    </p>
                    <div className="flex flex-col gap-4 border-t border-bone/10 pt-6">
                      <span className="label-sm text-mute">Scale · {role.scale}</span>
                      <ul className="flex flex-wrap gap-2">
                        {role.scope.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-bone/[0.12] px-3 py-2 text-[0.8rem] tracking-tight text-bone/70"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>

                <Reveal
                  delay={0.1}
                  className={`lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}
                >
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {pics.map((pic) => (
                      <figure
                        key={pic.key}
                        className={`group relative overflow-hidden rounded-xl border border-bone/[0.08] bg-ink ${
                          pic.span ? "col-span-2" : ""
                        }`}
                        style={{ aspectRatio: pic.span ? "16 / 10" : "4 / 3" }}
                      >
                        <Image
                          src={pic.src}
                          alt={`${role.role} — ${role.org}`}
                          fill
                          sizes="(max-width: 1024px) 46vw, 28vw"
                          placeholder="blur"
                          blurDataURL={pic.lqip}
                          className="object-cover sepia-[0.14] saturate-[0.92] brightness-[0.86] transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:sepia-0 group-hover:saturate-100 group-hover:brightness-105"
                        />
                      </figure>
                    ))}
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-bone/[0.07] py-20 md:py-24">
        <Reveal className="flex flex-col items-start gap-6">
          <span className="label text-flame">Also</span>
          <p className="max-w-[54ch] text-[1.05rem] leading-[1.7] text-linen">
            The photography on this site comes from the same rooms. If you want to see what those
            events actually looked like, the gallery is the honest record.
          </p>
          <ArrowLink href="/photography" tone="ember" cursor="View">
            Open the gallery
          </ArrowLink>
        </Reveal>
      </Section>

      <ContactCTA index="—" eyebrow="Next" />
    </>
  );
}
