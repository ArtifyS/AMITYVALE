"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MidCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-12 md:py-20 bg-white relative z-20">
      <div className="container mx-auto px-6 max-w-[960px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-[24px] md:rounded-[32px] bg-[#FDFBF7] border border-[#FF5A4F]/20 shadow-[0_12px_36px_rgba(255,90,79,0.06)] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12"
        >
          {/* Decorative flourish */}
          <div className="absolute right-0 top-0 w-[180px] md:w-[260px] opacity-[0.4] pointer-events-none translate-x-[30%] -translate-y-[20%]">
            <motion.img 
              animate={prefersReducedMotion ? false : { rotate: [0, 5, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              src="/9.png" 
              alt="" 
              aria-hidden="true" 
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="w-full md:w-[65%] flex flex-col text-center md:text-left z-10 mb-8 md:mb-0">
            <h3 className="font-serif text-[26px] md:text-[32px] text-[#0B2A4A] leading-[1.1] mb-3">
              Not Sure Which Area Fits?
            </h3>
            <p className="text-[#26313A] text-[15px] md:text-[16px] leading-[1.6]">
              Life does not separate neatly into categories. Start with what feels most important right now.
            </p>
          </div>

          <div className="w-full md:w-[35%] flex justify-center md:justify-end z-10">
            <Link 
              href="/book"
              className="flex items-center justify-center h-[52px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[13.5px] tracking-wide shadow-[0_6px_20px_rgba(255,90,79,0.25)] hover:bg-[#E84E44] hover:-translate-y-[1.5px] hover:shadow-[0_8px_24px_rgba(255,90,79,0.35)] transition-all duration-300 w-full sm:w-auto group"
            >
              Book a Private Session
              <ArrowRight className="ml-2 w-[16px] h-[16px] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
