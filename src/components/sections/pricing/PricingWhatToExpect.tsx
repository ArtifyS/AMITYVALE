"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Video } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Clock,
    title: "Choose Your Session",
    desc: "Select 15, 30, 45, or 60 minutes based on how much room you need for your conversation.",
  },
  {
    step: "02",
    icon: Calendar,
    title: "Pick Your Time",
    desc: "Select an available appointment that fits your routine, and receive immediate calendar confirmation.",
  },
  {
    step: "03",
    icon: Video,
    title: "Meet Privately Online",
    desc: "Click your secure video link at the scheduled time from the comfort and privacy of your own home.",
  },
];

export function PricingWhatToExpect() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-[620px] mx-auto mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#FF5A4F] mb-3"
          >
            How It Works
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="font-serif text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.12] text-[#0B2A4A] tracking-[-0.01em] mb-4"
          >
            What to Expect <span className="text-[#FF5A4F] italic font-normal">After Booking.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="font-sans text-[15px] sm:text-[16px] text-[#5C5550] leading-[1.6]"
          >
            A calm, straightforward experience from selecting your time to meeting online.
          </motion.p>
        </div>

        {/* 3 STEP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                className="relative bg-[#FAF7F4]/60 border border-[#0B2A4A]/8 rounded-[20px] p-7 sm:p-8 flex flex-col transition-all duration-300 hover:border-[#FF5A4F]/30 hover:shadow-[0_8px_24px_rgba(11,42,74,0.05)]"
              >
                {/* Step Number Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-[28px] sm:text-[32px] font-bold text-[#FF5A4F]/60 leading-none">
                    {item.step}
                  </span>
                  <div className="w-11 h-11 rounded-full bg-white border border-[#FF5A4F]/20 flex items-center justify-center text-[#FF5A4F] shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif text-[20px] sm:text-[22px] font-semibold text-[#0B2A4A] mb-3">
                  {item.title}
                </h3>

                <p className="text-[14px] leading-[1.65] text-[#5C5550]">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
