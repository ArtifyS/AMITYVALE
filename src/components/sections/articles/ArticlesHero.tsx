"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

export function ArticlesHero() {
  return (
    <section className="relative w-full bg-[#FCFBF8] pt-[32px] md:pt-[56px] pb-16 md:pb-24 lg:pb-32 overflow-hidden border-b border-[#0B2A4A]/5">
      {/* Energetic Art Direction - Background Splash */}
      <DecorativeAccent
        src="/5.png"
        opacity={0.06}
        animateVariant="pulse"
        className="w-[600px] md:w-[1000px] left-[-20%] top-[-10%] md:left-[-10%] md:top-[-20%] z-0"
        style={{ transform: "rotate(15deg)" }}
      />
      <DecorativeAccent
        src="/1.png"
        opacity={0.04}
        animateVariant="float"
        className="w-[400px] md:w-[800px] right-[-10%] bottom-[-10%] md:right-[-5%] md:bottom-[-20%] z-0 text-[#FF5A4F]"
        style={{ filter: "hue-rotate(320deg) saturate(200%)" }}
      />

      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
        
        {/* Editorial Page Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 mt-8 md:mt-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] md:text-[13px] font-bold mb-4 md:mb-5 block"
          >
            THE JOURNAL
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[38px] md:text-[54px] lg:text-[68px] leading-[1.05] tracking-tight text-[#0B2A4A] max-w-[900px]"
          >
            Thoughts on Connection, <br className="hidden md:block" />
            <span className="text-[#FF5A4F] italic">Growth, and Love.</span>
          </motion.h1>
        </div>

        {/* Featured Article - Magazine Cover Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full flex flex-col lg:flex-row items-center group cursor-pointer"
        >
          {/* Featured Image - Takes up 60% on desktop */}
          <div className="w-full lg:w-[62%] relative z-10">
            <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(11,42,74,0.12)] border-[3px] border-white transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]">
              <Image 
                src="/article_communication_1791392276197.jpg"
                alt="How to Communicate Better Without Turning It Into a Fight"
                fill
                className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                priority
                sizes="(max-width: 1024px) 100vw, 62vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/40 to-transparent opacity-0 md:opacity-100 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20" />
            </div>
          </div>

          {/* Featured Text Box - Overlaps the image on desktop */}
          <div className="w-[90%] md:w-[85%] lg:w-[45%] bg-white rounded-[24px] shadow-[0_24px_60px_rgba(11,42,74,0.08)] p-8 md:p-12 lg:p-14 relative z-20 -mt-16 lg:mt-0 lg:-ml-20 flex flex-col justify-center border border-[#0B2A4A]/[0.03] transition-all duration-[500ms] group-hover:shadow-[0_32px_70px_rgba(11,42,74,0.12)] group-hover:-translate-y-2">
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-[#FF5A4F]/10 text-[#FF5A4F] text-[10px] md:text-[11px] font-sans font-bold uppercase tracking-[0.15em] rounded-full">
                Featured
              </span>
              <span className="text-[#0B2A4A]/40 text-[12px] font-medium tracking-wide">
                RELATIONSHIPS
              </span>
            </div>

            <h2 className="font-serif text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] text-[#0B2A4A] mb-5 group-hover:text-[#FF5A4F] transition-colors duration-300">
              How to Communicate Better Without Turning It Into a Fight
            </h2>
            
            <p className="text-[#5C5550] text-[15px] md:text-[17px] leading-[1.65] mb-8">
              Practical ways to express what matters, listen differently, and keep difficult conversations from becoming another argument. Discover the core mechanics of healthy emotional exchange.
            </p>
            
            <Link 
              href="/articles/communicate-better" 
              className="inline-flex items-center text-[13px] md:text-[14px] font-sans font-bold text-[#151312] group-hover:text-[#FF5A4F] transition-colors duration-[320ms] w-fit"
              onClick={(e) => e.preventDefault()} // Placeholder
            >
              Read Full Article
              <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-[320ms] group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
