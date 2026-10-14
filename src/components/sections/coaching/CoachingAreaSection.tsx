"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CoachingAreaProps {
  id: string;
  number: string;
  eyebrowText: string;
  title: React.ReactNode;
  description: React.ReactNode;
  chips: string[];
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  isEven: boolean;
  backgroundClass?: string;
  accentClass?: string;
  decorativeElement?: React.ReactNode;
}

export function CoachingAreaSection({
  id,
  number,
  eyebrowText,
  title,
  description,
  chips,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
  isEven,
  backgroundClass = "bg-white",
  accentClass = "border-[#FF5A4F]",
  decorativeElement
}: CoachingAreaProps) {
  return (
    <section id={id} className={`pt-16 pb-16 md:pt-28 md:pb-28 relative overflow-hidden ${backgroundClass}`} style={{ scrollMarginTop: "100px" }}>
      {/* Container */}
      <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
        
        <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-[40px] md:gap-20 lg:gap-28`}>
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full md:w-1/2 flex justify-center order-1 ${isEven ? 'md:order-2' : ''}`}
          >
            <div className="relative w-full max-w-[380px] md:max-w-[440px]">
              <div className={`relative aspect-[1/1.15] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-[0_18px_42px_rgba(11,42,74,0.09),0_5px_14px_rgba(11,42,74,0.05)] border-[2px] ${accentClass} z-10 bg-white`}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Decorative Element */}
              {decorativeElement && (
                <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                  {decorativeElement}
                </div>
              )}
            </div>
          </motion.div>

          {/* Text Content Side */}
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full md:w-1/2 flex flex-col text-center md:text-left order-2 ${isEven ? 'md:order-1' : ''}`}
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#5B6470] text-[11px] md:text-[12px] font-bold mb-4 block">
              <span className="text-[#FF5A4F] mr-2">{number}</span> — {eyebrowText}
            </span>
            
            <h2 className="font-serif text-[32px] md:text-[38px] lg:text-[44px] leading-[1.1] mb-5 text-[#0B2A4A]">
              {title}
            </h2>
            
            <p className="text-[#26313A] text-[16px] md:text-[17px] leading-[1.65] mb-8 max-w-[480px] mx-auto md:mx-0 font-normal">
              {description}
            </p>
            
            {/* Topic Chips */}
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start mb-10">
              {chips.map((chip, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-[#E8E4DF] bg-white text-[#26313A] text-[12.5px] font-medium tracking-wide shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </div>

            <Link 
              href={ctaHref} 
              className="inline-flex items-center justify-center md:justify-start text-[#151312] hover:text-[#FF5A4F] text-[13.5px] font-bold tracking-wide transition-colors group"
            >
              {ctaText}
              <ArrowRight className="ml-2 w-[15px] h-[15px] transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
