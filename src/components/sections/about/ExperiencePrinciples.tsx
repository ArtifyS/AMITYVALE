"use client";

import React from "react";
import { motion } from "framer-motion";

const principles = [
  {
    num: "01",
    title: "PRIVATE",
    desc: "Personal conversations deserve discretion and a setting where you can speak openly."
  },
  {
    num: "02",
    title: "NON-JUDGMENTAL",
    desc: "Difficult topics can be explored honestly without shame or unnecessary assumptions."
  },
  {
    num: "03",
    title: "PRACTICAL",
    desc: "Insight should lead somewhere. The work focuses on clearer conversations and useful next steps."
  },
  {
    num: "04",
    title: "PERSONALIZED",
    desc: "Every relationship has its own history, dynamics, needs, and pace."
  }
];

export function ExperiencePrinciples() {
  return (
    <section className="py-[120px] md:py-[180px] bg-[#F3EFEA] relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-[38px] md:text-[52px] leading-[1.1] text-[#161514] text-center mb-20 md:mb-24"
        >
          What You Can Expect Here.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 gap-x-12 lg:gap-x-24 w-full max-w-[1000px]">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className={`flex flex-col relative ${idx % 2 !== 0 ? 'md:mt-16' : ''}`}
            >
              {/* Thin Vertical Rule */}
              <div className="absolute left-0 top-0 h-full w-[1px] bg-[#161514]/10 hidden md:block" />
              
              <div className="md:pl-10 relative">
                <span className="block font-serif text-[48px] text-[#E98267]/40 leading-none mb-6">
                  {p.num}
                </span>
                <h3 className="font-sans text-[13px] font-medium tracking-[0.12em] uppercase text-[#161514] mb-4">
                  {p.title}
                </h3>
                <p className="text-[16px] leading-[1.6] text-[#161514]/70">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
