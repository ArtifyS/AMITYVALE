"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

const shifts = [
  { from: "REACT", to: "PAUSE" },
  { from: "ASSUME", to: "UNDERSTAND" },
  { from: "REPEAT", to: "CHOOSE" },
];

export function TransformationSection() {
  return (
    <section className="py-24 md:py-32 bg-[#151312] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1180px] relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 relative">
          
          {/* ART DIRECTION GRAPHIC */}
          <DecorativeAccent
            src="/12.png"
            opacity={0.82}
            animateVariant="none"
            className="w-[100px] right-[-10px] bottom-[-20px] md:w-[150px] md:right-[-35px] md:bottom-[-45px] z-0 md:opacity-[0.82] opacity-[0.65]"
            style={{ transform: "rotate(-5deg)" }}
          />
          
          {/* Mobile Image (shown first on mobile) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:hidden relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl z-10"
          >
            <Image
              src="/transformation_shift_1791382015308.jpg"
              alt="Reflective individual in a peaceful setting"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Left Panel: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full lg:w-[45%] flex flex-col z-20"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] md:text-[12px] font-semibold mb-6 block">
              HOW CHANGE BEGINS
            </span>
            <h2 className="font-serif text-[38px] md:text-[48px] lg:text-[52px] leading-[1.08] text-[#FDFBF7] mb-6">
              Pause the Pattern.<br />
              See What Matters.<br />
              <span className="italic text-[#FF5A4F]">Choose What Happens Next.</span>
            </h2>
            <p className="text-[#FDFBF7]/70 text-[16px] md:text-[17px] leading-[1.65] mb-12 max-w-[460px]">
              Coaching creates space to slow things down, understand what is underneath the reaction, and respond with more clarity.
            </p>

            {/* Transformation Lines */}
            <div className="flex flex-col sm:flex-row lg:flex-row gap-5 sm:gap-8 lg:gap-8 mb-14 flex-wrap">
              {shifts.map((shift, i) => (
                <div key={i} className="flex items-center text-[12px] md:text-[13px] font-sans font-bold tracking-[0.12em]">
                  <span className="text-[#FDFBF7]/50">{shift.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF5A4F] mx-2.5 md:mx-3" />
                  <span className="text-[#FDFBF7]">{shift.to}</span>
                </div>
              ))}
            </div>

            <Link
              href="/coaching"
              className="inline-flex items-center justify-center h-[52px] px-8 bg-[#FF5A4F] text-[#FDFBF7] text-[13px] md:text-[14px] font-medium tracking-wide rounded-[26px] shadow-[0_8px_20px_rgba(233,130,103,0.18)] hover:bg-[#D57158] hover:shadow-[0_12px_25px_rgba(233,130,103,0.3)] transition-all duration-[450ms] ease-out hover:-translate-y-[1.5px] group w-full sm:w-max"
            >
              Explore Coaching Areas
              <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-[450ms] ease-out group-hover:translate-x-[3px]" />
            </Link>
          </motion.div>

          {/* Right Panel: Desktop Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block w-[52%] relative h-[600px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-10"
          >
            <Image
              src="/transformation_shift_1791382015308.jpg"
              alt="Reflective individual in a peaceful setting"
              fill
              className="object-cover object-center"
              sizes="55vw"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
