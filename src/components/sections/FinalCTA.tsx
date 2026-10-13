"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background px-4 sm:px-6">
      <div className="container mx-auto max-w-[1260px]">
        <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden min-h-[580px] md:min-h-[620px] flex items-center justify-center">
          
          {/* Animated Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/closing_image.png"
              alt="Emotional connection between couple"
              fill
              className="object-cover object-[center_30%] md:object-center"
              sizes="(max-width: 1260px) 100vw, 1260px"
            />
            
            {/* Cinematic Rich Overlay */}
            <div className="absolute inset-0 bg-[#151312]/20" />
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(21, 19, 18, 0.4) 60%, rgba(21, 19, 18, 0.85) 100%)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151312]/95 via-[#151312]/50 to-transparent" />
            
            {/* Subtle Warm Glow (Editorial detail) */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF5A4F]/20 blur-[120px] mix-blend-screen pointer-events-none rounded-full translate-x-1/4 translate-y-1/4" />
          </motion.div>

          {/* ART DIRECTION GRAPHIC */}
          <DecorativeAccent
            src="/1.png"
            opacity={0.78}
            animateVariant="float2"
            className="w-[135px] right-[-55px] bottom-[-40px] md:w-[clamp(190px,23vw,310px)] md:right-[-65px] md:bottom-[-65px] z-0 md:opacity-[0.78] opacity-[0.55]"
            style={{ transform: "rotate(-18deg)" }}
          />

          <div className="relative z-10 px-6 py-20 w-full flex flex-col items-center text-center pointer-events-none">
            <div className="pointer-events-auto flex flex-col items-center w-full">
              {/* Main Content Stagger */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.1 }
                }
              }}
              className="max-w-[760px] mx-auto w-full"
            >
              
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="font-serif text-[42px] sm:text-[52px] md:text-[62px] lg:text-[70px] leading-[1.05] text-[#FDFBF7] mb-6 tracking-tight"
              >
                Do Not Let Distance Become<br />
                <span className="text-[#FF5A4F] inline-block mt-2">Your New Normal.</span>
              </motion.h2>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="text-[#FDFBF7]/85 text-[16px] md:text-[18px] mb-12 max-w-2xl mx-auto leading-[1.65]"
              >
                Rebuilding connection takes time, but the first step can begin with one honest conversation. Choose the path that feels right for you.
              </motion.p>
              
              {/* CTAs */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto"
              >
                <button className="h-[56px] px-10 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[14.5px] tracking-wide hover:bg-[#D9735A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm w-full sm:w-auto min-w-[240px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/50">
                  Book a Private Session
                </button>
                <button className="h-[56px] px-10 rounded-full bg-white/5 border border-white/20 text-[#FDFBF7] font-sans font-bold text-[14.5px] tracking-wide hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto min-w-[240px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
                  Take the Free Assessment
                </button>
              </motion.div>

              {/* Trust Micro-line */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } }
                }}
                className="mt-8 flex items-center justify-center"
              >
                <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#FDFBF7]/60 font-bold">
                  Private â€¢ Online â€¢ Personalized
                </span>
              </motion.div>

            </motion.div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
