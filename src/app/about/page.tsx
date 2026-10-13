import { Metadata } from "next";

import { AboutHero } from "@/components/sections/about/AboutHero";
import { WhyWeExist } from "@/components/sections/about/WhyWeExist";
import { MeetAngelAbout } from "@/components/sections/about/MeetAngelAbout";
import { OurPhilosophy } from "@/components/sections/about/OurPhilosophy";
import { AboutFinalCTA } from "@/components/sections/about/AboutFinalCTA";

export const metadata: Metadata = {
  title: "About Amity Vale | Relationship, Life & Faith Coaching",
  description: "Learn about Amity Vale, Angel’s approach to private coaching, and the philosophy behind supporting relationships, faith, connection, and personal growth.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#FF5A4F]/20 selection:text-[#161514]">
      
      <main className="flex-1 w-full flex flex-col bg-white">
        <AboutHero />
        <WhyWeExist />
        <MeetAngelAbout />
        <OurPhilosophy />
        <AboutFinalCTA />
      </main>
    </div>
  );
}
