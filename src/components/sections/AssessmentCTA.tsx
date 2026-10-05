"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const snapshotData = [
  { label: "Communication", val: "Moderate", width: "60%", warn: false },
  { label: "Connection", val: "Strong", width: "85%", warn: false },
  { label: "Conflict Patterns", val: "Needs Attention", width: "35%", warn: true },
  { label: "Intimacy", val: "Moderate", width: "55%", warn: false }
];

export function AssessmentCTA() {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1260px] bg-[#F7F2EE] rounded-[28px] md:rounded-[32px] overflow-hidden flex flex-col lg:flex-row shadow-sm">
        
        {/* LEFT COPY AREA */}
        <div className="w-full lg:w-[45%] p-10 md:p-14 lg:p-[72px] flex flex-col justify-center order-1 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#E98267] text-[11px] md:text-[12px] font-bold mb-5 block">
              Free Relationship Check-In
            </span>
            <h2 className="font-serif text-[38px] md:text-[48px] lg:text-[54px] leading-[1.05] text-[#151312] mb-6">
              See What’s Working —<br />
              And What Needs More Attention.
            </h2>
            <p className="text-[#5C5550] text-[16px] md:text-[17px] leading-[1.6] mb-10 max-w-sm">
              Answer a few thoughtful questions about communication, connection, conflict, and intimacy — then receive a private snapshot of the areas that may deserve more attention.
            </p>

            <Button size="lg" className="w-full sm:w-auto bg-[#E98267] hover:bg-[#d67258] text-white rounded-full px-8 h-[52px] mb-4 shadow-none">
              Start the Free Check-In
            </Button>
            <p className="text-[11px] md:text-[12px] text-[#5C5550]/80 font-sans tracking-wide text-center sm:text-left mt-2 sm:mt-0 sm:pl-2">
              Takes only a few minutes &nbsp;•&nbsp; Private &nbsp;•&nbsp; No payment required
            </p>
          </motion.div>
        </div>

        {/* RIGHT PREVIEW AREA */}
        <div className="w-full lg:w-[55%] relative min-h-[480px] md:min-h-[560px] lg:min-h-[640px] flex items-center justify-center overflow-hidden order-2 bg-gradient-to-br from-white/20 to-transparent group cursor-pointer p-6 pb-20 md:pb-6">
          
          {/* Abstract background shape */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[380px] h-[280px] md:h-[380px] rounded-full bg-[#E98267] opacity-[0.06] blur-3xl pointer-events-none" />
          
          {/* Optional subtle dot cluster */}
          <div 
            className="absolute bottom-10 right-10 w-[120px] h-[120px] opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #E98267 2px, transparent 2.5px)`,
              backgroundSize: `16px 16px`,
              maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            }}
          />
          
          <div className="relative w-full max-w-[330px] md:max-w-[360px] flex items-center justify-center mt-[-30px] md:mt-[-40px]">
            
            {/* Result Card (Behind) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="absolute inset-0 z-20 w-full bg-white rounded-[24px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#151312]/[0.03] transition-all duration-[600ms] ease-out group-hover:-translate-y-2 group-hover:-translate-x-3 group-hover:rotate-[1.5deg] translate-x-4 translate-y-12 md:translate-x-10 md:translate-y-14"
            >
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#E98267] uppercase block mb-6">Your Connection Snapshot</span>
              
              <div className="space-y-4">
                {snapshotData.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[11px] md:text-[12px] font-sans font-semibold text-[#5C5550]">
                      <span>{item.label}</span>
                      <span className={item.warn ? "text-[#E98267]" : "text-[#151312]"}>{item.val}</span>
                    </div>
                    <div className="w-full h-[4px] bg-black/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.warn ? "bg-[#E98267]" : "bg-[#D8C8BE]"}`} style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Main Question Card (Front) */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="relative z-30 w-full bg-[#FDFBF7] rounded-[24px] p-6 shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-[#151312]/[0.04] transition-all duration-[600ms] ease-out group-hover:-translate-y-3 group-hover:rotate-[-0.5deg]"
            >
              <div className="flex justify-between items-center mb-5">
                <span className="text-[10px] font-sans font-bold tracking-widest text-[#5C5550]/60 uppercase">Question 04 of 10</span>
              </div>
              <div className="w-full h-[3px] bg-[#151312]/5 rounded-full mb-6 overflow-hidden">
                <div className="w-[40%] h-full bg-[#E98267] rounded-full" />
              </div>
              <h4 className="font-serif text-[18px] md:text-[20px] leading-[1.3] text-[#151312] mb-6 pr-2">
                When conflict starts, how easy is it for you to feel heard?
              </h4>
              <div className="space-y-2.5">
                {["Rarely", "Sometimes", "Often", "Almost always"].map((opt) => (
                  <div key={opt} className={`px-4 py-3 rounded-[14px] text-[13.5px] font-sans font-semibold transition-colors ${
                    opt === "Often" 
                      ? "bg-[#E98267]/10 text-[#E98267] border border-[#E98267]/30" 
                      : "bg-white border border-[#151312]/[0.06] text-[#5C5550]"
                  }`}>
                    {opt}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Insight Micro-Card */}
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -4 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden md:block absolute z-40 -left-12 bottom-2 w-[220px] bg-[#151312] text-white rounded-[20px] p-5 shadow-2xl transition-all duration-[600ms] ease-out group-hover:-translate-y-2 group-hover:-translate-x-3 group-hover:rotate-[-8deg]"
            >
              <span className="text-[9px] font-sans font-bold tracking-widest text-[#E98267] uppercase block mb-2">Personal Reflection</span>
              <p className="text-[13px] leading-[1.4] text-white/90">
                One area worth exploring: How conflict changes the way you both communicate.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
