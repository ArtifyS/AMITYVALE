"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export function CoachingHero() {
  return (
    <section className="relative w-full pt-[45px] pb-[80px] md:pt-[clamp(60px,6vw,80px)] md:pb-[120px] bg-[#F8F5F1] overflow-hidden min-h-[650px] md:min-h-[760px] flex items-center">
      {/* Decorative dots in the background */}
      <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] opacity-10 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#161514 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* Left Side - Content (Approx 50%) */}
        <div className="w-full md:w-[48%] lg:w-[50%] flex flex-col pt-8 md:pt-0">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] md:text-[12px] font-medium tracking-[0.16em] uppercase text-[#161514]/70 mb-6"
          >
            Relationship & Intimacy Coaching
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[clamp(42px,5vw,64px)] leading-[1.05] text-[#161514] mb-6"
          >
            When the Same Patterns Keep Returning, <br className="hidden lg:block" />
            <span className="italic font-light text-[#E98267]">Something Has to Change.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[16px] md:text-[18px] leading-[1.6] text-[#161514]/80 max-w-[480px] mb-10"
          >
            Coaching gives you space to understand what is happening beneath the conflict, communicate more clearly, and build a different way of relating to each other.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              href="/book"
              className="inline-flex items-center justify-center h-[50px] px-8 bg-[#161514] text-white text-[13px] font-medium tracking-wide uppercase rounded-[3px] hover:bg-[#161514]/90 transition-colors"
            >
              Book a Private Session
            </Link>
            <Link
              href="#coaching-areas"
              className="group inline-flex items-center text-[14px] font-medium text-[#161514] hover:text-[#E98267] transition-colors"
            >
              Explore Coaching <span className="ml-2 group-hover:translate-y-1 transition-transform">↓</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Image (Approx 50%) */}
        <div className="w-full md:w-[50%] lg:w-[48%] relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full aspect-[4/5] md:aspect-[3.5/4] lg:aspect-[4/4.5] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] group"
          >
            <Image
              src="/hero_image.jpg"
              alt="A quiet moment of reflection between two people"
              fill
              priority
              className="object-cover object-[center_30%] group-hover:scale-[1.025] transition-transform duration-[1.5s] ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle mask to integrate the image better with the background */}
            <div className="absolute inset-0 border-[1px] border-black/5 rounded-[24px] pointer-events-none" />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
