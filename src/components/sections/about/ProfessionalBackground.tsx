"use client";

import React from "react";
import { motion } from "framer-motion";

export function ProfessionalBackground() {
  return (
    <section className="py-[100px] md:py-[160px] bg-[#F8F5F1] relative border-t-[1px] border-[#161514]/5">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-6"
        >
          Professional Background
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-[34px] md:text-[44px] leading-[1.1] text-[#161514]"
        >
          Experience Matters.<br />
          <span className="italic text-[#161514]/70">Accuracy Matters Too.</span>
        </motion.h2>
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-12 flex flex-col gap-6">
        {[
          "[Professional Title — To Be Confirmed]",
          "[Education / Training — To Be Confirmed]",
          "[Relevant Certifications — To Be Confirmed]",
          "[Professional Experience — To Be Confirmed]"
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-center py-6 border-b-[1px] border-[#161514]/10"
          >
            <div className="w-[12px] h-[12px] rounded-full border-[2px] border-[#E98267] mb-4 md:mb-0 md:mr-8 shrink-0" />
            <p className="text-[16px] text-[#161514]/70 italic tracking-wide">
              {item}
            </p>
          </motion.div>
        ))}

        {/* Optional Disclaimer Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center text-[13px] text-[#161514]/40 uppercase tracking-wide"
        >
          [Disclaimer regarding coaching vs therapy services — To Be Confirmed by Client]
        </motion.div>
      </div>
    </section>
  );
}
