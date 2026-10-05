"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CoachingFinalCTA() {
  const durations = ["15 MIN", "30 MIN", "45 MIN", "60 MIN"];

  return (
    <section className="py-[120px] md:py-[180px] bg-[#E8E1D9] relative overflow-hidden">
      {/* Soft gradient transition from dark section above */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#161514] to-transparent opacity-30 pointer-events-none" />

      {/* Edge Dots */}
      <div className="absolute bottom-[5%] right-[5%] w-[200px] h-[200px] opacity-[0.1] pointer-events-none hidden md:block">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#161514 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-10">
        
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-6"
        >
          Begin When You Are Ready
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-[36px] md:text-[52px] leading-[1.1] text-[#161514] mb-8"
        >
          You Do Not Have to Wait<br className="hidden md:block" />
          Until Things Feel Worse<br className="md:hidden" /> to Start Talking.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[17px] md:text-[18px] leading-[1.6] text-[#161514]/70 mb-12 max-w-[540px]"
        >
          Choose the amount of time that feels right and begin with one private conversation.
        </motion.p>

        {/* Session Durations Preview */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 mb-16 w-full max-w-[400px] md:max-w-none"
        >
          {durations.map((d, idx) => (
            <div 
              key={idx}
              className="w-[calc(50%-8px)] md:w-auto px-6 py-4 bg-white/40 border-[1px] border-[#161514]/5 rounded-[6px] text-[#161514]/80 font-sans text-[13px] tracking-widest font-medium flex items-center justify-center"
            >
              {d}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            href="/book"
            className="inline-flex items-center justify-center h-[54px] px-10 bg-[#E98267] text-white text-[14px] font-medium tracking-wide uppercase rounded-[3px] hover:bg-[#D77156] transition-colors"
          >
            Book a Private Session
          </Link>
          <Link
            href="#"
            className="group inline-flex items-center text-[14px] font-medium text-[#161514] hover:text-[#E98267] transition-colors"
          >
            View Pricing <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
