import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CoachingHero } from "@/components/sections/coaching/CoachingHero";
import { RelationshipRecognition } from "@/components/sections/coaching/RelationshipRecognition";
import { CoachingAreas } from "@/components/sections/coaching/CoachingAreas";
import { CoachingProcess } from "@/components/sections/coaching/CoachingProcess";
import { CoachingPhilosophy } from "@/components/sections/coaching/CoachingPhilosophy";
import { CoachingFinalCTA } from "@/components/sections/coaching/CoachingFinalCTA";

export const metadata: Metadata = {
  title: "Relationship & Intimacy Coaching | Amity Vale",
  description: "Explore private relationship and intimacy coaching with Amity Vale, with support for communication, emotional connection, recurring conflict, and intimacy.",
};

export default function CoachingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#E98267]/20 selection:text-[#161514]">
      <Header />
      
      <main className="flex-1 w-full flex flex-col">
        <CoachingHero />
        <RelationshipRecognition />
        <CoachingAreas />
        <CoachingProcess />
        <CoachingPhilosophy />
        <CoachingFinalCTA />
      </main>

      <Footer />
    </div>
  );
}
