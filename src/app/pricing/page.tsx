import { Metadata } from "next";

import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { SessionPricingGrid } from "@/components/sections/pricing/SessionPricingGrid";
import { BookingSteps } from "@/components/sections/pricing/BookingSteps";
import { PricingFAQ } from "@/components/sections/pricing/PricingFAQ";
import { PricingFinalCTA } from "@/components/sections/pricing/PricingFinalCTA";

export const metadata: Metadata = {
  title: "Pricing & Private Sessions | Amity Vale",
  description: "View Amity Vale relationship and intimacy coaching session options, including 15, 30, 45, and 60-minute private online sessions.",
};

export default function PricingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#FF5A4F]/20 selection:text-[#161514]">
      
      <main className="flex-1 w-full flex flex-col">
        <PricingHero />
        <SessionPricingGrid />
        <BookingSteps />
        <PricingFAQ />
        <PricingFinalCTA />
      </main>
    </div>
  );
}
