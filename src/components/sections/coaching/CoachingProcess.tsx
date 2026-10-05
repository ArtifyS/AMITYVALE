"use client";

import React from "react";
import { motion } from "framer-motion";

const processSteps = [
  {
    num: "01",
    title: "UNDERSTAND",
    headline: "See the pattern clearly.",
    desc: "Identify the conversations, reactions, assumptions, and triggers that keep repeating."
  },
  {
    num: "02",
    title: "SLOW IT DOWN",
    headline: "Understand what sits beneath the reaction.",
    desc: "Create enough space to hear what each person is actually experiencing or trying to express."
  },
  {
    num: "03",
    title: "RESPOND DIFFERENTLY",
    headline: "Practice a more useful next step.",
    desc: "Build clearer communication, healthier responses, and more intentional connection."
  }
];

export function CoachingProcess() {
  return (
    <section className="py-[120px] md:py-[180px] bg-[#F8F5F1] relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-6"
          >
            How Coaching Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[36px] md:text-[50px] leading-[1.1] text-[#161514] mb-6"
          >
            A Different Conversation<br className="hidden md:block" />
            Can Create a Different Pattern.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[16px] md:text-[18px] text-[#161514]/70 max-w-[600px] mx-auto"
          >
            We start by understanding what keeps happening, then work toward clearer and more intentional ways of responding.
          </motion.p>
        </div>

        {/* Process Timeline */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-16 mb-24 md:mb-32">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="flex-1 flex flex-col relative group"
            >
              {/* Desktop Connecting Line */}
              {idx < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-[28px] left-[50px] w-full h-[1px] bg-[#161514]/10 pointer-events-none" />
              )}
              
              <div className="font-serif text-[48px] md:text-[56px] text-[#E98267]/40 leading-none mb-8 relative z-10 bg-[#F8F5F1] inline-block pr-6">
                {step.num}
              </div>
              
              <h3 className="font-sans text-[12px] font-medium tracking-[0.16em] uppercase text-[#161514] mb-4">
                {step.title}
              </h3>
              
              <h4 className="font-serif text-[20px] md:text-[22px] text-[#161514]/90 mb-4">
                {step.headline}
              </h4>
              
              <p className="text-[15px] leading-[1.6] text-[#161514]/70">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Individual vs Couples */}
        <div className="max-w-[1000px] mx-auto border-t-[1px] border-[#161514]/10 pt-16 md:pt-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 p-8 md:p-10 bg-[#F3EFEA] rounded-[12px]"
            >
              <h4 className="font-sans text-[12px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-4">
                Individual Coaching
              </h4>
              <p className="text-[15px] leading-[1.7] text-[#161514]/70">
                You can begin exploring communication, patterns, needs, and responses even if your partner is not participating.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="flex-1 p-8 md:p-10 bg-[#F3EFEA] rounded-[12px]"
            >
              <h4 className="font-sans text-[12px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-4">
                Couples Coaching
              </h4>
              <p className="text-[15px] leading-[1.7] text-[#161514]/70">
                Work through shared patterns, difficult conversations, connection, and intimacy together.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
