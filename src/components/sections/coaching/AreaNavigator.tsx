"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface NavItem {
  id: string;
  number: string;
  label: string;
}

const navItemsRow1: NavItem[] = [
  { id: "intimacy", number: "01", label: "Intimacy Coaching" },
  { id: "relationships", number: "02", label: "Relationship Coaching" },
  { id: "health", number: "03", label: "Health Coaching" },
];

const navItemsRow2: NavItem[] = [
  { id: "spiritual", number: "04", label: "Spiritual Coaching" },
  { id: "personal-growth", number: "05", label: "Personal Growth" },
];

const allNavItems: NavItem[] = [...navItemsRow1, ...navItemsRow2];

export function AreaNavigator() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="area-navigator" className="pt-16 pb-16 md:pt-20 md:pb-24 bg-[#FDFCF9] relative z-20 overflow-hidden border-y border-[#0B2A4A]/5">
      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-[0.03] rotate-12">
        <img src="/5.png" alt="" className="w-full h-full object-contain" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-6 max-w-[1000px] relative z-10">
        
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <span className="font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-3 block">
            FIND YOUR FOCUS
          </span>
          <h2 className="font-serif text-[32px] md:text-[38px] lg:text-[46px] leading-[1.1] text-[#0B2A4A] mb-4 tracking-tight">
            Where Would You Like <br className="hidden sm:inline" />
            <span className="text-[#FF5A4F] italic">to Create Meaningful Change?</span>
          </h2>
          <p className="text-[#26313A] text-[15px] md:text-[16px] max-w-[540px]">
            Choose the area that most closely reflects what you want to strengthen, restore, or redefine.
          </p>
        </div>

        {/* Desktop Layout: Row 1 (3 items), Row 2 (2 items centered) */}
        <div className="hidden md:flex flex-col items-center gap-3.5 lg:gap-4">
          <div className="flex flex-wrap justify-center gap-3.5 lg:gap-4 w-full">
            {navItemsRow1.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                className="flex items-center bg-white border-[1.5px] border-[#0B2A4A]/5 rounded-full px-2.5 py-2 pr-6 shadow-[0_6px_18px_rgba(11,42,74,0.03)] hover:shadow-[0_10px_28px_rgba(255,90,79,0.12)] hover:-translate-y-[2px] hover:border-[#FF5A4F]/30 transition-all duration-300 ease-out group cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F4EAE4] group-hover:bg-[#FF5A4F] text-[#FF5A4F] group-hover:text-white text-[11px] font-bold mr-3 transition-colors duration-300">
                  {item.number}
                </div>
                <span className="text-[#0B2A4A] text-[14px] font-semibold tracking-wide">
                  {item.label}
                </span>
                <ArrowRight className="ml-3 w-[14px] h-[14px] text-[#FF5A4F] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </motion.a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3.5 lg:gap-4 w-full">
            {navItemsRow2.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: (index + 3) * 0.06, ease: "easeOut" }}
                className="flex items-center bg-white border-[1.5px] border-[#0B2A4A]/5 rounded-full px-2.5 py-2 pr-6 shadow-[0_6px_18px_rgba(11,42,74,0.03)] hover:shadow-[0_10px_28px_rgba(255,90,79,0.12)] hover:-translate-y-[2px] hover:border-[#FF5A4F]/30 transition-all duration-300 ease-out group cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F4EAE4] group-hover:bg-[#FF5A4F] text-[#FF5A4F] group-hover:text-white text-[11px] font-bold mr-3 transition-colors duration-300">
                  {item.number}
                </div>
                <span className="text-[#0B2A4A] text-[14px] font-semibold tracking-wide">
                  {item.label}
                </span>
                <ArrowRight className="ml-3 w-[14px] h-[14px] text-[#FF5A4F] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile Layout: 5 compact vertical rows */}
        <div className="flex md:hidden flex-col gap-2.5 w-full max-w-[340px] mx-auto">
          {allNavItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="flex items-center justify-between bg-white border border-[#0B2A4A]/10 rounded-full px-3 py-2.5 shadow-sm active:bg-[#FCFAF8] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F4EAE4] text-[#FF5A4F] text-[11px] font-bold">
                  {item.number}
                </div>
                <span className="text-[#0B2A4A] text-[13.5px] font-semibold">
                  {item.label}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF5A4F]" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
