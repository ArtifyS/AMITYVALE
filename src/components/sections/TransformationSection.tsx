"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const shifts = [
  { num: "01", from: "React", to: "Respond" },
  { num: "02", from: "Defend", to: "Understand" },
  { num: "03", from: "Win", to: "Connect" },
];

export function TransformationSection() {
  return (
    <section className="py-12 md:py-24 bg-background px-4 sm:px-6">
      <div className="mx-auto max-w-[1260px] rounded-[24px] md:rounded-[30px] overflow-hidden bg-[#151312] flex flex-col lg:flex-row relative lg:h-[580px] shadow-2xl">
        
        {/* LEFT PANEL */}
        <div className="w-full lg:w-[45%] p-10 md:p-14 lg:p-[64px] flex flex-col justify-center relative z-20 order-1">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#E98267] text-[11px] md:text-[12px] font-semibold mb-5 block">
              The Shift
            </span>
            <h2 className="font-serif text-[38px] md:text-[46px] lg:text-[52px] leading-[1.05] text-[#FDFBF7] mb-6">
              Hear Each Other.<br />
              Not Just React.
            </h2>
            <p className="text-[#FDFBF7]/80 text-[16px] md:text-[17px] leading-[1.6] mb-10 max-w-sm">
              Real intimacy grows when both people feel understood. Coaching helps turn defensiveness into curiosity and conflict into connection.
            </p>
          </motion.div>
          
          {/* Shift Rail (Mobile / Tablet) */}
          <div className="block lg:hidden mb-10 relative">
            <div className="absolute top-2 bottom-2 left-[7px] w-[1px] bg-[#E98267]/20 z-0" />
            <div className="flex flex-col gap-5">
              {shifts.map((shift, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative z-10 flex items-center group"
                >
                  <div className="w-[15px] h-[15px] rounded-full bg-[#151312] border-[3px] border-[#E98267] mr-4 shrink-0 transition-colors" />
                  <div className="flex items-center text-[13px] sm:text-[14px] font-sans font-medium">
                    <span className="text-[#FDFBF7]/40 w-[24px] tracking-wider">{shift.num}</span>
                    <span className="text-[#FDFBF7]/80 w-[55px] text-left">{shift.from}</span>
                    <span className="text-[#E98267]/50 mx-3 text-[10px]">→</span>
                    <span className="text-[#FDFBF7]">{shift.to}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button size="lg" className="w-full sm:w-auto bg-[#E98267] hover:bg-[#d67258] text-white rounded-full px-8 h-[50px] shadow-none">
              Explore Private Coaching
            </Button>
          </motion.div>
        </div>

        {/* RIGHT PANEL (Image) */}
        <div className="w-full lg:w-[55%] relative h-[360px] md:h-[440px] lg:h-full order-2">
          <motion.div 
            initial={{ scale: 1.02 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/shift2_image.png"
              alt="Mature couple in genuine conversation"
              fill
              className="object-cover object-[center_20%] md:object-[center_25%]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </motion.div>
          
          {/* Desktop Gradient Seam to blend into left panel */}
          <div className="hidden lg:block absolute top-0 left-0 bottom-0 w-[140px] bg-gradient-to-r from-[#151312] to-transparent z-10" />

          {/* Mobile Top Gradient Seam */}
          <div className="block lg:hidden absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[#151312] to-transparent z-10" />
        </div>

        {/* Shift Rail (Desktop) */}
        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-[45%] -translate-x-[30px] z-30 flex-col gap-8">
          <div className="absolute top-2 bottom-2 left-[7px] w-[1px] bg-[#E98267]/20 z-0" />
          
          {shifts.map((shift, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative z-10 flex items-center group cursor-default"
            >
              <div className="w-[15px] h-[15px] rounded-full bg-[#151312] border-[3px] border-[#E98267] mr-5 shrink-0 transition-colors duration-300 group-hover:bg-[#E98267]" />
              
              <div className="flex items-center text-[14px] font-sans font-medium">
                <span className="text-[#FDFBF7]/40 w-[24px] tracking-wider">{shift.num}</span>
                <span className="text-[#FDFBF7]/80 w-[65px] text-left">{shift.from}</span>
                <span className="text-[#E98267]/50 mx-4 text-[10px]">→</span>
                <span className="text-[#FDFBF7] transition-all duration-300 group-hover:text-[#FDFBF7] group-hover:translate-x-1.5 border-b border-transparent group-hover:border-[#E98267]/60 pb-[2px]">
                  {shift.to}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
