"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutFinalCTA() {
  return (
    <section className="py-[120px] md:py-[180px] bg-[#E8E1D9] relative">
      {/* Soft gradient transition from dark section above */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#161514] to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-10">
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-[36px] md:text-[56px] leading-[1.1] text-[#161514] mb-8"
        >
          You Do Not Need to Have <br className="hidden md:block" />
          Everything Figured Out Before You Begin.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-[17px] md:text-[20px] leading-[1.6] text-[#161514]/70 mb-12 max-w-[600px]"
        >
          If this feels like the kind of conversation you have been needing, the next step can be simple.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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
            className="group inline-flex items-center text-[15px] font-medium text-[#161514] hover:text-[#E98267] transition-colors"
          >
            Explore Coaching <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
