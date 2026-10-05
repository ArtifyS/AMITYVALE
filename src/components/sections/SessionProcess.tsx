"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Video } from "lucide-react";

export function SessionProcess() {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-background">
      <div className="mx-auto max-w-[1260px] bg-[#F4EAE4] rounded-[28px] md:rounded-[32px] overflow-hidden flex flex-col shadow-sm py-16 md:py-24 px-6 md:px-12 lg:px-16 relative">
        
        {/* Subtle Background Dot Pattern */}
        <div 
          className="absolute top-0 right-0 w-[240px] h-[240px] opacity-[0.08] pointer-events-none translate-x-1/4 -translate-y-1/4"
          style={{
            backgroundImage: `radial-gradient(circle, #E98267 2px, transparent 2.5px)`,
            backgroundSize: `16px 16px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
          }}
        />

        {/* Asymmetric Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-20 gap-6 lg:gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:w-[50%]"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#E98267] text-[11px] md:text-[12px] font-bold mb-5 block">
              How It Works
            </span>
            <h2 className="font-serif text-[38px] md:text-[46px] lg:text-[54px] leading-[1.05] text-[#151312]">
              Getting Started Is Simple.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:w-[45%]"
          >
            <p className="text-[#5C5550] text-[16px] md:text-[17px] leading-[1.6] max-w-md">
              Choose the session length that fits your needs, book a convenient time, and meet privately online from wherever you are.
            </p>
          </motion.div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          
          {/* Subtle Connectors (Desktop Only) */}
          <div className="hidden md:flex absolute top-[53px] left-[18%] right-[18%] items-center justify-between z-0 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-[38%] h-[1px] border-t-[2px] border-dotted border-[#E98267]/30 origin-left" 
            />
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-[38%] h-[1px] border-t-[2px] border-dotted border-[#E98267]/30 origin-left" 
            />
          </div>

          {/* Card 1: Choose Your Session */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative z-10 bg-[#FDFBF7] rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#151312]/[0.03] flex flex-col group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]"
          >
            <div className="w-[42px] h-[42px] rounded-full bg-[#F4EAE4] border border-[#E98267]/20 flex items-center justify-center mb-8 group-hover:bg-[#E98267]/10 transition-colors">
              <span className="font-serif text-[15px] font-medium text-[#E98267]">01</span>
            </div>
            <h3 className="font-serif text-[22px] md:text-[24px] text-[#151312] mb-3">Choose Your Session</h3>
            <p className="text-[#5C5550] text-[15px] leading-[1.6] mb-10 flex-grow">
              Select the session length that fits your needs: 15, 30, 45, or 60 minutes.
            </p>
            {/* Visual Cue */}
            <div className="w-full h-[64px] rounded-[16px] bg-[#F4EAE4]/60 flex items-center px-3 justify-between border border-[#151312]/5 transition-colors group-hover:border-[#E98267]/20 mt-auto">
              {["15", "30", "45", "60"].map(t => (
                <div key={t} className={`flex items-center justify-center h-[36px] flex-1 mx-1 rounded-[10px] text-[13px] font-sans font-semibold transition-all duration-300 ${t === "45" ? "bg-[#E98267] text-white shadow-sm" : "bg-transparent text-[#5C5550] group-hover:bg-white/50"}`}>
                  {t} <span className={`ml-[2px] text-[10px] font-medium ${t === "45" ? "text-white/80" : "text-[#5C5550]/60"}`}>min</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Select Your Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="relative z-10 bg-[#FDFBF7] rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#151312]/[0.03] flex flex-col group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]"
          >
            <div className="w-[42px] h-[42px] rounded-full bg-[#F4EAE4] border border-[#E98267]/20 flex items-center justify-center mb-8 group-hover:bg-[#E98267]/10 transition-colors">
              <span className="font-serif text-[15px] font-medium text-[#E98267]">02</span>
            </div>
            <h3 className="font-serif text-[22px] md:text-[24px] text-[#151312] mb-3">Select Your Time</h3>
            <p className="text-[#5C5550] text-[15px] leading-[1.6] mb-10 flex-grow">
              Choose a convenient available appointment from the private calendar.
            </p>
            {/* Visual Cue */}
            <div className="w-full h-[64px] rounded-[16px] bg-[#F4EAE4]/60 flex items-center px-4 gap-4 border border-[#151312]/5 transition-colors group-hover:border-[#E98267]/20 mt-auto">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-white flex flex-col items-center justify-center shadow-sm overflow-hidden shrink-0 border border-black/5">
                <div className="bg-[#E98267] w-full h-[8px]" />
                <span className="text-[12px] font-bold text-[#151312] mt-[2px]">14</span>
              </div>
              <div className="flex-1 flex gap-2">
                <div className="h-[30px] flex-1 bg-white/60 rounded-[8px] border border-black/[0.03] flex items-center justify-center text-[11px] font-semibold text-[#5C5550]">
                  9:00 AM
                </div>
                <div className="h-[30px] flex-1 bg-[#E98267]/10 rounded-[8px] border border-[#E98267]/20 flex items-center justify-center text-[11px] font-bold text-[#E98267]">
                  10:30 AM
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Meet Privately Online */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="relative z-10 bg-[#FDFBF7] rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#151312]/[0.03] flex flex-col group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]"
          >
            <div className="w-[42px] h-[42px] rounded-full bg-[#F4EAE4] border border-[#E98267]/20 flex items-center justify-center mb-8 group-hover:bg-[#E98267]/10 transition-colors">
              <span className="font-serif text-[15px] font-medium text-[#E98267]">03</span>
            </div>
            <h3 className="font-serif text-[22px] md:text-[24px] text-[#151312] mb-3">Meet Privately Online</h3>
            <p className="text-[#5C5550] text-[15px] leading-[1.6] mb-10 flex-grow">
              Join your confidential coaching session from anywhere.
            </p>
            {/* Visual Cue */}
            <div className="w-full h-[64px] rounded-[16px] bg-[#F4EAE4]/60 flex items-center px-4 justify-between border border-[#151312]/5 transition-colors group-hover:border-[#E98267]/20 mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center shadow-sm text-[#E98267]">
                  <Video className="w-4 h-4 ml-[1px]" />
                </div>
                <span className="text-[12.5px] font-bold text-[#151312]">Secure Video</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#5C5550]">
                <Lock className="w-[12px] h-[12px]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Private</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
