"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

export function MeetAngelAbout() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="meet-angel" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT: Portrait Stack Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[45%] relative flex justify-center"
          >
            <div className="relative w-full max-w-[340px] md:max-w-[420px] mx-auto aspect-[4/5] z-10">
              
              {/* Decorative Ribbon Graphic (Stacked behind all cards) */}
              <DecorativeAccent
                src="/3.png"
                opacity={0.82}
                animateVariant="float3"
                className="w-[145px] right-[-20px] bottom-[-10px] md:w-[clamp(180px,21vw,260px)] md:right-[-65px] md:bottom-[-25px] z-0 pointer-events-none"
                style={{ transform: "rotate(-18deg)" }}
              />

              {/* Rear Coral Accent Card */}
              <div className="absolute inset-0 translate-x-[4%] translate-y-[3%] md:translate-x-[6.5%] md:translate-y-[4.5%] z-0 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  whileInView={{ opacity: 1, rotate: 3.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                  className="w-full h-full"
                >
                  <motion.div
                    animate={
                      prefersReducedMotion 
                        ? {} 
                        : {
                            x: [0, 4, 1, -2, 0],
                            y: [0, -3, 2, 1, 0],
                            rotate: [0, 0.4, 0.1, -0.3, 0]
                          }
                    }
                    transition={
                      prefersReducedMotion 
                        ? {} 
                        : {
                            duration: 11,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut" as const
                          }
                    }
                    className="w-full h-full rounded-[24px] md:rounded-[28px] bg-[#FF5A4F] shadow-[0_8px_30px_rgba(255,90,79,0.2)] border border-[#161514]/[0.03]"
                  />
                </motion.div>
              </div>

              {/* Front Portrait Card with proper object-top breathing room */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="absolute inset-0 rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] bg-[#F7F3EF] border border-black/[0.04] z-10 origin-bottom-left"
                style={{ rotate: "-1.5deg" }}
              >
                <Image
                  src="/angel_image.png"
                  alt="Portrait of Angel, Lead Coach"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </motion.div>

              {/* Compact Angel Info Badge overlapping Lower-Left */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="absolute -bottom-5 left-4 md:-bottom-2 md:-left-6 z-20 bg-white/95 backdrop-blur-md py-3.5 px-6 rounded-2xl shadow-[0_10px_26px_rgba(11,42,74,0.08)] border border-[#FF5A4F]/50 whitespace-nowrap"
              >
                <p className="font-serif text-[16px] leading-tight text-[#0B2A4A]">
                  Angel <br />
                  <span className="text-[10px] font-sans uppercase tracking-[0.12em] text-[#FF5A4F] font-bold">
                    Lead Coach
                  </span>
                </p>
              </motion.div>

            </div>
          </motion.div>

          {/* RIGHT: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
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
