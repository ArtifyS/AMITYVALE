import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { CoachIntroduction } from "@/components/sections/CoachIntroduction";
import { QuoteFeature } from "@/components/sections/QuoteFeature";
import { CoachingAreas } from "@/components/sections/CoachingAreas";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { AssessmentCTA } from "@/components/sections/AssessmentCTA";
import { SessionProcess } from "@/components/sections/SessionProcess";
import { TestimonialFeature } from "@/components/sections/TestimonialFeature";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full">
        <HeroSection />
        <ProblemSection />
        <CoachIntroduction />
        <QuoteFeature />
        <CoachingAreas />
        <TransformationSection />
        <AssessmentCTA />
        <SessionProcess />
        <TestimonialFeature />
        <ResourcesSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
