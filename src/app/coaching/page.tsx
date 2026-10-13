import { Metadata } from "next";

import { CoachingHero } from "@/components/sections/coaching/CoachingHero";
import { AreaNavigator } from "@/components/sections/coaching/AreaNavigator";
import { CoachingAreaSection } from "@/components/sections/coaching/CoachingAreaSection";
import { MidCTA } from "@/components/sections/coaching/MidCTA";
import { CoachingFinalCTA } from "@/components/sections/coaching/CoachingFinalCTA";

export const metadata: Metadata = {
  title: "Private Coaching for Relationships, Family, Faith & Personal Growth | Amity Vale",
  description: "Private online coaching for romantic relationships, family, friendships, faith, and personal growth with Angel at Amity Vale.",
};

export default function CoachingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-clip selection:bg-[#FF5A4F]/20 selection:text-[#161514]">
      
      <main className="flex-1 w-full flex flex-col">
        <CoachingHero />
        <AreaNavigator />

        <CoachingAreaSection
          id="romantic"
          number="01"
          eyebrowText="ROMANTIC RELATIONSHIPS"
          title={<>Feel Close Again.<br /><span className="text-[#FF5A4F] italic">Not Just Together.</span></>}
          description="When communication becomes tense, distance grows, or the same arguments keep returning, coaching can help you understand what is happening underneath the pattern and create a healthier way forward together."
          chips={["Communication", "Trust & Conflict", "Connection & Intimacy"]}
          ctaText="Book Relationship Coaching"
          ctaHref="/book"
          imageSrc="/coaching_romantic.jpg"
          imageAlt="Mature couple having an honest conversation"
          isEven={false}
          backgroundClass="bg-white"
          accentClass="border-[#FF5A4F]/80"
          decorativeElement={
            <div className="absolute -right-[15%] -bottom-[10%] w-[180px] md:w-[220px] opacity-[0.6] hidden md:block">
              <img src="/3.png" alt="" className="w-full h-auto object-contain" />
            </div>
          }
        />

        <CoachingAreaSection
          id="family"
          number="02"
          eyebrowText="FAMILY RELATIONSHIPS"
          title={<>Love Can Be Deep.<br /><span className="text-[#D8A23D] italic">And Still Be Complicated.</span></>}
          description="Parents, siblings, adult children, and extended family can carry years of history into a single conversation. Coaching creates space to understand those dynamics, communicate more clearly, and build healthier boundaries without losing what matters."
          chips={["Parents & Adult Children", "Boundaries", "Family Conflict"]}
          ctaText="Book Family Coaching"
          ctaHref="/book"
          imageSrc="/coaching_family.jpg"
          imageAlt="Mature mother and adult daughter sharing a calm moment"
          isEven={true}
          backgroundClass="bg-[#FFFDFB]" // Very pale warm peach/gold wash
          accentClass="border-[#D8A23D]/70"
          decorativeElement={
            <div className="absolute -left-[10%] -top-[10%] w-[150px] md:w-[200px] opacity-[0.7]">
              <img src="/12.png" alt="" className="w-full h-auto object-contain" />
            </div>
          }
        />

        <CoachingAreaSection
          id="friendship"
          number="03"
          eyebrowText="FRIENDSHIP & SOCIAL CONNECTION"
          title={<>Some Friendships Change.<br /><span className="text-[#0E5A63] italic">That Does Not Make Them Meaningless.</span></>}
          description="Friendships can become distant, one-sided, confusing, or difficult to repair. Coaching can help you understand what changed, communicate honestly, rebuild trust where possible, and recognize when it may be healthier to move forward differently."
          chips={["Conflict", "Trust", "Distance & Change"]}
          ctaText="Book Friendship Coaching"
          ctaHref="/book"
          imageSrc="/coaching_friendship.jpg"
          imageAlt="Two mature friends connecting"
          isEven={false}
          backgroundClass="bg-white"
          accentClass="border-[#0E5A63]/60"
          decorativeElement={
            <div className="absolute -left-[20%] top-[20%] w-[160px] md:w-[240px] opacity-[0.8] hidden md:block">
              <div 
                className="w-full h-full"
                style={{
                  animation: 'friendshipFloat 15s ease-in-out infinite',
                  transformOrigin: 'center'
                }}
              >
                <img src="/2.png" alt="" className="w-full h-auto object-contain" />
              </div>
              <style>{`
                @keyframes friendshipFloat {
                  0% { transform: translateY(0) rotate(10deg); }
                  50% { transform: translateY(-6px) rotate(13deg); }
                  100% { transform: translateY(0) rotate(10deg); }
                }
                @media (prefers-reduced-motion: reduce) {
                  .absolute > div { animation: none !important; transform: rotate(10deg) !important; }
                }
              `}</style>
            </div>
          }
        />

        <MidCTA />

        <CoachingAreaSection
          id="faith"
          number="04"
          eyebrowText="FAITH & SPIRITUAL LIFE"
          title={<>When Faith Feels Distant,<br /><span className="text-[#D8A23D] italic">Questions Can Be Part of the Journey.</span></>}
          description="Faith can shape identity, purpose, relationships, and the way we make sense of difficult seasons. Coaching offers space to reflect on doubt, spiritual distance, values, meaning, and your relationship with God without judgment or pressure."
          chips={["Faith & Doubt", "Purpose & Meaning", "Spiritual Connection"]}
          ctaText="Book Faith-Centered Coaching"
          ctaHref="/book"
          imageSrc="/coaching_faith.jpg"
          imageAlt="Mature adult in quiet reflection"
          isEven={true}
          backgroundClass="bg-[#FDFCF9]" // Very pale warm ivory/gold wash
          accentClass="border-[#D8A23D]/70"
          decorativeElement={
            <div className="absolute -right-[15%] top-[10%] w-[160px] md:w-[200px] opacity-[0.6]">
              <img src="/8.png" alt="" className="w-full h-auto object-contain" />
            </div>
          }
        />

        <CoachingAreaSection
          id="personal-growth"
          number="05"
          eyebrowText="PERSONAL GROWTH"
          title={<>The Relationship You Have With Yourself<br /><span className="text-[#FF5A4F] italic">Shapes Every Other One.</span></>}
          description="Growth often begins by noticing the patterns you carry into relationships, decisions, boundaries, and difficult conversations. Coaching can help you understand yourself more clearly and make choices that feel more intentional."
          chips={["Confidence", "Boundaries", "Patterns & Life Transitions"]}
          ctaText="Book Personal Coaching"
          ctaHref="/book"
          imageSrc="/coaching_personal_growth.jpg"
          imageAlt="Grounded mature adult outdoors"
          isEven={false}
          backgroundClass="bg-white"
          accentClass="border-[#0B2A4A]/20"
          decorativeElement={
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 opacity-[0.06] overflow-hidden">
              <div 
                className="w-[120vw] h-[120vh]"
                style={{
                  animation: 'growthBreathe 20s ease-in-out infinite',
                  transformOrigin: 'center'
                }}
              >
                <img src="/4.png" alt="" className="w-full h-full object-cover" />
              </div>
              <style>{`
                @keyframes growthBreathe {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.012); }
                  100% { transform: scale(1); }
                }
                @media (prefers-reduced-motion: reduce) {
                  .fixed > div { animation: none !important; }
                }
              `}</style>
            </div>
          }
        />

        <CoachingFinalCTA />
      </main>
    </div>
  );
}
