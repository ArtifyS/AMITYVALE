"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative w-full pt-[45px] pb-[80px] md:pt-[clamp(60px,6vw,80px)] md:pb-[120px] bg-[#F8F5F1] overflow-hidden">
      {/* Decorative Dot Pattern & Visual Motifs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-20 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#161514 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>
      
      {/* Soft Coral Arc Motif */}
      <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-[1px] border-[#E98267]/30 pointer-events-none" />
      
      {/* Oversized Subtle Serif Monogram */}
      <div className="absolute top-[20%] right-[-5%] md:right-[5%] text-[300px] md:text-[500px] font-serif leading-none text-[#161514]/[0.02] pointer-events-none select-none">
        A V
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-[60%] lg:w-[55%]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block font-sans text-[11px] md:text-[12px] font-medium tracking-[0.16em] uppercase text-[#161514]/70 mb-6">
              About Amity Vale
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[clamp(42px,5vw,76px)] leading-[1.05] text-[#161514] mb-8"
          >
            Where Understanding <br className="hidden md:block" />
            <span className="italic font-light text-[#E98267]">Becomes Connection.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[16px] md:text-[18px] leading-[1.6] text-[#161514]/80 max-w-[480px] mb-10"
          >
            Relationships rarely become difficult because people stop caring. More often, they become caught in conversations, reactions, and patterns they no longer know how to change.
            <br /><br />
            Amity Vale exists to create space for those conversations to move somewhere different.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              href="#philosophy"
              className="inline-flex items-center justify-center h-[50px] px-8 bg-[#161514] text-white text-[13px] font-medium tracking-wide uppercase rounded-[3px] hover:bg-[#161514]/90 transition-colors"
            >
              Explore Our Approach
            </Link>
            <Link
              href="#meet-angel"
              className="group inline-flex items-center text-[14px] font-medium text-[#161514] hover:text-[#E98267] transition-colors"
            >
              Meet Angel <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        
        {/* Abstract Composition / Text Fragments for Desktop */}
        <div className="hidden md:flex flex-col items-end justify-center w-[40%] space-y-12 pr-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-right"
          >
            <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#161514]/40 mb-2">01</span>
            <span className="font-serif text-[24px] text-[#161514]/80">Communication</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-right border-r-[2px] border-[#E98267] pr-4"
          >
            <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#161514]/40 mb-2">02</span>
            <span className="font-serif text-[24px] text-[#161514]/80">Connection</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-right"
          >
            <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#161514]/40 mb-2">03</span>
            <span className="font-serif text-[24px] text-[#161514]/80">Intimacy</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
