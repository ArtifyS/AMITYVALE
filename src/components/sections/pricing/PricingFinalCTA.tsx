"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PricingFinalCTA() {
  return (
    <section className="py-[120px] md:py-[160px] bg-[#161514] relative overflow-hidden text-center">
      {/* Decorative Dots */}
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] opacity-[0.06] pointer-events-none hidden md:block">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#F8F5F1 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
        
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#FF5A4F] mb-6"
        >
          Ready When You Are
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-[38px] md:text-[52px] leading-[1.1] text-white mb-8"
        >
          One Conversation<br /> Can Be a Place to Begin.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[16px] md:text-[18px] leading-[1.6] text-white/70 max-w-[500px] mb-12"
        >
          Choose the amount of time that feels right and take the next step privately, at your own pace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 w-full"
        >
          <Link
            href="/book"
            className="flex items-center justify-center h-[54px] px-10 bg-[#FF5A4F] text-white text-[14px] font-medium tracking-wide uppercase rounded-[3px] hover:bg-[#F0443A] transition-colors w-full sm:w-auto"
          >
            Book a Private Session
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-white/30"
        >
          15 &nbsp;â€¢&nbsp; 30 &nbsp;â€¢&nbsp; 45 &nbsp;â€¢&nbsp; 60 MINUTE SESSIONS
        </motion.div>

      </div>
    </section>
  );
}
