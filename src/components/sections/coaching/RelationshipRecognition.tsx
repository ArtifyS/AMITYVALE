"use client";

import React from "react";
import { motion } from "framer-motion";

const statements = [
  "â€œWe keep having the same argument.â€",
  "â€œI do not feel heard anymore.â€",
  "â€œWe still care about each other, but something feels distant.â€",
  "â€œIntimacy has become difficult to talk about.â€",
  "â€œSmall conversations turn into bigger conflicts.â€",
  "â€œWe avoid certain topics because we already know where they will lead.â€"
];

export function RelationshipRecognition() {
  return (
    <section className="py-[100px] md:py-[160px] bg-[#E8E1D9] relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 w-full">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#161514]/60 mb-6"
          >
            Does This Feel Familiar?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[34px] md:text-[50px] leading-[1.1] text-[#161514]"
          >
            Sometimes the Problem Is Not<br className="hidden md:block" />
            That You Do Not Care.<br />
            <span className="italic text-[#FF5A4F]">It Is That the Same Pattern Keeps Taking Over.</span>
          </motion.h2>
        </div>

        {/* Statements */}
        <div className="w-full flex flex-col gap-8 md:gap-12 mb-20">
          {statements.map((stmt, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className={`flex w-full ${isLeft ? "justify-start" : "justify-end"}`}
              >
                <div className={`relative px-6 py-4 md:px-8 md:py-6 border-t-[1px] border-[#161514]/10 max-w-[90%] md:max-w-[65%] ${isLeft ? "border-l-[1px]" : "border-r-[1px] text-right"}`}>
                  <h3 className="font-serif text-[22px] md:text-[28px] leading-[1.3] text-[#161514]/80">
                    {stmt}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-[14px] md:text-[15px] font-sans tracking-wide uppercase text-[#161514]/50 text-center"
        >
          You do not have to know exactly what is wrong before you begin.
        </motion.p>

      </div>
    </section>
  );
}
