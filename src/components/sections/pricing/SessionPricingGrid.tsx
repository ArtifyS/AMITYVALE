"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sessionOptions } from "@/lib/pricingConfig";

export function SessionPricingGrid() {
  const options = Object.values(sessionOptions);
  return (
    <section className="py-[60px] md:py-[100px] bg-[#F8F5F1] relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-4"
          >
            Private Sessions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[32px] md:text-[44px] leading-[1.1] text-[#161514] mb-4"
          >
            Choose How Much Space<br className="hidden md:block" /> You Need Today.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-[15px] md:text-[16px] text-[#161514]/70 max-w-[440px] mx-auto"
          >
            No complicated packages. Choose a session length and book the time that works for you.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {options.map((session, idx) => (
            <motion.div
              key={session.duration}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className={`flex flex-col h-full bg-[#FCFAF8] rounded-[16px] border-[1px] ${
                session.emphasize ? "border-[#E98267]/30 shadow-[0_12px_24px_rgba(233,130,103,0.06)] lg:-translate-y-2" : "border-[#161514]/5 shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1"
              } transition-all duration-300 relative`}
            >
              {session.emphasize && (
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#E98267] rounded-t-[16px]" />
              )}
              
              <div className="p-8 flex flex-col flex-grow">
                <span className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[#161514]/60 mb-2">
                  {session.label}
                </span>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <h3 className="font-serif text-[42px] leading-none text-[#161514]">
                    {session.duration}
                  </h3>
                  <span className="font-sans text-[14px] font-medium tracking-widest uppercase text-[#161514]/60">
                    Min
                  </span>
                </div>
                
                <div className="font-sans text-[32px] font-medium text-[#161514] mb-6">
                  ${session.price}
                </div>
                
                <p className="text-[14px] leading-[1.6] text-[#161514]/80 mb-8 flex-grow">
                  {session.description}
                </p>
                
                <div className="font-sans text-[11px] font-medium tracking-[0.1em] uppercase text-[#E98267] mb-8 pb-6 border-b-[1px] border-[#161514]/5">
                  {session.fit}
                </div>
                
                <Link
                  href={`/book?duration=${session.duration}`}
                  className={`flex items-center justify-center w-full h-[46px] rounded-[3px] text-[12px] font-medium tracking-wide uppercase transition-colors ${
                    session.emphasize
                      ? "bg-[#E98267] text-white hover:bg-[#D77156]"
                      : "bg-[#161514]/5 text-[#161514] hover:bg-[#161514]/10"
                  }`}
                >
                  Book {session.duration} Minutes
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Small guidance line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-center font-serif text-[15px] md:text-[17px] italic text-[#161514]/60 max-w-[600px] px-6"
        >
          Not sure how much time you need? Start with the conversation you want to have — you can choose the session length that feels most comfortable.
        </motion.div>

      </div>
    </section>
  );
}
