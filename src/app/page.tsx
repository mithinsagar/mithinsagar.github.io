import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import WorkPreview from "@/components/home/WorkPreview";
import Capabilities from "@/components/home/Capabilities";
import TrackPreview from "@/components/home/TrackPreview";
import PhotoStrip from "@/components/home/PhotoStrip";
import CurrentlyStrip from "@/components/home/CurrentlyStrip";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <WorkPreview />
      <Capabilities />
      <TrackPreview />
      <PhotoStrip />
      <CurrentlyStrip />
      <ContactCTA index="08" />
    </>
  );
}
