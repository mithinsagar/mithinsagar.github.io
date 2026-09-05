import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import PhotoGallery from "@/components/sections/PhotoGallery";
import ContactCTA from "@/components/sections/ContactCTA";
import Reveal from "@/components/ui/Reveal";
import { photos, seriesInfo } from "@/data/photos";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Live event and street photography by Mithin Sagar — stage light at VIT Chennai’s Vibrance, and a litter of strays in Chennai. Available light, no flash.",
};

export default function PhotographyPage() {
  return (
    <>
      <PageHeader
        index="08"
        eyebrow="Photography"
        title={"Light, before\nit was data."}
        variant="photography"
        lead="I shoot live events and whatever the street offers. Stage lighting changes faster than autofocus can follow, which makes it the best practice I know for deciding fast and committing."
        meta={[
          { label: "Frames", value: String(photos.length) },
          { label: "Series", value: String(seriesInfo.length) },
          { label: "Lighting", value: "Available only" },
        ]}
      />

      <Section>
        <PhotoGallery />
      </Section>

      <Section className="border-t border-bone/[0.07] py-20 md:py-24">
        <Reveal className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="label text-flame">Why it&rsquo;s here</span>
          </div>
          <p className="max-w-[58ch] text-[1.05rem] leading-[1.72] text-linen lg:col-span-7 lg:col-start-6">
            A portfolio that only shows repositories describes half a person. Photography is where I
            practise the thing engineering keeps asking for and rarely teaches: choosing quickly
            with incomplete information, then living with the frame you took.
          </p>
        </Reveal>
      </Section>

      <ContactCTA index="—" eyebrow="Next" />
    </>
  );
}
