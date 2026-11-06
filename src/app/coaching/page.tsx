import { Metadata } from "next";

import { CoachingHero } from "@/components/sections/coaching/CoachingHero";
import { AreaNavigator } from "@/components/sections/coaching/AreaNavigator";
import { CoachingAreaSection } from "@/components/sections/coaching/CoachingAreaSection";
import { RelationshipCoachingSection } from "@/components/sections/coaching/RelationshipCoachingSection";
import { MidCTA } from "@/components/sections/coaching/MidCTA";
import { CoachingFinalCTA } from "@/components/sections/coaching/CoachingFinalCTA";

export const metadata: Metadata = {
  title: "Private Coaching for Intimacy, Relationships, Health, Spiritual Life & Personal Growth | AmityHale",
  description: "Private coaching for intimacy, relationships, health, spiritual life, and personal growth with Angel at AmityHale.",
};

export default function CoachingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-clip selection:bg-[#FF5A4F]/20 selection:text-[#161514]">

      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section: APPROVED AND UNTOUCHED */}
        <CoachingHero />

        {/* Find Your Focus Selector Navigation */}
        <AreaNavigator />

        {/* 01 — Intimacy Coaching */}
        <CoachingAreaSection
          id="intimacy"
          number="01"
          eyebrowText="INTIMACY COACHING"
          title={<>Deepen the Bond.<br /><span className="text-[#FF5A4F] italic">Without Losing the Individual.</span></>}
          description="Intimacy Coaching turns difficult patterns into deliberate practice. Through focused, action-oriented work, you and your partner develop the language, habits, and mutual awareness required to strengthen emotional trust, physical closeness, and the quality of the bond you share."
          chips={["Emotional Bond", "Physical Intimacy", "Relational Trust"]}
          ctaText="Explore Intimacy Coaching"
          ctaHref="/book?area=intimacy"
          imageSrc="/coaching_romantic.jpg"
          imageAlt="Mature couple strengthening emotional closeness and relational trust"
          isEven={false}
          backgroundClass="bg-white"
          accentClass="border-[#FF5A4F]/80"
          decorativeElement={
            <div className="absolute -right-[15%] -bottom-[10%] w-[180px] md:w-[220px] opacity-[0.6] hidden md:block">
              <img src="/3.png" alt="" className="w-full h-auto object-contain" />
            </div>
          }
        />

        {/* 02 — Relationship Coaching (Contains Business, Family, Partnerships) */}
        <RelationshipCoachingSection />

        {/* Mid-Page Editorial Breather */}
        <MidCTA />

        {/* 03 — Health Coaching */}
        <CoachingAreaSection
          id="health"
          number="03"
          eyebrowText="HEALTH COACHING"
          title={<>Turn Wellbeing Into<br /><span className="text-[#FF5A4F] italic">a Shared Commitment.</span></>}
          description="Health-related change rarely affects one person alone. Health Coaching brings you and your partner into closer coordination around meaningful wellness priorities, sustainable routines, and changing responsibilities — reducing the friction that can arise when lifestyle adjustments or health concerns begin reshaping everyday life."
          chips={["Lifestyle Alignment", "Shared Routines", "Wellness Priorities"]}
          ctaText="Explore Health Coaching"
          ctaHref="/book?area=health"
          imageSrc="/coaching_friendship.jpg"
          imageAlt="Two mature adults sharing an active, mindful lifestyle routine"
          isEven={true}
          backgroundClass="bg-white"
          accentClass="border-[#0E5A63]/60"
          decorativeElement={
            <div className="absolute -left-[10%] -top-[10%] w-[150px] md:w-[200px] opacity-[0.7]">
              <img src="/12.png" alt="" className="w-full h-auto object-contain" />
            </div>
          }
        />

        {/* 04 — Spiritual Coaching */}
        <CoachingAreaSection
          id="spiritual"
          number="04"
          eyebrowText="SPIRITUAL COACHING"
          title={<>Honor Your Convictions.<br /><span className="text-[#FF5A4F] italic">Discover Common Ground.</span></>}
          description="Spiritual Coaching creates space for honest questions, differing convictions, and the deeper values beneath them. Together, we examine where belief systems converge or diverge and establish a more intentional framework for faith, purpose, and meaning without asking either person to surrender what matters most to them."
          chips={["Belief Alignment", "Purpose", "Shared Values"]}
          ctaText="Explore Spiritual Coaching"
          ctaHref="/book?area=spiritual"
          imageSrc="/personal_faith.png"
          imageAlt="Interfaith reflection and shared values"
          isEven={false}
          backgroundClass="bg-[#FDFCF9]"
          accentClass="border-[#D8A23D]/70"
          decorativeElement={
            <div className="absolute -right-[15%] top-[10%] w-[160px] md:w-[200px] opacity-[0.6]">
              <img src="/8.png" alt="" className="w-full h-auto object-contain" />
            </div>
          }
        />

        {/* 05 — Personal Growth */}
        <CoachingAreaSection
          id="personal-growth"
          number="05"
          eyebrowText="PERSONAL GROWTH"
          title={<>Grow Without Outgrowing<br /><span className="text-[#FF5A4F] italic">the Life You Built.</span></>}
          description="Personal evolution changes more than the individual. As identity, priorities, confidence, or direction shift, this work examines what those changes are asking of the relationships around you — allowing self-discovery to be integrated with intention rather than becoming a force that quietly pulls important bonds apart."
          chips={["Identity", "Life Transitions", "Self-Discovery"]}
          ctaText="Explore Personal Growth"
          ctaHref="/book?area=personal-growth"
          imageSrc="/coaching_personal_growth.jpg"
          imageAlt="Grounded mature adult outdoors embracing personal growth"
          isEven={true}
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

        {/* Final Conversion Section */}
        <CoachingFinalCTA />
      </main>
    </div>
  );
}
