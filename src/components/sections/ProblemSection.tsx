"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ProblemSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      className="relative z-20 flex items-center justify-center overflow-hidden bg-white rounded-t-[28px] md:rounded-t-[36px] pt-16 md:pt-24 pb-16 md:pb-24 lg:pb-28"
      style={{ boxShadow: "0 -12px 40px rgba(0,0,0,0.03)" }}
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-[1050px] relative z-10">
        
        {/* TOP RIGHT: 12.png (Gold Botanical) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="absolute top-[18px] right-[4px] md:top-[22px] md:right-[6px] w-[145px] md:w-[185px] z-0 pointer-events-none"
        >
          <motion.div
            animate={prefersReducedMotion ? false : { rotate: [180, 182, 180] }}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
            style={{ transformOrigin: "top right", rotate: 180, scaleX: -1, opacity: 0.90 }}
          >
            <img src="/12.png" alt="" className="w-full h-auto object-contain" aria-hidden="true" />
          </motion.div>
        </motion.div>

        {/* CENTER WATERMARK: 4.png (Abstract couple) */}
        <div 
          className="absolute left-1/2 top-[52%] w-[115vw] md:w-[clamp(570px,62vw,850px)] z-0 pointer-events-none"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <motion.div
              animate={prefersReducedMotion ? false : { y: [0, -5, 0], scale: [1, 1.015, 1] }}
              transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
              className="w-full h-full"
            >
              <img src="/4.png" alt="" className="w-full h-auto object-contain opacity-[0.10] md:opacity-[0.16]" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Top Decorative Rule */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[80%] md:w-[70%] max-w-[600px] mx-auto h-[1px] bg-[#161514]/[0.06] mb-8 md:mb-10 origin-center"
        />

        {/* Content Wrapper for Quote Positioning */}
        <div className="relative w-full max-w-[850px] mx-auto flex flex-col items-center">
          
          {/* DECORATIVE ELEMENTS */}
          
          {/* BOTTOM LEFT: Dots only (triangles removed) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.35 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-[-40px] bottom-[-20px] md:left-[-120px] md:bottom-[-40px] w-[160px] h-[160px] md:w-[300px] md:h-[300px] z-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #E2854A 2px, transparent 2.5px)`,
              backgroundSize: `18px 18px`,
              maskImage: `radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.6) 40%, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.6) 40%, transparent 70%)`,
            }}
          />

          {/* FOREGROUND CONTENT (Z-10) */}

          {/* Large Opening Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="absolute -top-[30px] md:-top-[50px] left-[0%] md:left-[2%] font-serif text-[#FF5A4F] text-[140px] md:text-[240px] leading-[0.8] select-none pointer-events-none z-0"
            aria-hidden="true"
          >
            &ldquo;
          </motion.div>

          {/* Small Label with elegant flourish */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 font-sans uppercase tracking-[0.18em] text-[#FF5A4F] text-[11px] md:text-[12px] font-semibold mb-6 md:mb-8 flex flex-col items-center"
          >
            <span>A Human Reality</span>
          </motion.div>

          {/* Main Statement */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative z-10 font-serif text-[38px] md:text-[46px] lg:text-[clamp(46px,4.4vw,64px)] leading-[1.05] text-[#161514] font-normal tracking-tight text-center max-w-[700px] mb-8"
          >
            The Relationships That Matter Most<br />
            <span className="italic text-[#FF5A4F]">Can Be the Hardest to Navigate.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0.95, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-[125px] md:w-[190px] mt-[28px] relative z-10 flex justify-center pointer-events-none select-none"
          >
            <img src="/9.png" alt="" className="w-full h-auto object-contain" aria-hidden="true" />
          </motion.div>

          {/* Large Closing Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 0.06 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute -bottom-[40px] md:-bottom-[60px] right-[2%] md:right-[4%] font-serif text-[#FF5A4F] text-[120px] md:text-[200px] leading-[0.8] select-none pointer-events-none z-0"
            aria-hidden="true"
          >
            &rdquo;
          </motion.div>
        </div>

      </div>

      {/* Soft transition blend into next section */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[90px] bg-gradient-to-b from-transparent to-white pointer-events-none z-0" />
    </section>
  );
}
