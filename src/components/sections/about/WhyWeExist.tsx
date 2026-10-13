"use client";

import React from "react";
import { motion } from "framer-motion";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

export function WhyWeExist() {
  return (
    <section className="py-20 md:py-28 bg-[#FDFCF9] relative overflow-hidden">
      
      {/* Subtle Arc Decoration */}
      <DecorativeAccent
        src="/11.png"
        opacity={0.3}
        animateVariant="none"
        className="w-[300px] md:w-[450px] left-0 top-[10%] z-0"
        style={{ transform: "scaleX(-1)", transformOrigin: "left center" }}
      />

      <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          
          {/* LEFT: Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] flex flex-col"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#6E747A] text-[11px] md:text-[12px] font-bold mb-4 block">
              WHY AMITY VALE EXISTS
            </span>
            <h2 className="font-serif text-[38px] md:text-[46px] lg:text-[52px] leading-[1.1] text-[#0B2A4A] tracking-tight">
              The People We Care About Can Be the <br className="hidden lg:block" />
              <span className="italic text-[#FF5A4F]">Hardest to Understand.</span>
            </h2>
          </motion.div>

          {/* RIGHT: Story & Principles */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[55%] flex flex-col"
          >
            <div className="text-[#5C5550] text-[16px] md:text-[17px] leading-[1.65] space-y-5 mb-12">
              <p>
                Relationships rarely become difficult because people stop caring. More often, they become caught in patterns, assumptions, and conversations that no longer move them forward.
              </p>
              <p>
                Amity Vale creates space to slow those patterns down, understand what is really happening, and choose a more intentional way to relate.
              </p>
            </div>

            <div className="flex flex-col space-y-8 md:space-y-10">
              
              <div className="flex flex-col">
                <h3 className="font-sans font-bold text-[#0B2A4A] text-[13px] md:text-[14px] tracking-wide mb-1">
                  <span className="text-[#FF5A4F] mr-3">01</span>
                  Understanding Before Reaction
                </h3>
                <p className="text-[#6E747A] text-[14.5px] md:text-[15.5px] leading-[1.5] pl-[34px]">
                  See the pattern clearly before trying to change it.
                </p>
              </div>

              <div className="flex flex-col">
                <h3 className="font-sans font-bold text-[#0B2A4A] text-[13px] md:text-[14px] tracking-wide mb-1">
                  <span className="text-[#FF5A4F] mr-3">02</span>
                  Honesty Without Judgment
                </h3>
                <p className="text-[#6E747A] text-[14.5px] md:text-[15.5px] leading-[1.5] pl-[34px]">
                  Make room for difficult conversations without turning them into blame.
                </p>
              </div>

              <div className="flex flex-col">
                <h3 className="font-sans font-bold text-[#0B2A4A] text-[13px] md:text-[14px] tracking-wide mb-1">
                  <span className="text-[#FF5A4F] mr-3">03</span>
                  Growth With Intention
                </h3>
                <p className="text-[#6E747A] text-[14.5px] md:text-[15.5px] leading-[1.5] pl-[34px]">
                  Move forward with choices that feel more conscious and aligned.
                </p>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
