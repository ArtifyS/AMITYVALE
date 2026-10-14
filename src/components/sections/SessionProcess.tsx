"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Video } from "lucide-react";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

export function SessionProcess() {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-background">
      <div className="mx-auto max-w-[1260px] bg-[#F4EAE4] rounded-[28px] md:rounded-[32px] overflow-hidden flex flex-col shadow-sm py-16 md:py-24 px-6 md:px-12 lg:px-16 relative">
        
        {/* Subtle Background Dot Pattern */}
        <div 
          className="absolute top-0 right-0 w-[240px] h-[240px] opacity-[0.08] pointer-events-none translate-x-1/4 -translate-y-1/4"
          style={{
            backgroundImage: `radial-gradient(circle, #FF5A4F 2px, transparent 2.5px)`,
            backgroundSize: `16px 16px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
          }}
        />

        {/* Section Header */}
        <div className="flex flex-col mb-8 md:mb-14 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-5 block">
              How It Works
            </span>
            <h2 className="font-serif text-[38px] md:text-[46px] lg:text-[54px] leading-[1.05] text-[#151312]">
              Getting Started Is <span className="text-[#FF5A4F] italic">Simple.</span>
            </h2>
            
            {/* ART DIRECTION GRAPHIC */}
            <DecorativeAccent
              src="/6.png"
              opacity={0.9}
              animateVariant="none"
              className="w-[95px] md:w-[135px] relative mt-[14px]"
            />
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
              className="w-[38%] h-[1px] border-t-[2px] border-dotted border-[#FF5A4F]/30 origin-left" 
            />
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-[38%] h-[1px] border-t-[2px] border-dotted border-[#FF5A4F]/30 origin-left" 
            />
          </div>

          {/* Card 1: Choose Your Session */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative z-10 bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#151312]/[0.03] flex flex-col group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]"
          >
            <div className="w-[42px] h-[42px] rounded-full bg-[#F4EAE4] border border-[#FF5A4F]/20 flex items-center justify-center mb-8 group-hover:bg-[#FF5A4F]/10 transition-colors">
              <span className="font-serif text-[15px] font-medium text-[#FF5A4F]">01</span>
            </div>
            <h3 className="font-serif text-[22px] md:text-[24px] text-[#151312] mb-3"><span className="text-[#FF5A4F]">Choose</span> Your Session</h3>
            <p className="text-[#26313A] text-[15px] leading-[1.6] mb-10 flex-grow font-normal">
              Select the session length that fits your needs: 15, 30, 45, or 60 minutes.
            </p>
            {/* Visual Cue */}
            <div className="w-full h-[64px] rounded-[16px] bg-[#F4EAE4]/60 flex items-center px-3 justify-between border border-[#151312]/5 transition-colors group-hover:border-[#FF5A4F]/20 mt-auto">
              {["15", "30", "45", "60"].map(t => (
                <div key={t} className={`flex items-center justify-center h-[36px] flex-1 mx-1 rounded-[10px] text-[13px] font-sans font-semibold transition-all duration-300 ${t === "45" ? "bg-[#FF5A4F] text-white shadow-sm" : "bg-transparent text-[#26313A] group-hover:bg-white/50"}`}>
                  {t} <span className={`ml-[2px] text-[10px] font-medium ${t === "45" ? "text-white/80" : "text-[#5B6470]"}`}>min</span>
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
            className="relative z-10 bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#151312]/[0.03] flex flex-col group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]"
          >
            <div className="w-[42px] h-[42px] rounded-full bg-[#F4EAE4] border border-[#FF5A4F]/20 flex items-center justify-center mb-8 group-hover:bg-[#FF5A4F]/10 transition-colors">
              <span className="font-serif text-[15px] font-medium text-[#FF5A4F]">02</span>
            </div>
            <h3 className="font-serif text-[22px] md:text-[24px] text-[#151312] mb-3"><span className="text-[#FF5A4F]">Select</span> Your Time</h3>
            <p className="text-[#26313A] text-[15px] leading-[1.6] mb-10 flex-grow font-normal">
              Choose a convenient available appointment from the private calendar.
            </p>
            {/* Visual Cue */}
            <div className="w-full h-[64px] rounded-[16px] bg-[#F4EAE4]/60 flex items-center px-4 gap-4 border border-[#151312]/5 transition-colors group-hover:border-[#FF5A4F]/20 mt-auto">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-white flex flex-col items-center justify-center shadow-sm overflow-hidden shrink-0 border border-black/5">
                <div className="bg-[#FF5A4F] w-full h-[8px]" />
                <span className="text-[12px] font-bold text-[#151312] mt-[2px]">14</span>
              </div>
              <div className="flex-1 flex gap-2">
                <div className="h-[30px] flex-1 bg-white/60 rounded-[8px] border border-black/[0.03] flex items-center justify-center text-[11px] font-semibold text-[#26313A]">
                  9:00 AM
                </div>
                <div className="h-[30px] flex-1 bg-[#FF5A4F]/10 rounded-[8px] border border-[#FF5A4F]/20 flex items-center justify-center text-[11px] font-bold text-[#FF5A4F]">
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
            className="relative z-10 bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#151312]/[0.03] flex flex-col group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]"
          >
            <div className="w-[42px] h-[42px] rounded-full bg-[#F4EAE4] border border-[#FF5A4F]/20 flex items-center justify-center mb-8 group-hover:bg-[#FF5A4F]/10 transition-colors">
              <span className="font-serif text-[15px] font-medium text-[#FF5A4F]">03</span>
            </div>
            <h3 className="font-serif text-[22px] md:text-[24px] text-[#151312] mb-3"><span className="text-[#FF5A4F]">Meet Privately</span> Online</h3>
            <p className="text-[#26313A] text-[15px] leading-[1.6] mb-10 flex-grow font-normal">
              Join your confidential coaching session from anywhere.
            </p>
            {/* Visual Cue */}
            <div className="w-full h-[64px] rounded-[16px] bg-[#F4EAE4]/60 flex items-center px-4 justify-between border border-[#151312]/5 transition-colors group-hover:border-[#FF5A4F]/20 mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center shadow-sm text-[#FF5A4F]">
                  <Video className="w-4 h-4 ml-[1px]" />
                </div>
                <span className="text-[12.5px] font-bold text-[#151312]">Secure Video</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#5B6470]">
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
