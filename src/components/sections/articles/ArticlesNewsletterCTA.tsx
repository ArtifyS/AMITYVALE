"use client";

import React from "react";
import { motion } from "framer-motion";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ArticlesNewsletterCTA() {
  return (
    <section className="relative w-full bg-[#FF5A4F] py-20 sm:py-24 lg:py-28 overflow-hidden border-t-8 border-[#0B2A4A]">
      {/* Decorative Swirls in Navy */}
      <DecorativeAccent
        src="/3.png"
        opacity={0.15}
        animateVariant="float"
        className="w-[400px] md:w-[700px] right-[-10%] top-[-10%] md:right-[-5%] md:top-[-20%] z-0 pointer-events-none"
        style={{ filter: "brightness(0.2) sepia(1) hue-rotate(180deg) saturate(300%)" }}
      />
      
      <div className="container mx-auto px-6 max-w-[840px] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <span className="font-sans uppercase tracking-[0.2em] text-[#0B2A4A] text-[12px] md:text-[13px] font-bold mb-4 md:mb-5 block">
            TAKE THE NEXT STEP
          </span>

          {/* Heading */}
          <h2 className="font-serif text-[36px] sm:text-[44px] md:text-[52px] lg:text-[58px] leading-[1.08] tracking-tight text-[#FDFBF7] mb-5 md:mb-6">
            Insight Matters.{" "}
            <span className="italic text-[#0B2A4A] block sm:inline">
              What You Do With It Matters More.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-[#FDFBF7]/90 text-[16px] sm:text-[17px] md:text-[18px] leading-[1.6] max-w-[620px] mx-auto mb-9 md:mb-11 font-normal">
            Reading can bring perspective. Real change begins when you examine what is happening in your own life and decide what deserves your attention next.
          </p>

          {/* Actions: Primary and Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-[560px] mx-auto">
            {/* Primary CTA */}
            <Link
              href="/assessment"
              className="h-[54px] px-8 sm:px-9 rounded-full bg-[#0B2A4A] text-white font-sans font-bold text-[14px] sm:text-[14.5px] tracking-wide hover:bg-[#133659] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_24px_rgba(11,42,74,0.25)] flex items-center justify-center gap-2 group w-full sm:w-auto shrink-0"
            >
              <span>Take the Free Check-In</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/booking"
              className="h-[54px] px-8 sm:px-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 hover:border-white/70 text-white font-sans font-bold text-[14px] sm:text-[14.5px] tracking-wide hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto shrink-0"
            >
              <span>Book a Private Session</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
