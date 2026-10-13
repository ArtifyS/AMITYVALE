"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

export function MeetAngelAbout() {
  return (
    <section id="meet-angel" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT: Portrait */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] relative flex justify-center"
          >
            <div className="relative w-full max-w-[420px]">
              
              {/* Decorative Accent behind portrait */}
              <DecorativeAccent
                src="/2.png"
                opacity={0.15}
                animateVariant="none"
                className="w-[180px] md:w-[250px] right-[-30px] bottom-[-20px] md:right-[-50px] md:bottom-[-40px] z-0"
                style={{ filter: "hue-rotate(320deg) saturate(200%)" }}
              />

              <div className="relative aspect-[4/5] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_24px_50px_rgba(11,42,74,0.08)] border-[1.5px] border-[#FF5A4F]/20 bg-[#F7F2EE] z-10">
                <Image
                  src="/angel_image.png"
                  alt="Angel, Lead Coach"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Small floating label */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-6 md:top-1/2 md:-translate-y-1/2 bg-white px-5 py-3 rounded-full border border-[#FF5A4F]/30 shadow-[0_8px_20px_rgba(11,42,74,0.06)] z-20 whitespace-nowrap">
                <span className="font-serif text-[16px] text-[#0B2A4A] italic font-medium mr-2">Angel</span>
                <span className="font-sans uppercase tracking-[0.16em] text-[#6E747A] text-[9px] font-bold border-l border-[#0B2A4A]/10 pl-2">
                  Lead Coach
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[55%] flex flex-col text-center lg:text-left"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#6E747A] text-[11px] md:text-[12px] font-bold mb-4 block">
              MEET ANGEL
            </span>
            
            <h2 className="font-serif text-[34px] md:text-[42px] lg:text-[48px] leading-[1.1] text-[#0B2A4A] mb-6">
              A Calm Perspective <br className="hidden lg:block" />
              <span className="italic text-[#FF5A4F]">When Things Feel Complicated.</span>
            </h2>
            
            <div className="space-y-5 text-[#5C5550] text-[16px] md:text-[17px] leading-[1.65] mb-10 max-w-[500px] mx-auto lg:mx-0">
              <p>
                Angel&apos;s work is centered on helping people slow down the patterns that create distance, confusion, or conflict in the relationships that matter most.
              </p>
              <p>
                His role is not to tell you what your life should look like, but to help you understand what is happening more clearly so you can make decisions with greater honesty and intention.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 mb-10 mx-auto lg:mx-0 text-left">
              <div className="flex items-center">
                <div className="w-[4px] h-[4px] rounded-full bg-[#FF5A4F] mr-3" />
                <span className="text-[#0B2A4A] font-sans text-[14px] font-medium tracking-wide">Private one-to-one guidance</span>
              </div>
              <div className="flex items-center">
                <div className="w-[4px] h-[4px] rounded-full bg-[#FF5A4F] mr-3" />
                <span className="text-[#0B2A4A] font-sans text-[14px] font-medium tracking-wide">Online sessions</span>
              </div>
              <div className="flex items-center">
                <div className="w-[4px] h-[4px] rounded-full bg-[#FF5A4F] mr-3" />
                <span className="text-[#0B2A4A] font-sans text-[14px] font-medium tracking-wide">Support across relationships, faith, and personal growth</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link
                href="/book"
                className="flex items-center justify-center h-[52px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[14px] tracking-wide shadow-[0_6px_20px_rgba(255,90,79,0.25)] hover:bg-[#E84E44] transition-colors w-full sm:w-auto"
              >
                Book a Private Session
              </Link>
              <Link
                href="/coaching"
                className="flex items-center justify-center h-[52px] px-8 rounded-full bg-transparent text-[#0B2A4A] font-sans font-bold text-[14px] tracking-wide hover:bg-[#0B2A4A]/5 transition-colors w-full sm:w-auto"
              >
                Explore Coaching &rarr;
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
