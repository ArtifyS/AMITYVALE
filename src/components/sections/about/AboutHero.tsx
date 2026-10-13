"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToMeet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("meet-angel");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full bg-white pt-[40px] pb-[60px] md:pt-[60px] md:pb-[80px] lg:pt-[80px] lg:pb-[100px] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1240px] relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full">
          
          {/* LEFT: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[48%] flex flex-col text-center lg:text-left z-10"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#0B2A4A] text-[11px] md:text-[12px] font-bold mb-4 block">
              ABOUT AMITY VALE
            </span>
            
            <h1 className="font-serif text-[clamp(42px,5vw,64px)] leading-[1.05] tracking-tight mb-5 text-[#0B2A4A]">
              Better Relationships Begin <br className="hidden lg:block" />
              <span className="font-serif text-[#FF5A4F] italic">With Better Understanding.</span>
            </h1>
            
            <p className="text-[#5C5550] text-[16px] md:text-[18px] leading-[1.6] max-w-[540px] mx-auto lg:mx-0 mb-8">
              Amity Vale was created around a simple belief: the relationships that shape our lives deserve more understanding, honesty, and intention.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#meet-angel"
                onClick={handleScrollToMeet}
                className="flex items-center justify-center h-[52px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[14px] tracking-wide shadow-[0_6px_20px_rgba(255,90,79,0.25)] hover:bg-[#E84E44] hover:-translate-y-[1px] transition-all duration-300 w-full sm:w-auto"
              >
                Meet Angel
              </a>
              
              <Link
                href="/coaching"
                className="flex items-center justify-center h-[52px] px-8 rounded-full bg-transparent border-[1.5px] border-[#0B2A4A]/10 text-[#0B2A4A] font-sans font-bold text-[14px] tracking-wide hover:bg-[#0B2A4A]/5 transition-all duration-300 w-full sm:w-auto"
              >
                Explore Coaching
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: Visual Composition */}
          <div className="w-full lg:w-[46%] relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[500px]"
            >
              {/* Decorative Ribbon */}
              <motion.div
                animate={prefersReducedMotion ? false : { y: [0, -6, 0], rotate: [-10, -7, -10] }}
                transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
                className="absolute -right-6 -bottom-10 md:-right-10 md:-bottom-12 w-[180px] md:w-[220px] z-0 opacity-[0.78]"
                style={{ transformOrigin: "center" }}
              >
                <img src="/3.png" alt="" className="w-full h-auto object-contain" aria-hidden="true" />
              </motion.div>

              {/* Main Editorial Image */}
              <div className="relative aspect-[4/5] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_24px_50px_rgba(11,42,74,0.1)] border-[2px] border-[#FF5A4F]/10 z-10 bg-[#F7F2EE]">
                <Image
                  src="/about_hero.jpg"
                  alt="Three mature adults having a warm conversation"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
