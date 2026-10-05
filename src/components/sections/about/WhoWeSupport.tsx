"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function WhoWeSupport() {
  const pathways = [
    {
      title: "COMMUNICATION",
      desc: "For recurring arguments, misunderstanding, difficult conversations, and feeling unheard.",
      link: "Explore Communication",
    },
    {
      title: "CONNECTION",
      desc: "For emotional distance, changes in trust, disconnection, or feeling more like roommates than partners.",
      link: "Explore Connection",
    },
    {
      title: "INTIMACY",
      desc: "For conversations around closeness, affection, desire, vulnerability, and physical or emotional intimacy.",
      link: "Explore Intimacy",
    }
  ];

  return (
    <section className="py-[120px] md:py-[180px] bg-[#F8F5F1] relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-6"
          >
            Who We Support
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[36px] md:text-[48px] leading-[1.1] text-[#161514]"
          >
            Different Relationships.<br />
            Different Challenges.<br />
            <span className="italic text-[#E98267]">A More Thoughtful Way Forward.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {pathways.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="flex flex-col group relative p-8 bg-white/40 rounded-[12px] hover:bg-white/60 transition-colors"
            >
              <div className="absolute right-6 top-6 text-[#161514]/5 font-serif text-[64px] font-bold pointer-events-none select-none">
                0{idx + 1}
              </div>
              <h3 className="font-sans text-[13px] font-medium tracking-[0.12em] uppercase text-[#161514] mb-4 relative z-10">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-[#161514]/70 mb-8 flex-grow relative z-10">
                {item.desc}
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-[13px] font-medium text-[#161514] hover:text-[#E98267] transition-colors relative z-10 mt-auto"
              >
                {item.link} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
