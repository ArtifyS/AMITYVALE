"use client";

import React from "react";
import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="py-10 md:py-12 lg:py-16 bg-[#F7F3EF] flex items-center justify-center overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-[1050px] relative z-10">
        
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
          
          {/* Large Opening Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="absolute -top-[20px] md:-top-[40px] left-[0%] md:left-[2%] font-serif text-[#E98267] text-[120px] md:text-[220px] leading-[0.8] select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </motion.div>

          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 font-sans uppercase tracking-[0.16em] text-[#E98267] text-[11px] md:text-[12px] font-semibold mb-4 md:mb-5"
          >
            Relationship Note
          </motion.div>

          {/* Main Statement */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative z-10 font-serif text-[38px] md:text-[46px] lg:text-[clamp(46px,4.4vw,64px)] leading-[1.05] text-[#161514] font-normal tracking-tight text-center max-w-[700px]"
          >
            Even Loving Partners Can<br />
            <span className="italic text-[#E98267]">Feel Far Apart.</span>
          </motion.h2>

          {/* Large Closing Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 0.12 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute -bottom-[50px] md:-bottom-[80px] right-[2%] md:right-[4%] font-serif text-[#E98267] text-[100px] md:text-[180px] leading-[0.8] select-none pointer-events-none"
            aria-hidden="true"
          >
            &rdquo;
          </motion.div>
        </div>

      </div>

      {/* Soft transition blend into next section */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[90px] bg-gradient-to-b from-transparent to-surface pointer-events-none z-0" />
    </section>
  );
}
