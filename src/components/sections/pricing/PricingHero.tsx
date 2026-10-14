"use client";

import React from "react";
import { motion } from "framer-motion";

export function PricingHero() {
  return (
    <section className="relative w-full pt-[60px] pb-[40px] md:pt-[100px] md:pb-[60px] bg-white overflow-hidden">
      {/* Restrained CSS Dot Pattern */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] opacity-10 pointer-events-none hidden md:block">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#161514 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* Subtle oversized background graphic */}
      <div className="absolute top-[20%] right-[-5%] font-serif text-[240px] leading-none text-[#161514]/[0.02] pointer-events-none select-none overflow-hidden">
        15/60
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#FF5A4F] mb-6"
        >
          Sessions & Pricing
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-[clamp(40px,5vw,56px)] leading-[1.1] text-[#161514] mb-6"
        >
          Choose the Time <br className="hidden md:block" />
          <span className="italic text-[#FF5A4F]">That Fits the Conversation.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-[16px] md:text-[18px] leading-[1.6] text-[#161514]/70 max-w-[540px] mb-8"
        >
          Every conversation needs a different amount of space. Choose the session length that feels right for what you want to talk through.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#161514]/40"
        >
          PRIVATE &nbsp;•&nbsp; ONLINE &nbsp;•&nbsp; INDIVIDUAL OR COUPLE
        </motion.div>
      </div>
    </section>
  );
}
