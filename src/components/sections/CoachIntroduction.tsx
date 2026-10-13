"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

export function CoachIntroduction() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="pt-16 md:pt-28 pb-10 md:pb-12 bg-surface relative overflow-hidden">
      {/* Soft transition into next section (bg-background) */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[120px] bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />
      
      {/* Very Subtle Decorative Geometry */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(#FF5A4F_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
      
      <div className="container mx-auto px-6 max-w-[1150px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 items-center">
          
          {/* Image Stack Column (Left on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:col-span-5 order-1"
          >
            <div className="relative w-full max-w-[340px] md:max-w-[420px] mx-auto aspect-[4/5] z-10">
              
              {/* Decorative Dot Cluster 1 (Desktop: Top Left) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.24 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="hidden md:block absolute top-[60px] -left-[55px] w-[190px] h-[210px] z-0 -rotate-[6deg] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, #FF5A4F 2px, transparent 2.5px)`,
                  backgroundSize: `16px 16px`,
                  maskImage: `radial-gradient(ellipse at center, black 0%, black 55%, rgba(0,0,0,0.75) 72%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 55%, rgba(0,0,0,0.75) 72%, transparent 100%)`,
                }}
              />

              {/* Decorative Dot Cluster (Mobile: Single) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.20 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="block md:hidden absolute top-[40px] -left-[25px] w-[120px] h-[120px] z-0 -rotate-[4deg] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, #FF5A4F 2px, transparent 2.5px)`,
                  backgroundSize: `16px 16px`,
                  maskImage: `radial-gradient(ellipse at center, black 0%, black 55%, rgba(0,0,0,0.75) 72%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 55%, rgba(0,0,0,0.75) 72%, transparent 100%)`,
                }}
              />

              {/* ART DIRECTION GRAPHIC */}
              <DecorativeAccent
                src="/3.png"
                opacity={0.88}
                animateVariant="float3"
                className="w-[145px] right-[-20px] bottom-[-10px] md:w-[clamp(180px,21vw,285px)] md:right-[-85px] md:bottom-[-35px] z-0"
                style={{ transform: "rotate(-18deg)" }}
              />

              {/* Decorative Back Card (Animated Layer) */}
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
                            rotate: [0, 0.4, 0.1, -0.3, 0] // Drifts subtly around the outer div's 3.5deg
                          }
                    }
                    transition={
                      prefersReducedMotion 
                        ? {} 
                        : {
                            duration: 11,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut"
                          }
                    }
                    className="w-full h-full rounded-[24px] md:rounded-[28px] bg-[#FF5A4F] shadow-[0_8px_30px_rgba(255,90,79,0.2)] border border-[#161514]/[0.03]"
                  />
                </motion.div>
              </div>

              {/* Front Portrait Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="absolute inset-0 rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgb(0,0,0,0.12)] bg-[#F7F3EF] border border-black/[0.04] z-10 origin-bottom-left"
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

            </div>

            {/* Small Floating Info Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute -bottom-5 -left-2 md:-bottom-2 md:-left-6 z-20 bg-white/95 backdrop-blur-md py-3.5 px-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#FF5A4F]/50"
            >
              <p className="font-serif text-[16px] leading-tight text-foreground">
                Angel <br/>
                <span className="text-[10px] font-sans uppercase tracking-[0.12em] text-[#FF5A4F] font-bold">Lead Coach</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Text Content Column (Right on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7 order-2 lg:pl-10 relative"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] md:text-[12px] font-semibold mb-5 block">
              Meet Your Coach
            </span>
            <h2 className="font-serif text-[34px] md:text-[42px] lg:text-[48px] leading-[1.1] text-foreground mb-6 max-w-lg">
              You Do Not Have to Figure This Out <span className="text-[#FF5A4F] italic">Alone.</span>
            </h2>
            
            <div className="space-y-5 text-[#5C5550] text-[15px] md:text-[17px] leading-[1.7] mb-8 max-w-xl">
              <p>
                Relationships are complex, and intimacy requires ongoing attention. Sometimes, what you need most is a <strong className="font-semibold text-[#FF5A4F]">neutral, experienced perspective</strong> to help you navigate the conversations you've been avoiding.
              </p>
              <p>
                I provide <strong className="font-semibold text-[#FF5A4F]">private, one-to-one support</strong> tailored to your unique dynamic. Through practical guidance and compassionate listening, we explore relationship and intimacy concerns in a completely <strong className="font-semibold text-[#FF5A4F]">safe, non-judgmental space</strong>.
              </p>
            </div>

            <ul className="space-y-3 mb-10">
              <li className="flex items-center text-[14px] md:text-[15px] text-[#5C5550]">
                <div className="w-[5px] h-[5px] rounded-full bg-[#FF5A4F] mr-4 opacity-80 shrink-0" />
                <span><strong className="font-semibold text-[#FF5A4F]">Private one-to-one</strong> guidance</span>
              </li>
              <li className="flex items-center text-[14px] md:text-[15px] text-[#5C5550]">
                <div className="w-[5px] h-[5px] rounded-full bg-[#FF5A4F] mr-4 opacity-80 shrink-0" />
                <span><strong className="font-semibold text-[#FF5A4F]">Online support</strong> for individuals and couples</span>
              </li>
              <li className="flex items-center text-[14px] md:text-[15px] text-[#5C5550]">
                <div className="w-[5px] h-[5px] rounded-full bg-[#FF5A4F] mr-4 opacity-80 shrink-0" />
                <span><strong className="font-semibold text-[#FF5A4F]">Communication, connection, and intimacy</strong> coaching</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
              <Button size="lg" className="rounded-full px-8 shadow-sm">
                Book a Private Consultation
              </Button>
              <Link href="/about" className="text-[14px] font-semibold text-foreground hover:text-[#FF5A4F] transition-colors flex items-center group">
                Learn more about Angel 
                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
