"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function OurPhilosophy() {
  return (
    <section className="py-20 md:py-28 bg-[#FDFCF9] relative">
      <div className="container mx-auto px-4 md:px-6 max-w-[1240px]">
        
        <div className="flex flex-col lg:flex-row w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(11,42,74,0.12)]">
          
          {/* LEFT: Dark Navy Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] bg-[#0B2A4A] p-10 md:p-16 lg:p-20 flex flex-col justify-center relative border-b lg:border-b-0 lg:border-r border-[#FF5A4F]/20"
          >
            <span className="font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-6 block">
              OUR PHILOSOPHY
            </span>
            
            <h2 className="font-serif text-[36px] md:text-[46px] lg:text-[50px] leading-[1.1] text-white mb-6">
              Understanding Changes <br className="hidden lg:block" />
              <span className="italic text-[#FF5A4F]">How We Relate.</span>
            </h2>
            
            <p className="text-white/80 text-[16px] md:text-[17px] leading-[1.65] mb-12">
              Change often begins before the conversation changes — when we understand ourselves, the other person, and the pattern between us more clearly.
            </p>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center text-white font-sans font-bold text-[14px] tracking-wide">
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] mr-4 opacity-50">1</span>
                Pause
              </div>
              <div className="w-[1px] h-[16px] bg-white/10 ml-[11px]" />
              <div className="flex items-center text-white font-sans font-bold text-[14px] tracking-wide">
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] mr-4 opacity-50">2</span>
                Understand
              </div>
              <div className="w-[1px] h-[16px] bg-white/10 ml-[11px]" />
              <div className="flex items-center text-[#FF5A4F] font-sans font-bold text-[14px] tracking-wide">
                <span className="w-6 h-6 rounded-full bg-[#FF5A4F]/10 flex items-center justify-center text-[10px] mr-4">3</span>
                Choose Differently
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[55%] relative min-h-[400px] lg:min-h-full bg-[#EAE6DF]"
          >
            <Image
              src="/about_philosophy.jpg"
              alt="Two mature friends walking and talking"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
