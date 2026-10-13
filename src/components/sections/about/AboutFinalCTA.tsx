"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

export function AboutFinalCTA() {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] bg-[#161514] overflow-hidden flex items-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/coaching_hero_individual.jpg"
          alt="Reflective mature individual"
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A4A]/90 via-[#0B2A4A]/70 to-transparent" />
      </div>

      {/* Decorative Accent */}
      <DecorativeAccent
        src="/12.png"
        opacity={0.15}
        animateVariant="float"
        className="w-[400px] md:w-[600px] left-[-10%] top-[-10%] md:left-[-5%] md:top-[-20%] z-0"
        style={{ filter: "brightness(0.5) sepia(1) hue-rotate(320deg) saturate(200%)" }}
      />

      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[60%] lg:w-[50%]"
        >
          <h2 className="font-serif text-[38px] md:text-[50px] lg:text-[56px] leading-[1.05] text-white mb-6">
            You Do Not Need Every Answer <br className="hidden md:block" />
            <span className="italic text-[#FF5A4F]">Before You Start.</span>
          </h2>
          
          <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.65] font-medium mb-10 max-w-[440px]">
            Sometimes the first step is simply seeing the situation more clearly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/book"
              className="flex items-center justify-center h-[52px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[14px] tracking-wide shadow-[0_6px_20px_rgba(255,90,79,0.25)] hover:bg-[#E84E44] transition-colors w-full sm:w-auto"
            >
              Book a Private Session
            </Link>
            
            <Link 
              href="/coaching"
              className="flex items-center justify-center h-[52px] px-8 rounded-full bg-transparent border-[1.5px] border-white/20 text-white font-sans font-bold text-[14px] tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Explore Coaching
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
