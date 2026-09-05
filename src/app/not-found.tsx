import { Container } from "@/components/ui/Section";
import Grain from "@/components/chrome/Grain";
import Embers from "@/components/chrome/Embers";
import ArrowLink from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section style={{ padding: "var(--page-inset)", paddingBottom: 0 }}>
      <div
        className="relative flex min-h-[80svh] flex-col justify-center overflow-hidden"
        style={{ borderRadius: "var(--page-radius)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 90% at 50% 110%, #c4370a 0%, #5c1104 32%, #140503 68%, #070403 100%)",
          }}
        />
        <Embers density={0.6} />
        <Grain />
        <Container className="relative flex flex-col gap-8">
          <span className="label text-flame">404</span>
          <h1 className="display max-w-[16ch] text-[clamp(2.4rem,1.4rem+4.6vw,5.4rem)] text-bone">
            This page was carved from a broken index.
          </h1>
          <p className="max-w-[46ch] text-[1rem] leading-relaxed text-bone/70">
            Nothing here. The rest of the site is intact — start from the beginning or jump straight
            to the work.
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <ArrowLink href="/" tone="ember" cursor="Home">
              Back home
            </ArrowLink>
            <ArrowLink href="/projects" cursor="View">
              See the projects
            </ArrowLink>
          </div>
        </Container>
      </div>
    </section>
  );
}
