"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";


export function CoachingHero() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("area-navigator");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      className="relative w-full bg-white pt-[32px] md:pt-[40px] lg:pt-[56px] pb-12 md:pb-16 overflow-hidden"
      style={{ minHeight: "calc(100svh - 76px)" }}
    >
      <div className="container mx-auto px-6 max-w-[1240px] relative z-10 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0 w-full">
          
          {/* LEFT: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[48%] flex flex-col text-center lg:text-left z-10 lg:-mt-8"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#6E747A] text-[11px] md:text-[12px] font-bold mb-3 block">
              PRIVATE COACHING
            </span>
            
            <h1 className="font-serif text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-tight mb-4 text-[#0B2A4A]">
              Every Relationship in Your Life <br className="hidden md:block" />
              <span className="font-serif text-[#FF5A4F] italic">Shapes Something in You.</span>
            </h1>
            
            <p className="text-[#5C5550] text-[16px] md:text-[17px] leading-[1.6] max-w-[540px] mx-auto lg:mx-0 mb-6">
              Romantic relationships, family, friendships, faith, and the relationship you have with yourself can all become places of connection, conflict, growth, and change.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <a 
                href="#area-navigator"
                onClick={handleScrollToNav}
                className="flex items-center justify-center h-[50px] px-7 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[13.5px] tracking-wide shadow-[0_6px_20px_rgba(255,90,79,0.25)] hover:bg-[#E84E44] hover:-translate-y-[1px] transition-all duration-300 w-full sm:w-auto"
              >
                Explore Coaching Areas
                <ArrowDown className="ml-2 w-[16px] h-[16px]" />
              </a>
              
              <Link
                href="/book"
                className="flex items-center justify-center h-[50px] px-7 rounded-full bg-transparent border-[1.5px] border-[#0B2A4A]/10 text-[#0B2A4A] font-sans font-bold text-[13.5px] tracking-wide hover:bg-[#0B2A4A]/5 transition-all duration-300 w-full sm:w-auto group"
              >
                Book a Private Session
                <ArrowRight className="ml-2 w-[15px] h-[15px] transition-transform group-hover:translate-x-[2px]" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: Layered Collage */}
          <div className="w-full lg:w-[46%] relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[490px] aspect-[1/1.05]"
            >
              
              {/* Decorative Accent */}
              <motion.div
                animate={prefersReducedMotion ? false : { y: [0, -6, 0], rotate: [-10, -7, -10] }}
                transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
                className="absolute -right-8 -bottom-12 w-[180px] md:w-[250px] z-0 opacity-[0.75] hidden sm:block"
                style={{ transformOrigin: "center" }}
              >
                <img src="/3.png" alt="" className="w-full h-auto object-contain" aria-hidden="true" />
              </motion.div>

              {/* IMAGE A - Largest (Right) */}
              <div className="absolute top-[12%] right-[4%] w-[65%] aspect-[3/4] rounded-[30px] overflow-hidden shadow-[0_20px_40px_rgba(11,42,74,0.12)] border-[2px] border-white z-20">
                <Image
                  src="/coaching_hero_friends.jpg"
                  alt="Two mature friends having a conversation"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 65vw, 350px"
                />
              </div>

              {/* IMAGE B - Smaller (Top Left) */}
              <div className="absolute top-[2%] left-[2%] w-[45%] aspect-square rounded-[24px] overflow-hidden shadow-[0_15px_30px_rgba(11,42,74,0.1)] border-[2px] border-white z-30">
                <Image
                  src="/coaching_hero_individual.jpg"
                  alt="Thoughtful mature adult"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 45vw, 250px"
                />
              </div>

              {/* IMAGE C - Smaller (Bottom Left) */}
              <div className="absolute bottom-[2%] left-[12%] w-[42%] aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_15px_30px_rgba(11,42,74,0.1)] border-[2px] border-white z-30">
                <Image
                  src="/coaching_hero_family.jpg"
                  alt="Mature mother and daughter"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 42vw, 220px"
                />
              </div>

            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
