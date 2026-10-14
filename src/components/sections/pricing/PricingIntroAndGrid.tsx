"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { sessionOptions } from "@/lib/pricingConfig";

export function PricingIntroAndGrid() {
  const options = Object.values(sessionOptions);

  return (
    <section className="relative pt-6 sm:pt-8 md:pt-12 pb-10 md:pb-14 bg-gradient-to-b from-[#FAF7F4]/60 via-white to-white overflow-hidden">
      {/* Subtle brand dotted background accent (desktop only, non-intrusive) */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 w-[380px] h-[340px] pointer-events-none opacity-[0.14] hidden xl:block"
        style={{
          backgroundImage: "radial-gradient(circle, #FF5A4F 1px, transparent 1.2px), radial-gradient(circle, #D8A23D 0.9px, transparent 1.1px)",
          backgroundSize: "16px 16px, 16px 16px",
          backgroundPosition: "0 0, 8px 8px",
          maskImage: "radial-gradient(ellipse at top right, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at top right, black 20%, transparent 75%)"
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* COMPACT FIRST-SCREEN INTRO */}
        <div className="text-center max-w-[760px] mx-auto mb-8 sm:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#FF5A4F] mb-3"
          >
            Sessions & Pricing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] text-[#0B2A4A] tracking-[-0.015em] mb-3"
          >
            Private Coaching, <span className="text-[#FF5A4F] italic font-normal">Priced Simply.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#5C5550] max-w-[540px] mx-auto leading-[1.6] mb-5"
          >
            Choose the format and time that feel right for your conversation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE9]/80 border border-[#0B2A4A]/8 text-[11.5px] sm:text-[12px] font-medium text-[#0B2A4A]/80 tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4F] shrink-0" />
            <span>Open to Individuals & Couples • 100% Online & Confidential</span>
          </motion.div>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {options.map((session, idx) => {
            const isFeatured = session.emphasize;

            return (
              <motion.div
                key={session.duration}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease: "easeOut" }}
                className={`relative flex flex-col rounded-[22px] transition-all duration-300 ${
                  isFeatured
                    ? "bg-white border-2 border-[#FF5A4F] shadow-[0_12px_36px_rgba(255,90,79,0.14)] lg:-translate-y-1.5"
                    : "bg-white border border-[#0B2A4A]/10 shadow-[0_4px_20px_rgba(11,42,74,0.04)] hover:border-[#FF5A4F]/30 hover:shadow-[0_8px_28px_rgba(11,42,74,0.08)] hover:-translate-y-1"
                }`}
              >
                {/* FEATURED BADGE */}
                {isFeatured && (
                  <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 bg-[#FF5A4F] text-white text-[11px] font-bold tracking-[0.12em] uppercase px-3.5 py-1 rounded-full shadow-[0_4px_12px_rgba(255,90,79,0.35)]">
                      <Sparkles className="w-3 h-3 text-[#D8A23D]" />
                      Most Chosen
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  {/* DURATION & LABEL HEADER */}
                  <div className="mb-4">
                    <span className="block font-sans text-[11px] font-bold tracking-[0.14em] uppercase text-[#FF5A4F] mb-1.5">
                      {session.label}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-[38px] lg:text-[42px] font-bold text-[#0B2A4A] leading-none tracking-[-0.02em]">
                        {session.duration}
                      </span>
                      <span className="font-sans text-[14px] font-semibold text-[#0B2A4A]/60 uppercase tracking-wider">
                        Min
                      </span>
                    </div>
                  </div>

                  {/* PRICE DISPLAY */}
                  <div className="flex items-baseline gap-1.5 mb-5 pb-5 border-b border-[#0B2A4A]/8">
                    <span className="font-sans text-[34px] sm:text-[38px] font-extrabold text-[#0B2A4A] leading-none tracking-tight">
                      ${session.price}
                    </span>
                    <span className="text-[13px] font-normal text-[#5C5550]/75">
                      / session
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-[13.5px] sm:text-[14px] leading-[1.62] text-[#5C5550] mb-5 flex-grow">
                    {session.description}
                  </p>

                  {/* "BEST FOR" BADGE */}
                  <div className="mb-6">
                    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#0B2A4A]/50 mb-1.5">
                      Best for
                    </span>
                    <div className="bg-[#FAF7F4] border border-[#0B2A4A]/6 rounded-[10px] px-3 py-2 text-[11.5px] font-medium text-[#0B2A4A]/85 leading-snug">
                      {session.fit}
                    </div>
                  </div>

                  {/* CTA BUTTON */}
                  <Link
                    href={`/book?duration=${session.duration}`}
                    className={`group relative flex items-center justify-center w-full h-[46px] rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF5A4F] focus:ring-offset-2 ${
                      isFeatured
                        ? "bg-[#FF5A4F] hover:bg-[#F0443A] text-white shadow-[0_6px_20px_rgba(255,90,79,0.28)] hover:shadow-[0_8px_24px_rgba(255,90,79,0.36)]"
                        : "bg-[#0B2A4A] hover:bg-[#FF5A4F] text-white shadow-[0_4px_14px_rgba(11,42,74,0.12)] hover:shadow-[0_6px_20px_rgba(255,90,79,0.25)]"
                    }`}
                  >
                    <span>Book This Session</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM REASSURANCE MICRO-NOTE */}
        <div className="mt-8 text-center">
          <p className="font-serif text-[14px] sm:text-[15px] italic text-[#5C5550]/75 max-w-[620px] mx-auto">
            Not sure how much time you need? Start with a check-in — you can always adjust or book follow-ups at your own pace.
          </p>
        </div>

      </div>
    </section>
  );
}
