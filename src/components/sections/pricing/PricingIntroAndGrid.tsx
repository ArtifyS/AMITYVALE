"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { sessionOptions, calculateSessionPrice } from "@/lib/pricingConfig";
import { ParticipantSelector } from "@/components/ui/ParticipantSelector";

export function PricingIntroAndGrid() {
  const [participants, setParticipants] = useState(1);
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
        <div className="text-center max-w-[760px] mx-auto mb-7 sm:mb-8">
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
            className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#5C5550] max-w-[540px] mx-auto leading-[1.6]"
          >
            Choose the format and time that feel right for your conversation.
          </motion.p>
        </div>

        {/* ELEGANT PARTICIPANT SELECTOR */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mb-9 sm:mb-11 flex justify-center"
        >
          <ParticipantSelector
            value={participants}
            onChange={setParticipants}
          />
        </motion.div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {options.map((session, idx) => {
            const isFeatured = session.emphasize;
            const pricing = calculateSessionPrice(session.duration, participants);

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
                {/* FEATURED BADGE (Remains on 30-min session regardless of participant count) */}
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

                  {/* PRICE DISPLAY WITH LIVE UPDATES */}
                  <div className="mb-5 pb-5 border-b border-[#0B2A4A]/8 min-h-[78px] flex flex-col justify-start">
                    <div className="flex items-baseline gap-1.5">
                      <motion.span 
                        key={pricing.total}
                        initial={{ opacity: 0.6, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="font-sans text-[34px] sm:text-[38px] font-extrabold text-[#0B2A4A] leading-none tracking-tight"
                      >
                        ${pricing.total}
                      </motion.span>
                      <span className="text-[13px] font-normal text-[#5C5550]/75">
                        / session
                      </span>
                    </div>

                    {/* Breakdown line when participantCount > 1 */}
                    <AnimatePresence mode="wait">
                      {participants > 1 && (
                        <motion.p
                          key={`breakdown-${participants}`}
                          initial={{ opacity: 0, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -2 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="text-[11px] sm:text-[11.5px] text-[#5C5550] mt-1.5 leading-snug"
                        >
                          ${pricing.basePrice} session + ${pricing.additionalParticipantFee} for {pricing.additionalParticipants} {pricing.additionalParticipants === 1 ? "additional participant" : "additional participants"}
                        </motion.p>
                      )}
                    </AnimatePresence>
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

                  {/* CTA BUTTON CARRYING DURATION AND PARTICIPANTS */}
                  <Link
                    href={`/book?duration=${session.duration}&participants=${participants}`}
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

      </div>
    </section>
  );
}
