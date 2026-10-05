import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { WhyWeExist } from "@/components/sections/about/WhyWeExist";
import { OurPhilosophy } from "@/components/sections/about/OurPhilosophy";
import { MeetAngelAbout } from "@/components/sections/about/MeetAngelAbout";
import { ExperiencePrinciples } from "@/components/sections/about/ExperiencePrinciples";
import { WhoWeSupport } from "@/components/sections/about/WhoWeSupport";
import { BrandValues } from "@/components/sections/about/BrandValues";

import { AboutFinalCTA } from "@/components/sections/about/AboutFinalCTA";

export const metadata: Metadata = {
  title: "About Amity Vale | Relationship & Intimacy Coaching",
  description: "Learn about Amity Vale, our relationship coaching philosophy, and Angel’s approach to communication, connection, and intimacy.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#E98267]/20 selection:text-[#161514]">
      <Header />
      
      <main className="flex-1 w-full flex flex-col">
        <AboutHero />
        <WhyWeExist />
        <OurPhilosophy />
        <MeetAngelAbout />
        <ExperiencePrinciples />
        <WhoWeSupport />
        <BrandValues />

        <AboutFinalCTA />
      </main>

      <Footer />
    </div>
  );
}
