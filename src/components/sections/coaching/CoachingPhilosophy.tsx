"use client";

import React from "react";
import { motion } from "framer-motion";

export function CoachingPhilosophy() {
  return (
    <section className="py-[140px] md:py-[200px] bg-[#161514] text-[#F8F5F1] relative flex flex-col items-center text-center overflow-hidden">
      
      {/* Decorative Dots */}
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] opacity-[0.06] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#F8F5F1 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* Decorative Arc */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full border-[1px] border-white/5 pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-6 md:px-12 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-white/50 mb-10"
        >
          The Shift
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-[38px] md:text-[56px] leading-[1.1] mb-16"
        >
          <span className="text-white/90">You Do Not Change a Relationship<br className="hidden md:block" /> by Winning the Argument.</span>
          <br /><br />
          <span className="text-white/90">You Change</span><br />
          <span className="italic text-[#E98267]">What Happens Next.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 font-sans text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-white/40"
        >
          <span>Communicate</span>
          <span className="hidden md:block w-[4px] h-[4px] rounded-full bg-[#E98267]/50" />
          <span>Understand</span>
          <span className="hidden md:block w-[4px] h-[4px] rounded-full bg-[#E98267]/50" />
          <span>Reconnect</span>
        </motion.div>
      </div>
    </section>
  );
}
