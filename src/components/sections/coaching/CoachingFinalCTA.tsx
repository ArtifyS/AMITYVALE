"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CoachingFinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <div className="rounded-[32px] md:rounded-[40px] bg-[#0B2A4A] overflow-hidden flex flex-col lg:flex-row relative shadow-[0_24px_50px_rgba(11,42,74,0.15)]">
          
          {/* Text Content */}
          <div className="w-full lg:w-[55%] p-10 md:p-16 lg:p-20 flex flex-col justify-center z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[34px] md:text-[42px] lg:text-[48px] leading-[1.05] tracking-tight text-white mb-6"
            >
              Start With the Relationship <br />
              <span className="text-[#FF5A4F] italic">That Matters Most Right Now.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/80 text-[16px] md:text-[18px] leading-[1.6] mb-10 max-w-[400px]"
            >
              Choose the conversation you are ready to have.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
            >
              <Link 
                href="/book"
                className="flex items-center justify-center h-[52px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[13.5px] tracking-wide shadow-[0_6px_20px_rgba(255,90,79,0.3)] hover:bg-[#E84E44] hover:-translate-y-[1.5px] hover:shadow-[0_8px_24px_rgba(255,90,79,0.4)] transition-all duration-300 w-full sm:w-auto group"
              >
                Book a Private Session
                <ArrowRight className="ml-2 w-[16px] h-[16px] transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/pricing"
                className="flex items-center justify-center h-[52px] px-8 rounded-full bg-transparent border border-white/20 text-white font-sans font-bold text-[13.5px] tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                View Pricing
              </Link>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-[45%] h-[350px] lg:h-auto relative">
            <div className="absolute inset-0 lg:left-[-10%]">
              <Image
                src="/coaching_final_cta.jpg"
                alt="Hopeful human connection"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              {/* Gradient Overlay for seamless blend on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0B2A4A] lg:via-[#0B2A4A]/60 lg:to-transparent" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
