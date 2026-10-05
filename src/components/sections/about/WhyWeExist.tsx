"use client";

import React from "react";
import { motion } from "framer-motion";

export function WhyWeExist() {
  return (
    <section className="py-[100px] md:py-[160px] bg-[#F8F5F1] relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side - Large Statement */}
        <div className="w-full lg:w-[45%]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-8">
              Why We Exist
            </span>
            <h2 className="font-serif text-[38px] md:text-[52px] leading-[1.1] text-[#161514]">
              Distance Does Not Always Mean <br className="hidden md:block" />
              Love Is Gone.
            </h2>
          </motion.div>

          {/* Micro-statements */}
          <div className="hidden lg:flex flex-col gap-6 mt-16 pl-6 border-l-[1px] border-[#161514]/10">
            {["Understanding before judgment.", "Connection before winning.", "Progress over perfection."].map((statement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="font-sans text-[12px] uppercase tracking-wider text-[#161514]/60"
              >
                {statement}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Brand Story */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6 text-[16px] md:text-[18px] leading-[1.7] text-[#161514]/80 max-w-[540px]"
          >
            <p>
              Sometimes two people still care deeply for one another but have lost the way back to feeling understood.
            </p>
            <p className="italic">
              Conversations repeat.<br />
              Defensiveness replaces curiosity.<br />
              Connection becomes harder.<br />
              Intimacy begins to feel complicated.
            </p>
            <p>
              Amity Vale was created around a simple belief: patterns can change when people have the space to slow down, understand what is happening beneath the surface, and practice a different way of meeting each other.
            </p>
          </motion.div>

          {/* Micro-statements Mobile */}
          <div className="flex lg:hidden flex-col gap-4 mt-12 pl-4 border-l-[1px] border-[#E98267]/30">
            {["Understanding before judgment.", "Connection before winning.", "Progress over perfection."].map((statement, idx) => (
              <div key={idx} className="font-sans text-[11px] uppercase tracking-wider text-[#161514]/60">
                {statement}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
