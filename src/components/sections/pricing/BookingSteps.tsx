"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "CHOOSE YOUR SESSION",
    desc: "Select 15, 30, 45, or 60 minutes."
  },
  {
    num: "02",
    title: "SELECT YOUR TIME",
    desc: "Choose an available appointment that works for you."
  },
  {
    num: "03",
    title: "MEET PRIVATELY ONLINE",
    desc: "Join your private conversation at the scheduled time."
  }
];

export function BookingSteps() {
  return (
    <section className="py-[100px] md:py-[140px] bg-[#F8F5F1] relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        
        {/* Intro */}
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-4"
          >
            Simple From Here
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[32px] md:text-[44px] leading-[1.1] text-[#161514]"
          >
            Choose. Schedule. Talk.
          </motion.h2>
        </div>

        {/* Steps Horizontal/Vertical Progression */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 relative">
          
          {/* Background Line (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[40px] right-[40px] h-[1px] bg-[#161514]/10 pointer-events-none" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              className="flex-1 flex flex-col relative md:px-4 lg:px-8"
            >
              {/* Mobile Vertical Line */}
              {idx < steps.length - 1 && (
                <div className="md:hidden absolute top-[60px] left-[24px] bottom-[-40px] w-[1px] bg-[#161514]/10 pointer-events-none" />
              )}
              
              <div className="font-serif text-[48px] md:text-[56px] text-[#E98267]/40 leading-none mb-6 md:mb-8 relative z-10 bg-[#F8F5F1] inline-block w-fit pr-6">
                {step.num}
              </div>
              
              <h3 className="font-sans text-[12px] font-medium tracking-[0.12em] uppercase text-[#161514] mb-3">
                {step.title}
              </h3>
              
              <p className="text-[15px] leading-[1.6] text-[#161514]/70 max-w-[300px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
