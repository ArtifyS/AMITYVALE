"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PricingFinalCTA() {
  return (
    <section className="relative py-[110px] sm:py-[130px] md:py-[160px] bg-[#0B1522] overflow-hidden text-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pricing_cta_bg.jpg"
          alt="Mature couple sharing a thoughtful, calm conversation"
          fill
          priority={false}
          className="object-cover object-center scale-[1.02]"
          sizes="100vw"
        />
        
        {/* Layered Charcoal Overlays (60%–70% opacity) for high contrast and readability */}
        <div className="absolute inset-0 bg-[#0B1522]/65" />
        
        {/* Radial vignette focusing contrast directly onto center copy */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(11,21,34,0.58) 0%, rgba(11,21,34,0.85) 68%, rgba(11,21,34,0.98) 100%)"
          }}
        />

        {/* Vertical gradient feathering for smooth edge blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522]/95 via-transparent to-[#0B1522]/85" />
      </div>

      {/* Subtle decorative dot pattern (desktop only, non-distracting) */}
      <div className="absolute top-[10%] right-[6%] w-[260px] h-[260px] opacity-[0.06] pointer-events-none hidden md:block z-[1]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#FFFFFF 1.2px, transparent 1.4px)",
            backgroundSize: "22px 22px"
          }}
        />
      </div>

      {/* Central Content */}
      <div className="max-w-[800px] mx-auto px-5 sm:px-6 md:px-12 flex flex-col items-center relative z-10">
        
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="inline-block font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#FF5A4F] mb-4 sm:mb-5"
        >
          Ready When You Are
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="font-serif text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px] leading-[1.08] text-white tracking-[-0.015em] mb-5 sm:mb-6"
        >
          One Conversation<br />
          <span className="italic text-[#FF5A4F] font-normal">Can Be a Place to Begin.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className="text-[15.5px] sm:text-[17px] md:text-[18px] leading-[1.65] text-white/85 max-w-[560px] mb-8 sm:mb-10 font-sans"
        >
          Choose the amount of time that feels right and take the next step privately, at your own pace.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-9 sm:mb-10 w-full sm:w-auto"
        >
          <Link
            href="/book"
            className="group flex items-center justify-center h-[52px] sm:h-[54px] px-9 bg-[#FF5A4F] hover:bg-[#F0443A] text-white text-[13.5px] font-semibold tracking-wide rounded-full shadow-[0_8px_26px_rgba(255,90,79,0.32)] hover:shadow-[0_12px_32px_rgba(255,90,79,0.44)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            <span>Book a Private Session</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Clean Unicode Bullet formatting (Zero broken characters) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
          className="font-sans text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase text-white/50"
        >
          15 • 30 • 45 • 60 MINUTE SESSIONS
        </motion.div>

      </div>
    </section>
  );
}
