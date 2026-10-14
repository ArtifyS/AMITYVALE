import { Metadata } from "next";

import { PricingIntroAndGrid } from "@/components/sections/pricing/PricingIntroAndGrid";
import { PricingTrustStrip } from "@/components/sections/pricing/PricingTrustStrip";
import { PricingWhatToExpect } from "@/components/sections/pricing/PricingWhatToExpect";
import { PricingFAQ } from "@/components/sections/pricing/PricingFAQ";
import { PricingFinalCTA } from "@/components/sections/pricing/PricingFinalCTA";

export const metadata: Metadata = {
  title: "Sessions & Pricing | Amity Vale Relationship Coaching",
  description: "Straightforward pricing for private online relationship and intimacy coaching sessions. Choose 15, 30, 45, or 60 minutes for individuals or couples.",
};

export default function PricingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#FF5A4F]/20 selection:text-[#0B2A4A]">
      <main className="flex-1 w-full flex flex-col">
        {/* Above-the-fold compact intro + 4 pricing cards */}
        <PricingIntroAndGrid />
        
        {/* Quick trust & format reassurance strip */}
        <PricingTrustStrip />
        
        {/* What to Expect: 3 simple sequential steps */}
        <PricingWhatToExpect />
        
        {/* Frequently asked questions */}
        <PricingFAQ />
        
        {/* Dark cinematic final conversion CTA with background image */}
        <PricingFinalCTA />
      </main>
    </div>
  );
}
