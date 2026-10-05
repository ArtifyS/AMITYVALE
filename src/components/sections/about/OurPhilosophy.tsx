"use client";

import React from "react";
import { motion } from "framer-motion";

export function OurPhilosophy() {
  return (
    <section id="philosophy" className="py-[120px] md:py-[180px] bg-[#161514] text-[#F8F5F1] relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-white/50 mb-10"
        >
          Our Philosophy
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-[36px] md:text-[56px] leading-[1.1] max-w-[800px] mb-16 md:mb-24"
        >
          <span className="text-white/80">The Goal Is Not to Decide Who Is Right.</span><br />
          It Is to Understand What Keeps Happening Between You.
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 w-full max-w-[1000px]">
          {[
            { num: "01", text: "Listen Before Reacting" },
            { num: "02", text: "Understand the Pattern" },
            { num: "03", text: "Practice a Different Response" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="font-serif text-[20px] text-[#E98267] mb-4">{item.num}</div>
              <div className="h-[1px] w-[40px] bg-white/20 mb-6"></div>
              <h3 className="font-sans text-[14px] md:text-[15px] tracking-wide text-white/90">
                {item.text}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
