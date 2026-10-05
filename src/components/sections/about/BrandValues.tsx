"use client";

import React from "react";
import { motion } from "framer-motion";

export function BrandValues() {
  const values = [
    {
      title: "RESPECT",
      desc: "People deserve to discuss personal matters without being reduced to labels or assumptions."
    },
    {
      title: "HONESTY",
      desc: "Real progress often starts with conversations that have been avoided."
    },
    {
      title: "PRIVACY",
      desc: "Personal relationship and intimacy concerns deserve discretion and thoughtful handling."
    },
    {
      title: "PROGRESS",
      desc: "Understanding matters most when it helps change what happens next."
    }
  ];

  return (
    <section className="py-[120px] md:py-[180px] bg-[#161514] text-[#F8F5F1] relative overflow-hidden">
      {/* Decorative Dots */}
      <div className="absolute bottom-[5%] left-[5%] w-[300px] h-[300px] opacity-[0.08] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#F8F5F1 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side */}
        <div className="w-full lg:w-[40%] flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-white/50 mb-6">
              Our Values
            </span>
            <h2 className="font-serif text-[38px] md:text-[52px] leading-[1.1] text-white">
              The Principles That Guide Our Work.
            </h2>
          </motion.div>
        </div>

        {/* Right Side - Values List */}
        <div className="w-full lg:w-[60%] flex flex-col gap-12">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-4 md:gap-12 pb-8 border-b-[1px] border-white/10 last:border-0"
            >
              <h3 className="w-full md:w-[140px] font-sans text-[13px] font-medium tracking-[0.12em] uppercase text-[#E98267] pt-1 shrink-0">
                {v.title}
              </h3>
              <p className="text-[17px] leading-[1.6] text-white/80">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
