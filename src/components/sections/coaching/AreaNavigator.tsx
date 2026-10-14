"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const navItems = [
  { id: "romantic", number: "01", label: "Romantic Relationships" },
  { id: "family", number: "02", label: "Family Relationships" },
  { id: "friendship", number: "03", label: "Friendship & Social Connection" },
  { id: "faith", number: "04", label: "Faith & Spiritual Life" },
  { id: "personal-growth", number: "05", label: "Personal Growth" },
];

export function AreaNavigator() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="area-navigator" className="pt-16 pb-20 md:pt-24 md:pb-28 bg-[#FDFCF9] relative z-20 overflow-hidden border-y border-[#0B2A4A]/5">
      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-[0.03] rotate-12">
        <img src="/5.png" alt="" className="w-full h-full object-contain" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-6 max-w-[1000px] relative z-10">
        
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <span className="font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-3 block">
            FIND YOUR AREA
          </span>
          <h2 className="font-serif text-[32px] md:text-[38px] lg:text-[46px] leading-[1.1] text-[#0B2A4A] mb-5 tracking-tight">
            What Brings You <span className="text-[#FF5A4F] italic">Here?</span>
          </h2>
          <p className="text-[#26313A] text-[15px] md:text-[16px] max-w-[480px]">
            Start with the relationship or part of life that feels most important right now.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-5">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="flex items-center bg-white border-[1.5px] border-[#0B2A4A]/5 rounded-full px-2 py-2 pr-6 md:px-2 md:py-2 md:pr-7 shadow-[0_8px_20px_rgba(11,42,74,0.03)] hover:shadow-[0_12px_32px_rgba(255,90,79,0.12)] hover:-translate-y-[3px] hover:border-[#FF5A4F]/30 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group"
            >
              <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F4EAE4] group-hover:bg-[#FF5A4F] text-[#FF5A4F] group-hover:text-white text-[11px] md:text-[12px] font-bold mr-3 transition-colors duration-300">
                {item.number}
              </div>
              <span className="text-[#0B2A4A] text-[13.5px] md:text-[14.5px] font-semibold tracking-wide">
                {item.label}
              </span>
              <ArrowRight className="ml-3 w-[15px] h-[15px] text-[#FF5A4F] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-3 group-hover:translate-x-0" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
