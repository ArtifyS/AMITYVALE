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
    <section 
      className="relative w-full bg-white pt-[28px] pb-[40px] md:pt-[36px] md:pb-[44px] lg:pt-[44px] lg:pb-[36px] overflow-hidden flex flex-col justify-center min-h-0 lg:min-h-[calc(100svh-76px)]"
    >
      <div className="container mx-auto px-6 max-w-[1240px] relative z-10 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-8 xl:gap-12 w-full">
          
          {/* LEFT: Copy Group */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-full lg:w-[49%] xl:w-[48%] flex flex-col text-center lg:text-left z-10 lg:-mt-3"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#0B2A4A] text-[11px] md:text-[12px] font-bold mb-[18px] lg:mb-[20px] block">
              ABOUT AMITY VALE
            </span>
            
            <h1 className="font-serif text-[clamp(2.45rem,10.5vw,3.35rem)] lg:text-[clamp(34px,3.8vw,50px)] leading-[1.02] lg:leading-[1.08] tracking-tight mb-[20px] lg:mb-[22px] text-[#0B2A4A]">
              Better Relationships Begin <br className="hidden md:block" />
              <span className="font-serif text-[#FF5A4F] italic">With Better Understanding.</span>
            </h1>
            
            <p className="text-[#5C5550] text-[15.5px] md:text-[16.5px] leading-[1.6] max-w-[90%] md:max-w-[480px] lg:max-w-[490px] mx-auto lg:mx-0 mb-[26px] lg:mb-[28px]">
              Amity Vale was created around a simple belief: the relationships that shape our lives deserve more understanding, honesty, and intention.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-[11px] sm:gap-4 w-full">
              <a 
                href="#meet-angel"
                onClick={handleScrollToMeet}
                className="flex items-center justify-center h-[50px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[13.5px] tracking-wide shadow-[0_6px_20px_rgba(255,90,79,0.22)] hover:bg-[#E84E44] hover:-translate-y-[1px] transition-all duration-300 w-full sm:w-auto"
              >
                Meet Angel
              </a>
              
              <Link
                href="/coaching"
                className="flex items-center justify-center h-[50px] px-8 rounded-full bg-transparent border-[1.5px] border-[#0B2A4A]/15 text-[#0B2A4A] font-sans font-bold text-[13.5px] tracking-wide hover:bg-[#0B2A4A]/5 hover:-translate-y-[1px] transition-all duration-300 w-full sm:w-auto"
              >
                Explore Coaching
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: Unified Editorial Collage */}
          <div className="w-full lg:w-[47%] xl:w-[46%] relative flex justify-center lg:justify-end mt-[30px] lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative w-[calc(100%-32px)] max-w-[348px] h-[345px] lg:w-full lg:max-w-[485px] xl:max-w-[515px] lg:h-[clamp(445px,62vh,495px)] mx-auto lg:mx-0"
            >
              
              {/* Decorative Ribbon Accent (Desktop only to prevent mobile clutter) */}
              <motion.div
                animate={prefersReducedMotion ? false : { y: [0, -5, 0], rotate: [-10, -7, -10] }}
                transition={{ duration: 16, ease: "easeInOut" as const, repeat: Infinity }}
                className="absolute -right-6 -bottom-6 md:-right-8 md:-bottom-8 w-[160px] md:w-[190px] z-0 opacity-[0.74] pointer-events-none hidden lg:block"
                style={{ transformOrigin: "center" }}
              >
                <Image
                  src="/3.png"
                  alt=""
                  width={220}
                  height={220}
                  className="w-full h-auto object-contain"
                  aria-hidden="true"
                />
              </motion.div>

              {/* IMAGE 1 — MAIN IMAGE: Three mature adults conversing (Left / Lower-Middle) */}
              <div 
                className="absolute left-0 top-[20px] lg:top-[9%] w-[60%] h-[76%] lg:h-[82%] rounded-[24px] lg:rounded-[30px] overflow-hidden shadow-[0_16px_36px_rgba(11,42,74,0.08),0_4px_12px_rgba(11,42,74,0.04)] border-[2px] border-white z-20 bg-[#F7F2EE]"
              >
                <Image
                  src="/about_hero.jpg"
                  alt="Three mature adults having an authentic, thoughtful conversation in natural daylight"
                  fill
                  priority
                  className="object-cover object-[50%_25%]"
                  sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 320px"
                />
              </div>

              {/* IMAGE 2 — TOP-RIGHT: Two mature friends talking */}
              <div 
                className="absolute right-0 top-0 lg:top-[2%] w-[45%] lg:w-[43%] h-[34%] lg:h-[36%] rounded-[20px] lg:rounded-[24px] overflow-hidden shadow-[0_12px_28px_rgba(11,42,74,0.07),0_4px_10px_rgba(11,42,74,0.03)] border-[2px] border-white z-30 bg-[#F7F2EE]"
              >
                <Image
                  src="/about_hero_friends.jpg"
                  alt="Two mature friends conversing naturally over coffee"
                  fill
                  priority
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 22vw, 240px"
                />
              </div>

              {/* IMAGE 3 — BOTTOM-RIGHT: Adult parent and adult child connection */}
              <div 
                className="absolute right-0 top-[37%] lg:top-[41%] w-[45%] lg:w-[43%] h-[44%] lg:h-[48%] rounded-[20px] lg:rounded-[24px] overflow-hidden shadow-[0_14px_32px_rgba(11,42,74,0.08),0_4px_10px_rgba(11,42,74,0.04)] border-[2px] border-white z-30 bg-[#F7F2EE]"
              >
                <Image
                  src="/about_hero_family.jpg"
                  alt="Mature father and adult daughter in a gentle, warm moment of connection"
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 768px) 45vw, (max-width: 1200px) 22vw, 240px"
                />
              </div>

            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
